"use client"

import { useState } from "react"
import Image from "next/image"
import type { GalleryItem } from "@/lib/types/database"

interface GalleryGridProps {
    items: GalleryItem[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    if (items.length === 0) {
        return <p className="text-center text-gray-500 py-16 text-lg">Gallery images will appear here once added via the CMS.</p>
    }

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {items.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => setLightboxIndex(index)}
                        className="relative aspect-square overflow-hidden rounded-xl group"
                        aria-label={item.caption || `Image ${index + 1}`}
                    >
                        <Image
                            src={item.image_url}
                            alt={item.caption || `Gallery ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                        </div>
                        {item.caption && (
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white text-xs font-medium truncate">{item.caption}</p>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
                    <button className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl z-10" onClick={() => setLightboxIndex(null)} aria-label="Close">×</button>
                    <button className="absolute left-4 text-white/80 hover:text-white text-5xl z-10 px-4" onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null || i === 0 ? items.length - 1 : i - 1)) }} aria-label="Previous">‹</button>
                    <div className="relative w-full h-full max-w-5xl max-h-[90vh] m-auto p-4 flex items-center" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full h-full">
                            <Image src={items[lightboxIndex].image_url} alt={items[lightboxIndex].caption || "Gallery"} fill className="object-contain" sizes="100vw" />
                        </div>
                    </div>
                    <button className="absolute right-4 text-white/80 hover:text-white text-5xl z-10 px-4" onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null || i === items.length - 1 ? 0 : i + 1)) }} aria-label="Next">›</button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">{lightboxIndex + 1} / {items.length}</div>
                </div>
            )}
        </>
    )
}
