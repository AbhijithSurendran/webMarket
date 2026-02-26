"use client"

import { useState, useTransition } from "react"
import { updateAboutPage } from "@/app/actions/cms"
import ImageUpload from "@/components/admin/ImageUpload"
import type { Page } from "@/lib/types/database"
import { Loader2, CheckCircle } from "lucide-react"

interface Props { page: Page | null }

export default function AboutPageForm({ page }: Props) {
    const content = (page?.content as Record<string, string>) ?? {}
    const [bannerImage, setBannerImage] = useState(page?.banner_image || "")
    const [saved, setSaved] = useState(false)
    const [isPending, startTransition] = useTransition()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        formData.set("banner_image", bannerImage)
        startTransition(async () => {
            await updateAboutPage(formData)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {saved && <div className="flex items-center gap-2 p-3.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"><CheckCircle size={16} /> About page saved!</div>}

            <div className="admin-card p-6 space-y-5">
                <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Banner</h2>
                <ImageUpload value={bannerImage} onChange={setBannerImage} label="Banner Image" />
            </div>

            <div className="admin-card p-6 space-y-5">
                <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Company Story</h2>
                <div>
                    <label className="label">Company Description</label>
                    <textarea name="description" rows={6} defaultValue={content.description || ""} className="input-field resize-none" placeholder="Tell your company story…" />
                </div>
            </div>

            <div className="admin-card p-6 space-y-5">
                <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Vision</h2>
                <div><label className="label">Vision Title</label><input name="vision_title" type="text" defaultValue={content.vision_title || "Our Vision"} className="input-field" /></div>
                <div><label className="label">Vision Description</label><textarea name="vision_description" rows={4} defaultValue={content.vision_description || ""} className="input-field resize-none" /></div>
            </div>

            <div className="admin-card p-6 space-y-5">
                <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Mission</h2>
                <div><label className="label">Mission Title</label><input name="mission_title" type="text" defaultValue={content.mission_title || "Our Mission"} className="input-field" /></div>
                <div><label className="label">Mission Description</label><textarea name="mission_description" rows={4} defaultValue={content.mission_description || ""} className="input-field resize-none" /></div>
            </div>

            <div className="admin-card p-6 space-y-4">
                <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">SEO</h2>
                <div><label className="label">Meta Title</label><input name="meta_title" type="text" defaultValue={page?.meta_title || ""} className="input-field" /></div>
                <div><label className="label">Meta Description</label><textarea name="meta_description" rows={2} defaultValue={page?.meta_description || ""} className="input-field resize-none" /></div>
            </div>

            <button type="submit" disabled={isPending} className="btn-primary">
                {isPending ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : "Save About Page"}
            </button>
        </form>
    )
}
