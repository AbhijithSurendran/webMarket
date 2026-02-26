"use client"

import { useState } from "react"
import { upsertService } from "@/app/actions/cms"
import ImageUpload from "@/components/admin/ImageUpload"
import SlugInput from "@/components/admin/SlugInput"
import RichTextEditor from "@/components/admin/RichTextEditor"
import type { Service } from "@/lib/types/database"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface Props { item?: Service }

export default function ServiceForm({ item }: Props) {
    const [imageUrl, setImageUrl] = useState(item?.image_url || "")
    const [slug, setSlug] = useState(item?.slug || "")
    const [title, setTitle] = useState(item?.title || "")
    const [content, setContent] = useState(item?.content || "")
    const [isPublished, setIsPublished] = useState(item?.is_published ?? true)
    const [isPending, setIsPending] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsPending(true)
        const formData = new FormData(e.currentTarget)
        formData.set("image_url", imageUrl)
        formData.set("slug", slug)
        formData.set("content", content)
        formData.set("is_published", String(isPublished))
        await upsertService(formData)
    }

    return (
        <div className="p-6 lg:p-8 max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/admin/services" className="btn-ghost p-2"><ArrowLeft size={18} /></Link>
                <h1 className="text-2xl font-heading font-bold text-gray-900">{item ? "Edit Service" : "New Service"}</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="admin-card p-6 space-y-5">
                    <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Content</h2>
                    {item && <input type="hidden" name="id" value={item.id} />}
                    <div>
                        <label className="label">Title <span className="text-red-500">*</span></label>
                        <input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="input-field" placeholder="Service title" />
                    </div>
                    <SlugInput value={slug} onChange={setSlug} sourceValue={title} />
                    <div>
                        <label className="label">Short Description</label>
                        <textarea name="description" rows={3} defaultValue={item?.description || ""} className="input-field resize-none" placeholder="Brief summary" />
                    </div>
                    <div>
                        <label className="label">Full Content</label>
                        <RichTextEditor value={content} onChange={setContent} placeholder="Detailed service content…" />
                        <input type="hidden" name="content" value={content} />
                    </div>
                    <ImageUpload value={imageUrl} onChange={setImageUrl} label="Featured Image" />
                </div>

                <div className="admin-card p-6 space-y-4">
                    <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">SEO</h2>
                    <div>
                        <label className="label">Meta Title</label>
                        <input name="meta_title" type="text" defaultValue={item?.meta_title || ""} className="input-field" placeholder="SEO title" />
                    </div>
                    <div>
                        <label className="label">Meta Description</label>
                        <textarea name="meta_description" rows={2} defaultValue={item?.meta_description || ""} className="input-field resize-none" placeholder="SEO description" />
                    </div>
                </div>

                <div className="admin-card p-6 space-y-4">
                    <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Settings</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">Sort Order</label>
                            <input name="sort_order" type="number" defaultValue={item?.sort_order || 0} className="input-field" />
                        </div>
                        <div className="flex items-end pb-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <div className={`relative w-10 h-6 rounded-full transition-colors ${isPublished ? "bg-primary-600" : "bg-gray-300"}`} onClick={() => setIsPublished(!isPublished)}>
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isPublished ? "translate-x-4" : ""}`} />
                                </div>
                                <span className="text-sm text-gray-700 font-medium">Published</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button type="submit" disabled={isPending} className="btn-primary">
                        {isPending ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : (item ? "Update Service" : "Create Service")}
                    </button>
                    <Link href="/admin/services" className="btn-ghost">Cancel</Link>
                </div>
            </form>
        </div>
    )
}
