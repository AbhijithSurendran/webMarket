"use client"

import { useState } from "react"
import Image from "next/image"
import type { GalleryItem } from "@/lib/types/database"

interface GallerySectionProps {
    items: GalleryItem[]
}

const fallback: Partial<GalleryItem>[] = [
    { id: "1", image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", caption: "Office Space" },
    { id: "2", image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80", caption: "Team Meeting" },
    { id: "3", image_url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", caption: "Dev Lab" },
    { id: "4", image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", caption: "Tech Showcase" },
    { id: "5", image_url: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80", caption: "Presentation" },
    { id: "6", image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80", caption: "Support Team" },
]

export default function GallerySection({ items }: GallerySectionProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
    const display = items.length > 0 ? items.slice(0, 6) : (fallback as GalleryItem[])

    return (
        <section className="page-section bg-white">
            <div className="container-custom">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        Gallery
                    </div>
                    <h2 className="section-title">A Glimpse Inside</h2>
                    <p className="section-subtitle">
                        Take a visual tour of our workspace, team, and milestones.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {display.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setLightboxIndex(index)}
                            className="relative h-48 md:h-64 overflow-hidden rounded-xl group cursor-pointer"
                            aria-label={item.caption || `Gallery image ${index + 1}`}
                        >
                            <Image
                                src={item.image_url}
                                alt={item.caption || `Gallery ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                                    View
                                </span>
                            </div>
                            {item.caption && (
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white text-xs font-medium">{item.caption}</p>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <a href="/gallery" className="btn-secondary">View Full Gallery</a>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 transition-colors z-10"
                        onClick={() => setLightboxIndex(null)}
                        aria-label="Close lightbox"
                    >
                        ×
                    </button>
                    <button
                        className="absolute left-4 text-white text-3xl font-bold hover:text-gray-300 transition-colors z-10 px-4"
                        onClick={(e) => {
                            e.stopPropagation()
                            setLightboxIndex((i) => (i === null || i === 0 ? display.length - 1 : i - 1))
                        }}
                        aria-label="Previous"
                    >
                        ‹
                    </button>
                    <div
                        className="relative w-full max-w-4xl max-h-[85vh] aspect-video"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={display[lightboxIndex].image_url}
                            alt={display[lightboxIndex].caption || "Gallery"}
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </div>
                    <button
                        className="absolute right-4 text-white text-3xl font-bold hover:text-gray-300 transition-colors z-10 px-4"
                        onClick={(e) => {
                            e.stopPropagation()
                            setLightboxIndex((i) => (i === null || i === display.length - 1 ? 0 : i + 1))
                        }}
                        aria-label="Next"
                    >
                        ›
                    </button>
                    {display[lightboxIndex].caption && (
                        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                            {display[lightboxIndex].caption}
                        </p>
                    )}
                </div>
            )}
        </section>
    )
}
