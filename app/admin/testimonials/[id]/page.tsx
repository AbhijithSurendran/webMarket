import { createClient } from "@/lib/supabase/server"; import { notFound } from "next/navigation"; import TestimonialForm from "../TestimonialForm"
export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
    let item = null
    try { const s = createClient(); const { data } = await s.from("testimonials").select("*").eq("id", params.id).single(); item = data } catch { }
    if (!item) notFound()
    return <TestimonialForm item={item} />
}
