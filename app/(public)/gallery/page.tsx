import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import GalleryGrid from "@/components/public/GalleryGrid"

export const metadata: Metadata = { title: "Gallery", description: "A visual tour of our workspace, team, and work." }

export default async function GalleryPage() {
    let items: import("@/lib/types/database").GalleryItem[] = []
    try {
        const supabase = createClient()
        const { data } = await supabase.from("gallery").select("*").eq("is_active", true).order("sort_order")
        items = data || []
    } catch { }

    return (
        <>
            <div className="bg-gradient-to-r from-primary-800 to-secondary-900 py-20">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Gallery</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">A visual journey through our workspace, team, and highlights.</p>
                </div>
            </div>
            <section className="page-section bg-white">
                <div className="container-custom">
                    <GalleryGrid items={items} />
                </div>
            </section>
        </>
    )
}
