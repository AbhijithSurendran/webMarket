import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft } from "lucide-react"

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const supabase = createClient()
        const { data } = await supabase.from("products").select("title, meta_title, meta_description").eq("slug", params.slug).single()
        return { title: data?.meta_title || data?.title || "Product", description: data?.meta_description || undefined }
    } catch { return { title: "Product" } }
}

export default async function ProductDetailPage({ params }: Props) {
    let product: import("@/lib/types/database").Product | null = null
    try {
        const supabase = createClient()
        const { data } = await supabase.from("products").select("*").eq("slug", params.slug).eq("is_published", true).single()
        product = data
    } catch { }

    if (!product) notFound()

    return (
        <>
            {product.image_url && (
                <div className="relative h-64 md:h-96">
                    <Image src={product.image_url} alt={product.title} fill className="object-cover" priority sizes="100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
            )}
            <div className="container-custom py-12 max-w-4xl mx-auto">
                <Link href="/products" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 text-sm font-medium mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Products
                </Link>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">{product.title}</h1>
                {product.description && <p className="text-xl text-gray-500 mb-8 leading-relaxed">{product.description}</p>}
                {product.content && (
                    <div className="prose-content border-t border-gray-100 pt-8" dangerouslySetInnerHTML={{ __html: product.content }} />
                )}
                <div className="mt-12 p-8 bg-primary-50 rounded-2xl border border-primary-100 text-center">
                    <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-2">Interested in This Product?</h3>
                    <p className="text-gray-600 mb-6">Contact our team to learn more or request a demo.</p>
                    <Link href="/contact" className="btn-primary">Get In Touch</Link>
                </div>
            </div>
        </>
    )
}
