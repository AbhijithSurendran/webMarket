"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { Resend } from "resend"
import { z } from "zod"

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().optional(),
    email: z.string().email("Invalid email address"),
    location: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export interface ContactFormState {
    success?: boolean
    error?: string
    fieldErrors?: Record<string, string>
}

export async function submitContactForm(
    prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    const raw = {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        location: formData.get("location") as string,
        message: formData.get("message") as string,
    }

    const result = contactSchema.safeParse(raw)
    if (!result.success) {
        const fieldErrors: Record<string, string> = {}
        result.error.errors.forEach((e) => {
            if (e.path[0]) fieldErrors[e.path[0] as string] = e.message
        })
        return { fieldErrors }
    }

    const data = result.data

    // Save to database
    try {
        const supabase = createAdminClient()
        const { error: dbError } = await supabase.from("enquiries").insert({
            name: data.name,
            phone: data.phone || null,
            email: data.email,
            location: data.location || null,
            message: data.message,
        })
        if (dbError) throw dbError
    } catch (err) {
        console.error("DB error:", err)
        return { error: "Failed to save your message. Please try again." }
    }

    // Send email notification
    const resendKey = process.env.RESEND_API_KEY
    const adminEmail = process.env.ADMIN_EMAIL
    const fromEmail = process.env.RESEND_FROM_EMAIL

    if (resendKey && adminEmail && fromEmail) {
        try {
            const resend = new Resend(resendKey)
            await resend.emails.send({
                from: fromEmail,
                to: adminEmail,
                subject: `New Enquiry from ${data.name}`,
                html: `
          <h2>New Contact Enquiry</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;font-weight:bold;color:#374151">Name</td><td style="padding:8px">${data.name}</td></tr>
            <tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold;color:#374151">Email</td><td style="padding:8px"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding:8px;font-weight:bold;color:#374151">Phone</td><td style="padding:8px">${data.phone}</td></tr>` : ""}
            ${data.location ? `<tr style="background:#f9fafb"><td style="padding:8px;font-weight:bold;color:#374151">Location</td><td style="padding:8px">${data.location}</td></tr>` : ""}
            <tr><td style="padding:8px;font-weight:bold;color:#374151">Message</td><td style="padding:8px;white-space:pre-wrap">${data.message}</td></tr>
          </table>
        `,
            })
        } catch (emailErr) {
            console.error("Email error:", emailErr)
            // Don't fail — DB save succeeded
        }
    }

    return { success: true }
}
