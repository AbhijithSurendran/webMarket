import { createClient } from "@/lib/supabase/server"
import AboutPageForm from "./AboutPageForm"

export default async function PagesAdminPage() {
    let page = null
    try {
        const supabase = createClient()
        const { data } = await supabase.from("pages").select("*").eq("slug", "about").single()
        page = data
    } catch { }

    return (
        <div className="p-6 lg:p-8 max-w-2xl">
            <div className="mb-8">
                <h1 className="text-2xl font-heading font-bold text-gray-900">Pages</h1>
                <p className="text-gray-500 text-sm mt-1">Edit the content of static pages.</p>
            </div>
            <div className="mb-6 flex gap-2">
                <span className="badge bg-primary-100 text-primary-700 text-sm px-3 py-1.5">About Page</span>
            </div>
            <AboutPageForm page={page} />
        </div>
    )
}
