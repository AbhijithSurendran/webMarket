import { createClient } from "@/lib/supabase/server"; import { notFound } from "next/navigation"; import BlogForm from "../BlogForm"
export default async function EditBlogPage({ params }: { params: { id: string } }) {
    let item = null
    try { const s = createClient(); const { data } = await s.from("blogs").select("*").eq("id", params.id).single(); item = data } catch { }
    if (!item) notFound()
    return <BlogForm item={item} />
}
