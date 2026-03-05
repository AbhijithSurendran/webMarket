import Image from "next/image"
import Link from "next/link"
import FadeIn from "@/components/ui/FadeIn"
import { ArrowRight } from "lucide-react"
import { truncate } from "@/lib/utils"
import type { Service } from "@/lib/types"

interface ServicesSectionProps {
    services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
    const display = services.slice(0, 6)

    const fallback: Partial<Service>[] = [
        { id: "1", title: "Business Consulting", description: "Expert guidance to help your business grow.", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", slug: "consulting" },
        { id: "2", title: "Digital Marketing", description: "Comprehensive digital strategies to boost your brand.", image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80", slug: "digital-marketing" },
        { id: "3", title: "Web Development", description: "Custom web solutions for performance and scale.", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80", slug: "web-development" },
    ]

    const items = display.length > 0 ? display : (fallback as Service[])

    return (
        <section className="page-section bg-white">
            <div className="container-custom">
                {/* Header */}
                <FadeIn direction="up" className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        Our Services
                    </div>
                    <h2 className="section-title">What We Offer</h2>
                    <p className="section-subtitle">
                        Comprehensive solutions designed to help your business thrive in the modern landscape.
                    </p>
                </FadeIn>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((service, index) => (
                        <FadeIn key={service.id} delay={index * 0.1} direction="up">
                            <Link
                                href={`/services/${service.slug}`}
                                className="group card hover:shadow-xl transition-all duration-300 block h-full"
                            >
                                <div className="relative h-52 overflow-hidden">
                                    <Image
                                        src={service.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"}
                                        alt={service.title!}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                                        {truncate(service.description || "", 100)}
                                    </p>
                                    <span className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all mt-auto">
                                        Learn More <ArrowRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>

                {/* CTA */}
                <FadeIn direction="up" delay={0.2} className="text-center mt-12">
                    <Link href="/services" className="btn-secondary">
                        View All Services
                    </Link>
                </FadeIn>
            </div>
        </section>
    )
}
