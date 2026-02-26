"use client"

import { useState, useTransition } from "react"
import { updateSiteSettings } from "@/app/actions/cms"
import ImageUpload from "@/components/admin/ImageUpload"
import { Loader2, CheckCircle } from "lucide-react"

interface Props { settings: Record<string, string> }

export default function SettingsForm({ settings }: Props) {
    const [logoUrl, setLogoUrl] = useState(settings.logo_url || "")
    const [saved, setSaved] = useState(false)
    const [isPending, startTransition] = useTransition()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.set("logo_url", logoUrl)
        startTransition(async () => {
            await updateSiteSettings(formData)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        })
    }

    const field = (name: string, label: string, opts?: { type?: string; rows?: number; placeholder?: string }) => (
        <div key={name}>
            <label className="label">{label}</label>
            {opts?.rows ? (
                <textarea name={name} rows={opts.rows} defaultValue={settings[name] || ""} className="input-field resize-none" placeholder={opts?.placeholder} />
            ) : (
                <input name={name} type={opts?.type || "text"} defaultValue={settings[name] || ""} className="input-field" placeholder={opts?.placeholder} />
            )}
        </div>
    )

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {saved && (
                <div className="flex items-center gap-2 p-3.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                    <CheckCircle size={16} /> Settings saved successfully!
                </div>
            )}

            {/* Branding */}
            <div className="admin-card p-6 space-y-5">
                <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Branding</h2>
                {field("site_name", "Site Name", { placeholder: "WebMarket" })}
                <ImageUpload value={logoUrl} onChange={setLogoUrl} label="Logo" />
            </div>

            {/* Footer */}
            <div className="admin-card p-6 space-y-5">
                <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Footer</h2>
                {field("footer_text", "Footer Copyright Text", { placeholder: "© 2024 WebMarket. All rights reserved." })}
                {field("footer_description", "Footer Description", { rows: 2, placeholder: "Your trusted partner…" })}
            </div>

            {/* Contact */}
            <div className="admin-card p-6 space-y-5">
                <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Contact Info</h2>
                {field("address", "Address", { placeholder: "123 Business Street, City, State" })}
                {field("phone", "Phone", { type: "tel", placeholder: "+1 (555) 000-0000" })}
                {field("email", "Email", { type: "email", placeholder: "info@example.com" })}
                {field("google_maps_embed", "Google Maps Embed Code", { rows: 3, placeholder: '<iframe src="https://www.google.com/maps/embed?..." />' })}
            </div>

            {/* Social */}
            <div className="admin-card p-6 space-y-5">
                <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Social Media</h2>
                {field("facebook_url", "Facebook URL", { type: "url", placeholder: "https://facebook.com/yourpage" })}
                {field("twitter_url", "Twitter / X URL", { type: "url", placeholder: "https://twitter.com/yourhandle" })}
                {field("instagram_url", "Instagram URL", { type: "url", placeholder: "https://instagram.com/yourhandle" })}
                {field("linkedin_url", "LinkedIn URL", { type: "url", placeholder: "https://linkedin.com/company/yourcompany" })}
            </div>

            {/* Default SEO */}
            <div className="admin-card p-6 space-y-5">
                <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Default SEO</h2>
                {field("meta_title", "Default Page Title", { placeholder: "WebMarket — Quality Products & Services" })}
                {field("meta_description", "Default Meta Description", { rows: 2, placeholder: "Describe your site in 150-160 characters…" })}
            </div>

            <button type="submit" disabled={isPending} className="btn-primary">
                {isPending ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : "Save Settings"}
            </button>
        </form>
    )
}
