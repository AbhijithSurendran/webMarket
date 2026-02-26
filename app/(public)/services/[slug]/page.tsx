import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft } from "lucide-react"

interface Props {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const supabase = createClient()
        const { data } = await supabase.from("services").select("title, meta_title, meta_description").eq("slug", params.slug).single()
        return {
            title: data?.meta_title || data?.title || "Service",
            description: data?.meta_description || undefined,
        }
    } catch {
        return { title: "Service" }
    }
}

export default async function ServiceDetailPage({ params }: Props) {
    let service: import("@/lib/types/database").Service | null = null
    try {
        const supabase = createClient()
        const { data } = await supabase.from("services").select("*").eq("slug", params.slug).eq("is_published", true).single()
        service = data
    } catch { }

    if (!service) notFound()

    return (
        <>
            {/* Hero */}
            {service.image_url && (
                <div className="relative h-64 md:h-96">
                    <Image src={service.image_url} alt={service.title} fill className="object-cover" priority sizes="100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
            )}

            <div className="container-custom py-12 max-w-4xl mx-auto">
                <Link href="/services" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 text-sm font-medium mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Services
                </Link>

                <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">{service.title}</h1>
                {service.description && (
                    <p className="text-xl text-gray-500 mb-8 leading-relaxed">{service.description}</p>
                )}

                {service.content && (
                    <div
                        className="prose-content border-t border-gray-100 pt-8"
                        dangerouslySetInnerHTML={{ __html: service.content }}
                    />
                )}

                {/* CTA */}
                <div className="mt-12 p-8 bg-primary-50 rounded-2xl border border-primary-100 text-center">
                    <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-2">Interested in This Service?</h3>
                    <p className="text-gray-600 mb-6">Get in touch with our team to discuss how we can help you.</p>
                    <Link href="/contact" className="btn-primary">Contact Us</Link>
                </div>
            </div>
        </>
    )
}
