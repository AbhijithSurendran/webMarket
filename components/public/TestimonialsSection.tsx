import Image from "next/image"
import { Quote } from "lucide-react"
import type { Testimonial } from "@/lib/types/database"

interface TestimonialsSectionProps {
    testimonials: Testimonial[]
}

const fallback: Partial<Testimonial>[] = [
    { id: "1", name: "Sarah Johnson", designation: "CEO, TechStart Inc.", message: "WebMarket transformed our digital presence. Their team is professional, responsive, and delivered beyond our expectations. Our online sales increased 45% after launch.", photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
    { id: "2", name: "Michael Chen", designation: "CTO, DataFlow Systems", message: "The cloud migration was seamless with zero downtime. Remarkable technical expertise and a pleasure to work with throughout the entire project.", photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
    { id: "3", name: "Emily Rodriguez", designation: "Marketing Director, GrowthCo", message: "Our digital marketing strategy has been a game-changer. 3x increase in qualified leads and a significantly reduced cost per acquisition!", photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" },
]

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    const items = testimonials.length > 0 ? testimonials : (fallback as Testimonial[])

    return (
        <section className="page-section bg-gradient-to-br from-primary-900 to-secondary-900">
            <div className="container-custom">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        Testimonials
                    </div>
                    <h2 className="section-title text-white">What Our Clients Say</h2>
                    <p className="text-lg text-white/70 mt-3 max-w-2xl mx-auto">
                        Don&apos;t just take our word for it — hear from the businesses that trust us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.slice(0, 6).map((t) => (
                        <div
                            key={t.id}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/15 transition-colors"
                        >
                            <Quote size={32} className="text-primary-400 flex-shrink-0" />
                            <p className="text-white/90 text-sm leading-relaxed flex-1">&ldquo;{t.message}&rdquo;</p>
                            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                                {t.photo_url ? (
                                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary-400/50">
                                        <Image
                                            src={t.photo_url}
                                            alt={t.name}
                                            width={48}
                                            height={48}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                        {t.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <div className="font-semibold text-white text-sm">{t.name}</div>
                                    {t.designation && (
                                        <div className="text-white/60 text-xs">{t.designation}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
