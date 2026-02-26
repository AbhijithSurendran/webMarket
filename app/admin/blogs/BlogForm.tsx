"use client"

import { useState } from "react"
import { upsertBlog } from "@/app/actions/cms"
import ImageUpload from "@/components/admin/ImageUpload"
import SlugInput from "@/components/admin/SlugInput"
import RichTextEditor from "@/components/admin/RichTextEditor"
import type { Blog } from "@/lib/types/database"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function BlogForm({ item }: { item?: Blog }) {
    const [coverImage, setCoverImage] = useState(item?.cover_image || "")
    const [slug, setSlug] = useState(item?.slug || "")
    const [title, setTitle] = useState(item?.title || "")
    const [content, setContent] = useState(item?.content || "")
    const [isPublished, setIsPublished] = useState(item?.is_published ?? false)
    const [isPending, setIsPending] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsPending(true)
        const formData = new FormData(e.currentTarget)
        formData.set("cover_image", coverImage)
        formData.set("slug", slug)
        formData.set("content", content)
        formData.set("is_published", String(isPublished))
        await upsertBlog(formData)
    }

    return (
        <div className="p-6 lg:p-8 max-w-3xl">
            <div className="flex items-center gap-3 mb-8"><Link href="/admin/blogs" className="btn-ghost p-2"><ArrowLeft size={18} /></Link><h1 className="text-2xl font-heading font-bold text-gray-900">{item ? "Edit Blog Post" : "New Blog Post"}</h1></div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="admin-card p-6 space-y-5">
                    {item && <input type="hidden" name="id" value={item.id} />}
                    <div><label className="label">Title <span className="text-red-500">*</span></label><input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="input-field" placeholder="Blog post title" /></div>
                    <SlugInput value={slug} onChange={setSlug} sourceValue={title} />
                    <div><label className="label">Excerpt</label><textarea name="excerpt" rows={2} defaultValue={item?.excerpt || ""} className="input-field resize-none" placeholder="Short summary shown in listings" /></div>
                    <div><label className="label">Author</label><input name="author" type="text" defaultValue={item?.author || ""} className="input-field" placeholder="Author name" /></div>
                    <div><label className="label">Full Content</label><RichTextEditor value={content} onChange={setContent} placeholder="Write your blog post content…" /><input type="hidden" name="content" value={content} /></div>
                    <ImageUpload value={coverImage} onChange={setCoverImage} label="Cover Image" />
                </div>
                <div className="admin-card p-6 space-y-4">
                    <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">SEO</h2>
                    <div><label className="label">Meta Title</label><input name="meta_title" type="text" defaultValue={item?.meta_title || ""} className="input-field" /></div>
                    <div><label className="label">Meta Description</label><textarea name="meta_description" rows={2} defaultValue={item?.meta_description || ""} className="input-field resize-none" /></div>
                </div>
                <div className="admin-card p-6">
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <div className={`relative w-10 h-6 rounded-full transition-colors ${isPublished ? "bg-green-500" : "bg-gray-300"}`} onClick={() => setIsPublished(!isPublished)}>
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isPublished ? "translate-x-4" : ""}`} />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{isPublished ? "Published" : "Draft"}</span>
                        </label>
                        <p className="text-xs text-gray-400">{isPublished ? "Post is visible on the website" : "Post is hidden from public"}</p>
                    </div>
                </div>
                <div className="flex gap-3"><button type="submit" disabled={isPending} className="btn-primary">{isPending ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : (item ? "Update Post" : "Create Post")}</button><Link href="/admin/blogs" className="btn-ghost">Cancel</Link></div>
            </form>
        </div>
    )
}
