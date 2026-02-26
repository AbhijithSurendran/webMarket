"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { upsertHeroSlide } from "@/app/actions/cms"
import ImageUpload from "@/components/admin/ImageUpload"
import type { HeroSlider } from "@/lib/types/database"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface Props { slide?: HeroSlider }

export default function HeroSlideForm({ slide }: Props) {
    const [imageUrl, setImageUrl] = useState(slide?.image_url || "")
    const [isActive, setIsActive] = useState(slide?.is_active ?? true)
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsPending(true)
        const formData = new FormData(e.currentTarget)
        formData.set("image_url", imageUrl)
        formData.set("is_active", String(isActive))
        await upsertHeroSlide(formData)
    }

    return (
        <div className="p-6 lg:p-8 max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/admin/hero-sliders" className="btn-ghost p-2"><ArrowLeft size={18} /></Link>
                <div>
                    <h1 className="text-2xl font-heading font-bold text-gray-900">{slide ? "Edit Slide" : "New Slide"}</h1>
                    <p className="text-gray-500 text-sm">Hero slider content</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="admin-card p-6 space-y-5">
                {slide && <input type="hidden" name="id" value={slide.id} />}

                <ImageUpload value={imageUrl} onChange={setImageUrl} label="Slide Image" />

                <div>
                    <label className="label" htmlFor="slide-title">Title <span className="text-red-500">*</span></label>
                    <input id="slide-title" name="title" type="text" defaultValue={slide?.title} required className="input-field" placeholder="Hero slide title" />
                </div>

                <div>
                    <label className="label" htmlFor="slide-desc">Description</label>
                    <textarea id="slide-desc" name="description" rows={3} defaultValue={slide?.description || ""} className="input-field resize-none" placeholder="Slide description" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label" htmlFor="slide-btn-text">Button Text</label>
                        <input id="slide-btn-text" name="button_text" type="text" defaultValue={slide?.button_text || ""} className="input-field" placeholder="Learn More" />
                    </div>
                    <div>
                        <label className="label" htmlFor="slide-btn-link">Button Link</label>
                        <input id="slide-btn-link" name="button_link" type="text" defaultValue={slide?.button_link || ""} className="input-field" placeholder="/services" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label" htmlFor="slide-order">Sort Order</label>
                        <input id="slide-order" name="sort_order" type="number" defaultValue={slide?.sort_order || 0} className="input-field" />
                    </div>
                    <div className="flex flex-col justify-end">
                        <label className="flex items-center gap-2 cursor-pointer py-2">
                            <div className={`relative w-10 h-6 rounded-full transition-colors ${isActive ? "bg-primary-600" : "bg-gray-300"}`} onClick={() => setIsActive(!isActive)}>
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isActive ? "translate-x-4" : ""}`} />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Active</span>
                        </label>
                    </div>
                </div>

                <div className="flex gap-3 pt-2 border-t border-gray-100">
                    <button type="submit" disabled={isPending} className="btn-primary">
                        {isPending ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : (slide ? "Update Slide" : "Create Slide")}
                    </button>
                    <Link href="/admin/hero-sliders" className="btn-ghost">Cancel</Link>
                </div>
            </form>
        </div>
    )
}
