"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import type { HeroSlider } from "@/lib/types"

interface HeroSliderProps {
    slides: HeroSlider[]
}

export default function HeroSliderSection({ slides }: HeroSliderProps) {
    const swiperRef = useRef<{ swiper?: { destroy: () => void } }>(null)

    useEffect(() => {
        let swiperInstance: { destroy: () => void } | null = null

        const initSwiper = async () => {
            const { Swiper } = await import("swiper")
            const { Autoplay, Navigation, Pagination, EffectFade } = await import("swiper/modules")

            await import("swiper/css")
            await import("swiper/css/navigation")
            await import("swiper/css/pagination")
            await import("swiper/css/effect-fade")

            swiperInstance = new Swiper(".hero-swiper", {
                modules: [Autoplay, Navigation, Pagination, EffectFade],
                effect: "fade",
                loop: slides.length > 1,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            })
        }

        if (slides.length > 0) {
            initSwiper()
        }

        return () => {
            swiperInstance?.destroy()
        }
    }, [slides.length])

    const fallbackSlide: HeroSlider = {
        id: "fallback",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
        title: "Welcome to WebMarket",
        description: "Your trusted partner for quality products and professional services.",
        buttonText: "Learn More",
        buttonLink: "/about",
        sortOrder: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    const displaySlides = slides.length > 0 ? slides : [fallbackSlide as HeroSlider]

    return (
        <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
            <div className="swiper hero-swiper h-full w-full">
                <div className="swiper-wrapper">
                    {displaySlides.map((slide) => (
                        <div key={slide.id} className="swiper-slide relative">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
                            </div>

                            {/* Slide Content */}
                            <div className="relative z-10 h-full flex items-center">
                                <div className="container-custom w-full">
                                    <div className="max-w-3xl">
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 animate-fade-in">
                                            {slide.title}
                                        </h1>
                                        {slide.description && (
                                            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
                                                {slide.description}
                                            </p>
                                        )}
                                        {slide.buttonText && slide.buttonLink && (
                                            <div className="flex flex-wrap gap-4">
                                                <Link
                                                    href={slide.buttonLink}
                                                    className="btn-primary text-base px-8 py-3.5"
                                                >
                                                    {slide.buttonText}
                                                </Link>
                                                <Link
                                                    href="/contact"
                                                    className="btn-secondary text-base px-8 py-3.5 bg-transparent border-white text-white hover:bg-white/20 hover:text-white"
                                                >
                                                    Contact Us
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="swiper-button-prev" />
                <div className="swiper-button-next" />
                <div className="swiper-pagination" />
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 animate-bounce">
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-0.5 h-6 bg-white/50 rounded-full" />
            </div>
        </section>
    )
}
