import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { ITEMS_PER_PAGE, truncate } from "@/lib/utils"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

interface Props { searchParams: { page?: string } }
export const metadata: Metadata = { title: "Products", description: "Browse our premium product catalog." }

export default async function ProductsPage({ searchParams }: Props) {
    const page = Math.max(1, parseInt(searchParams.page || "1"))
    const from = (page - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE - 1

    let products: import("@/lib/types/database").Product[] = []
    let totalCount = 0

    try {
        const supabase = createClient()
        const { data, count } = await supabase.from("products").select("*", { count: "exact" }).eq("is_published", true).order("sort_order").range(from, to)
        products = data || []
        totalCount = count || 0
    } catch { }

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <>
            <div className="bg-gradient-to-r from-secondary-900 to-primary-800 py-20">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Products</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">Premium products engineered for performance, reliability, and growth.</p>
                </div>
            </div>

            <section className="page-section bg-white">
                <div className="container-custom">
                    {products.length === 0 ? (
                        <p className="text-center text-gray-500 py-16 text-lg">Products will appear here once added via the CMS.</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <Link key={product.id} href={`/products/${product.slug}`} className="group card hover:shadow-xl transition-all duration-300">
                                        <div className="relative h-52 overflow-hidden bg-gray-100">
                                            <Image src={product.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                                        </div>
                                        <div className="p-6">
                                            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">{product.title}</h2>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-4">{truncate(product.description || "", 110)}</p>
                                            <span className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">View Details <ArrowRight size={14} /></span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-3 mt-12">
                                    {page > 1 && <Link href={`/products?page=${page - 1}`} className="btn-ghost"><ChevronLeft size={16} /> Previous</Link>}
                                    <div className="flex gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                            <Link key={p} href={`/products?page=${p}`} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-primary-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>{p}</Link>
                                        ))}
                                    </div>
                                    {page < totalPages && <Link href={`/products?page=${page + 1}`} className="btn-ghost">Next <ChevronRight size={16} /></Link>}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    )
}
