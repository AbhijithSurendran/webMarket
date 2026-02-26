import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Calendar, User } from "lucide-react"

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const supabase = createClient()
        const { data } = await supabase.from("blogs").select("title, meta_title, meta_description, cover_image, excerpt").eq("slug", params.slug).single()
        return {
            title: data?.meta_title || data?.title || "Blog",
            description: data?.meta_description || data?.excerpt || undefined,
            openGraph: { title: data?.meta_title || data?.title, images: data?.cover_image ? [data.cover_image] : [] },
        }
    } catch { return { title: "Blog Post" } }
}

export default async function BlogDetailPage({ params }: Props) {
    let blog: import("@/lib/types/database").Blog | null = null
    let relatedBlogs: import("@/lib/types/database").Blog[] = []

    try {
        const supabase = createClient()
        const [{ data }, { data: related }] = await Promise.all([
            supabase.from("blogs").select("*").eq("slug", params.slug).eq("is_published", true).single(),
            supabase.from("blogs").select("id, slug, title, cover_image, published_at, author, excerpt").eq("is_published", true).neq("slug", params.slug).limit(3),
        ])
        blog = data
        relatedBlogs = related || []
    } catch { }

    if (!blog) notFound()

    return (
        <>
            {blog.cover_image && (
                <div className="relative h-64 md:h-96">
                    <Image src={blog.cover_image} alt={blog.title} fill className="object-cover" priority sizes="100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
            )}
            <div className="container-custom py-12 max-w-3xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 text-sm font-medium mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Blog
                </Link>
                <article>
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4 leading-tight">{blog.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            {blog.author && <span className="flex items-center gap-1.5"><User size={14} /> {blog.author}</span>}
                            {blog.published_at && <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(blog.published_at)}</span>}
                        </div>
                        {blog.excerpt && <p className="mt-4 text-lg text-gray-600 leading-relaxed border-l-4 border-primary-400 pl-4 italic">{blog.excerpt}</p>}
                    </header>
                    {blog.content && (
                        <div className="prose-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                    )}
                </article>
            </div>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="container-custom">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8">Related Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedBlogs.map((r) => (
                                <Link key={r.id} href={`/blog/${r.slug}`} className="group card hover:shadow-lg transition-all duration-300">
                                    {r.cover_image && (
                                        <div className="relative h-40 overflow-hidden">
                                            <Image src={r.cover_image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h3 className="font-heading font-semibold text-gray-900 group-hover:text-primary-700 transition-colors text-sm leading-snug">{r.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}
