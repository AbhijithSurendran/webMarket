import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import HeroSlideForm from "../HeroSlideForm"

export default async function EditHeroSlidePage({ params }: { params: { id: string } }) {
    let slide = null
    try {
        const supabase = createClient()
        const { data } = await supabase.from("hero_sliders").select("*").eq("id", params.id).single()
        slide = data
    } catch { }
    if (!slide) notFound()
    return <HeroSlideForm slide={slide} />
}
