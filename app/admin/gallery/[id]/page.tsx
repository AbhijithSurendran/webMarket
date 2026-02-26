import { createClient } from "@/lib/supabase/server"; import { notFound } from "next/navigation"; import GalleryItemForm from "../GalleryItemForm"
export default async function EditGalleryPage({ params }: { params: { id: string } }) {
    let item = null
    try { const s = createClient(); const { data } = await s.from("gallery").select("*").eq("id", params.id).single(); item = data } catch { }
    if (!item) notFound()
    return <GalleryItemForm item={item} />
}
