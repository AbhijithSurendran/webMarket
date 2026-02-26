"use client"

import { useActionState } from "react"
import { useEffect, useRef } from "react"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const initialState: ContactFormState = {}

export default function ContactForm() {
    const [state, action, isPending] = useActionState(submitContactForm, initialState)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset()
        }
    }, [state.success])

    return (
        <form ref={formRef} action={action} className="space-y-5">
            {state.success && (
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-sm">Message sent successfully!</p>
                        <p className="text-sm mt-0.5">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                    </div>
                </div>
            )}
            {state.error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{state.error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="label" htmlFor="contact-name">Full Name <span className="text-red-500">*</span></label>
                    <input id="contact-name" name="name" type="text" placeholder="John Doe" className={`input-field ${state.fieldErrors?.name ? "border-red-400 focus:ring-red-400" : ""}`} required />
                    {state.fieldErrors?.name && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.name}</p>}
                </div>
                <div>
                    <label className="label" htmlFor="contact-phone">Phone Number</label>
                    <input id="contact-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className="input-field" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="label" htmlFor="contact-email">Email Address <span className="text-red-500">*</span></label>
                    <input id="contact-email" name="email" type="email" placeholder="john@example.com" className={`input-field ${state.fieldErrors?.email ? "border-red-400 focus:ring-red-400" : ""}`} required />
                    {state.fieldErrors?.email && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.email}</p>}
                </div>
                <div>
                    <label className="label" htmlFor="contact-location">Location</label>
                    <input id="contact-location" name="location" type="text" placeholder="City, Country" className="input-field" />
                </div>
            </div>

            <div>
                <label className="label" htmlFor="contact-message">Message <span className="text-red-500">*</span></label>
                <textarea id="contact-message" name="message" rows={5} placeholder="Tell us about your project or inquiry..." className={`input-field resize-none ${state.fieldErrors?.message ? "border-red-400 focus:ring-red-400" : ""}`} required />
                {state.fieldErrors?.message && <p className="text-red-500 text-xs mt-1">{state.fieldErrors.message}</p>}
            </div>

            <button type="submit" disabled={isPending} className="btn-primary w-full">
                {isPending ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending…</>
                ) : (
                    "Send Message"
                )}
            </button>
        </form>
    )
}
