import Image from "next/image"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { getSiteSettings } from "@/lib/utils"
import type { Page } from "@/lib/types/database"

export async function generateMetadata(): Promise<Metadata> {
    try {
        const supabase = createClient()
        const { data } = await supabase.from("pages").select("meta_title, meta_description").eq("slug", "about").single()
        return {
            title: data?.meta_title || "About Us",
            description: data?.meta_description || "Learn about WebMarket, our vision and mission.",
            openGraph: { title: data?.meta_title || "About Us" },
        }
    } catch {
        return { title: "About Us" }
    }
}

export default async function AboutPage() {
    let page: Page | null = null
    try {
        const supabase = createClient()
        const { data } = await supabase.from("pages").select("*").eq("slug", "about").single()
        page = data
    } catch { }

    const content = (page?.content as Record<string, string>) ?? {}
    const description = content.description || "WebMarket was founded with a simple mission: to deliver exceptional quality products and services to businesses and individuals. For over a decade, we have been a trusted name in the industry, built on the pillars of integrity, innovation, and customer satisfaction.\n\nOur team of dedicated professionals brings together decades of combined experience to ensure that every client receives personalized attention and solutions tailored to their specific needs."
    const visionTitle = content.vision_title || "Our Vision"
    const visionText = content.vision_description || "To be the most trusted and innovative provider of products and services, empowering businesses to thrive in a competitive marketplace through quality, reliability, and exceptional customer experiences."
    const missionTitle = content.mission_title || "Our Mission"
    const missionText = content.mission_description || "We strive to deliver superior quality products and services that exceed customer expectations, foster long-term partnerships built on trust, and continuously innovate to stay ahead of industry trends — all while maintaining the highest standards of business ethics."
    const bannerImage = page?.banner_image || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"

    return (
        <>
            {/* Page Banner */}
            <div className="relative h-64 md:h-80 lg:h-96">
                <Image src={bannerImage} alt="About Us" fill className="object-cover" priority sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
                    <div className="container-custom">
                        <p className="text-primary-300 text-sm font-medium uppercase tracking-widest mb-3">Who We Are</p>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">About Us</h1>
                    </div>
                </div>
            </div>

            {/* Description */}
            <section className="page-section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="section-title mb-6">Our Story</h2>
                            <div className="text-gray-600 leading-relaxed space-y-4 text-lg whitespace-pre-line">{description}</div>
                        </div>
                        <div className="space-y-6">
                            {[
                                { number: "10+", label: "Years of Excellence" },
                                { number: "500+", label: "Happy Clients" },
                                { number: "50+", label: "Expert Professionals" },
                                { number: "99%", label: "Client Satisfaction Rate" },
                            ].map((stat) => (
                                <div key={stat.label} className="flex items-center gap-6 p-5 rounded-xl bg-gray-50 border border-gray-100">
                                    <div className="text-4xl font-heading font-bold text-primary-700 min-w-[5rem]">{stat.number}</div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="page-section bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">{visionTitle}</h3>
                            <p className="text-gray-600 leading-relaxed">{visionText}</p>
                        </div>
                        <div className="bg-primary-600 rounded-2xl p-8 shadow-sm">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                            </div>
                            <h3 className="text-2xl font-heading font-bold text-white mb-4">{missionTitle}</h3>
                            <p className="text-white/90 leading-relaxed">{missionText}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="container-custom text-center">
                    <h2 className="section-title mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">Contact us today and let us show you how we can help your business grow.</p>
                    <a href="/contact" className="btn-primary">Contact Us</a>
                </div>
            </section>
        </>
    )
}
