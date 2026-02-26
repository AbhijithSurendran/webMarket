import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { ITEMS_PER_PAGE, truncate, formatDate } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props { searchParams: { page?: string } }
export const metadata: Metadata = { title: "Blog", description: "Insights, news, and updates from WebMarket." }

export default async function BlogPage({ searchParams }: Props) {
    const page = Math.max(1, parseInt(searchParams.page || "1"))
    const from = (page - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE - 1

    let blogs: import("@/lib/types/database").Blog[] = []
    let totalCount = 0

    try {
        const supabase = createClient()
        const { data, count } = await supabase.from("blogs").select("*", { count: "exact" }).eq("is_published", true).order("published_at", { ascending: false }).range(from, to)
        blogs = data || []
        totalCount = count || 0
    } catch { }

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <>
            <div className="bg-gradient-to-r from-primary-800 to-primary-600 py-20">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Blog</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">Insights, industry news, and expert perspectives from our team.</p>
                </div>
            </div>

            <section className="page-section bg-white">
                <div className="container-custom">
                    {blogs.length === 0 ? (
                        <p className="text-center text-gray-500 py-16 text-lg">Blog posts will appear here once published via the CMS.</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {blogs.map((blog) => (
                                    <Link key={blog.id} href={`/blog/${blog.slug}`} className="group card hover:shadow-xl transition-all duration-300 flex flex-col">
                                        {blog.cover_image && (
                                            <div className="relative h-52 overflow-hidden flex-shrink-0">
                                                <Image src={blog.cover_image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                                            </div>
                                        )}
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                                {blog.author && <span className="font-medium text-gray-600">{blog.author}</span>}
                                                {blog.author && blog.published_at && <span>·</span>}
                                                {blog.published_at && <span>{formatDate(blog.published_at)}</span>}
                                            </div>
                                            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors leading-snug">{blog.title}</h2>
                                            <p className="text-gray-500 text-sm leading-relaxed flex-1">{truncate(blog.excerpt || "", 120)}</p>
                                            <span className="mt-4 text-primary-600 text-sm font-medium group-hover:underline">Read More →</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-3 mt-12">
                                    {page > 1 && <Link href={`/blog?page=${page - 1}`} className="btn-ghost"><ChevronLeft size={16} /> Previous</Link>}
                                    <div className="flex gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                            <Link key={p} href={`/blog?page=${p}`} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-primary-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>{p}</Link>
                                        ))}
                                    </div>
                                    {page < totalPages && <Link href={`/blog?page=${page + 1}`} className="btn-ghost">Next <ChevronRight size={16} /></Link>}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    )
}
