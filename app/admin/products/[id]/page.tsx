import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import ProductForm from "../ProductForm"
export default async function EditProductPage({ params }: { params: { id: string } }) {
    let item = null
    try { const s = createClient(); const { data } = await s.from("products").select("*").eq("id", params.id).single(); item = data } catch { }
    if (!item) notFound()
    return <ProductForm item={item} />
}
