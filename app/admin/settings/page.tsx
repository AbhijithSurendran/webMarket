import { createClient } from "@/lib/supabase/server"
import SettingsForm from "./SettingsForm"

export default async function SettingsPage() {
    let settings: Record<string, string> = {}
    try {
        const supabase = createClient()
        const { data } = await supabase.from("site_settings").select("key, value")
        if (data) settings = Object.fromEntries(data.map((s) => [s.key, s.value ?? ""]))
    } catch { }

    return (
        <div className="p-6 lg:p-8 max-w-2xl">
            <div className="mb-8">
                <h1 className="text-2xl font-heading font-bold text-gray-900">Site Settings</h1>
                <p className="text-gray-500 text-sm mt-1">Configure your website branding, contact info, and SEO defaults.</p>
            </div>
            <SettingsForm settings={settings} />
        </div>
    )
}
