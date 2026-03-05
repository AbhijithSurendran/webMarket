import Image from "next/image"
import Link from "next/link"
import FadeIn from "@/components/ui/FadeIn"

interface AboutSectionProps {
    content?: string | null
    bannerImage?: string | null
}

export default function AboutSection({ content, bannerImage }: AboutSectionProps) {
    const description = content || "WebMarket was founded with a simple mission: to deliver exceptional quality products and services. For over a decade, we have been a trusted name in the industry, built on integrity, innovation, and customer satisfaction."
    const image = bannerImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"

    return (
        <section className="page-section bg-gray-50">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <FadeIn direction="right" className="relative">
                        <div className="relative h-[400px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={image}
                                alt="About WebMarket"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-100 rounded-2xl -z-10" />
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 rounded-xl -z-10" />
                    </FadeIn>

                    {/* Content */}
                    <FadeIn direction="left" delay={0.2}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                            Who We Are
                        </div>
                        <h2 className="section-title mb-6">
                            Trusted Partner for Your Business Growth
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8 whitespace-pre-line">
                            {description}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            {[
                                { number: "10+", label: "Years Experience" },
                                { number: "500+", label: "Happy Clients" },
                                { number: "50+", label: "Expert Team" },
                                { number: "99%", label: "Satisfaction Rate" },
                            ].map((stat) => (
                                <div key={stat.label} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <div className="text-2xl font-heading font-bold text-primary-700 mb-1">{stat.number}</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* <Link href="/about" className="btn-primary">
                            Learn More About Us
                        </Link> */}
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}
