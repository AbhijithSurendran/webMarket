import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import ServiceForm from "../ServiceForm"
export default async function EditServicePage({ params }: { params: { id: string } }) {
    let item = null
    try { const s = createClient(); const { data } = await s.from("services").select("*").eq("id", params.id).single(); item = data } catch { }
    if (!item) notFound()
    return <ServiceForm item={item} />
}
