"use server"

import { getDB, saveDB, generateId } from "@/lib/db"

export type ContactFormState = {
    success?: boolean
    error?: string
    fieldErrors?: {
        name?: string
        email?: string
        phone?: string
        message?: string
    }
}

export async function submitContactForm(
    prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    try {
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const phone = formData.get("phone") as string
        const location = formData.get("location") as string
        const message = formData.get("message") as string

        const fieldErrors: ContactFormState["fieldErrors"] = {}
        if (!name || name.trim().length < 2) fieldErrors.name = "Name is too short."
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) fieldErrors.email = "Invalid email format."

        if (phone && !/^[\d\s+\-()]+$/.test(phone)) {
            fieldErrors.phone = "Phone number can only contain numbers, spaces, and + - ( ) characters.";
        }

        if (!message || message.trim().length < 10) fieldErrors.message = "Message must be at least 10 characters."

        if (Object.keys(fieldErrors).length > 0) {
            return { fieldErrors }
        }

        const db = await getDB();

        // Initialize enquiries array if it doesn't exist yet
        if (!db.enquiries) {
            db.enquiries = [];
        }

        const newEnquiry: import("@/lib/types").Enquiry = {
            id: generateId(),
            name,
            email,
            phone,
            location,
            message,
            is_read: false,
            created_at: new Date().toISOString()
        };

        db.enquiries.push(newEnquiry);
        await saveDB(db);

        return { success: true }
    } catch (error) {
        console.error("Contact form error:", error)
        return { error: "An unexpected error occurred. Please try again later." }
    }
}
