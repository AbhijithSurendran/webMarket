"use client"

import { useState } from "react"
import { upsertGalleryItem } from "@/app/actions/cms"
import ImageUpload from "@/components/admin/ImageUpload"
import type { GalleryItem } from "@/lib/types/database"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function GalleryItemForm({ item }: { item?: GalleryItem }) {
    const [imageUrl, setImageUrl] = useState(item?.image_url || "")
    const [isActive, setIsActive] = useState(item?.is_active ?? true)
    const [isPending, setIsPending] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsPending(true)
        const formData = new FormData(e.currentTarget)
        formData.set("image_url", imageUrl)
        formData.set("is_active", String(isActive))
        await upsertGalleryItem(formData)
    }

    return (
        <div className="p-6 lg:p-8 max-w-xl">
            <div className="flex items-center gap-3 mb-8"><Link href="/admin/gallery" className="btn-ghost p-2"><ArrowLeft size={18} /></Link><h1 className="text-2xl font-heading font-bold text-gray-900">{item ? "Edit Gallery Image" : "Add Gallery Image"}</h1></div>
            <form onSubmit={handleSubmit} className="admin-card p-6 space-y-5">
                {item && <input type="hidden" name="id" value={item.id} />}
                <ImageUpload value={imageUrl} onChange={setImageUrl} label="Image" />
                <div><label className="label">Caption</label><input name="caption" type="text" defaultValue={item?.caption || ""} className="input-field" placeholder="Optional caption" /></div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="label">Sort Order</label><input name="sort_order" type="number" defaultValue={item?.sort_order || 0} className="input-field" /></div>
                    <div className="flex items-end pb-1"><label className="flex items-center gap-2 cursor-pointer"><div className={`relative w-10 h-6 rounded-full transition-colors ${isActive ? "bg-primary-600" : "bg-gray-300"}`} onClick={() => setIsActive(!isActive)}><div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isActive ? "translate-x-4" : ""}`} /></div><span className="text-sm text-gray-700">Active</span></label></div>
                </div>
                <div className="flex gap-3 pt-2 border-t border-gray-100">
                    <button type="submit" disabled={isPending} className="btn-primary">{isPending ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : (item ? "Update" : "Add Image")}</button>
                    <Link href="/admin/gallery" className="btn-ghost">Cancel</Link>
                </div>
            </form>
        </div>
    )
}
