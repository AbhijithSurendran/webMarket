import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { ITEMS_PER_PAGE, truncate } from "@/lib/utils"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

interface Props {
    searchParams: { page?: string }
}

export const metadata: Metadata = { title: "Services", description: "Explore our professional services." }

export default async function ServicesPage({ searchParams }: Props) {
    const page = Math.max(1, parseInt(searchParams.page || "1"))
    const from = (page - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE - 1

    let services: import("@/lib/types/database").Service[] = []
    let totalCount = 0

    try {
        const supabase = createClient()
        const [{ data, count }] = await Promise.all([
            supabase.from("services").select("*", { count: "exact" }).eq("is_published", true).order("sort_order").range(from, to),
        ])
        services = data || []
        totalCount = count || 0
    } catch { }

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <>
            {/* Banner */}
            <div className="bg-gradient-to-r from-primary-800 to-primary-600 py-20">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Services</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">Comprehensive professional services designed to help your business thrive.</p>
                </div>
            </div>

            {/* Listing */}
            <section className="page-section bg-white">
                <div className="container-custom">
                    {services.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">Services will appear here once added via the CMS.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {services.map((service) => (
                                    <Link key={service.id} href={`/services/${service.slug}`} className="group card hover:shadow-xl transition-all duration-300">
                                        <div className="relative h-52 overflow-hidden">
                                            <Image src={service.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                                        </div>
                                        <div className="p-6">
                                            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">{service.title}</h2>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-4">{truncate(service.description || "", 110)}</p>
                                            <span className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">Learn More <ArrowRight size={14} /></span>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-3 mt-12">
                                    {page > 1 && (
                                        <Link href={`/services?page=${page - 1}`} className="btn-ghost">
                                            <ChevronLeft size={16} /> Previous
                                        </Link>
                                    )}
                                    <div className="flex gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                            <Link key={p} href={`/services?page=${p}`}
                                                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-primary-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>{p}</Link>
                                        ))}
                                    </div>
                                    {page < totalPages && (
                                        <Link href={`/services?page=${page + 1}`} className="btn-ghost">
                                            Next <ChevronRight size={16} />
                                        </Link>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    )
}
