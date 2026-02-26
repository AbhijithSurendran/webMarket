import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import HeroSliderSection from "@/components/public/HeroSlider"
import AboutSection from "@/components/public/AboutSection"
import ServicesSection from "@/components/public/ServicesSection"
import ProductsSection from "@/components/public/ProductsSection"
import GallerySection from "@/components/public/GallerySection"
import TestimonialsSection from "@/components/public/TestimonialsSection"
import { getSiteSettings } from "@/lib/utils"

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings()
    return {
        title: settings.meta_title || "WebMarket — Quality Products & Services",
        description: settings.meta_description || "Discover our wide range of quality products and professional services.",
        openGraph: {
            title: settings.meta_title || "WebMarket",
            description: settings.meta_description,
            images: settings.logo_url ? [settings.logo_url] : [],
        },
    }
}

export default async function HomePage() {
    let sliders: Awaited<ReturnType<typeof createClient>> extends infer S
        ? S extends { from: (t: string) => { select: (...a: unknown[]) => unknown } }
        ? unknown
        : never
        : never

    // Parallel data fetching
    let heroSliders: import("@/lib/types/database").HeroSlider[] = []
    let aboutPage: import("@/lib/types/database").Page | null = null
    let services: import("@/lib/types/database").Service[] = []
    let products: import("@/lib/types/database").Product[] = []
    let gallery: import("@/lib/types/database").GalleryItem[] = []
    let testimonials: import("@/lib/types/database").Testimonial[] = []

    try {
        const supabase = createClient()
        const [
            { data: slidersData },
            { data: aboutData },
            { data: servicesData },
            { data: productsData },
            { data: galleryData },
            { data: testimonialsData },
        ] = await Promise.all([
            supabase.from("hero_sliders").select("*").eq("is_active", true).order("sort_order"),
            supabase.from("pages").select("*").eq("slug", "about").single(),
            supabase.from("services").select("*").eq("is_published", true).order("sort_order").limit(6),
            supabase.from("products").select("*").eq("is_published", true).order("sort_order").limit(6),
            supabase.from("gallery").select("*").eq("is_active", true).order("sort_order").limit(6),
            supabase.from("testimonials").select("*").eq("is_active", true).order("sort_order").limit(6),
        ])

        heroSliders = slidersData || []
        aboutPage = aboutData
        services = servicesData || []
        products = productsData || []
        gallery = galleryData || []
        testimonials = testimonialsData || []
    } catch {
        // DB not configured yet — fall through to show demo content
    }

    return (
        <>
            <HeroSliderSection slides={heroSliders} />
            <AboutSection content={aboutPage?.content} bannerImage={aboutPage?.banner_image} />
            <ServicesSection services={services} />
            <ProductsSection products={products} />
            <GallerySection items={gallery} />
            <TestimonialsSection testimonials={testimonials} />

            {/* CTA Banner */}
            <section className="py-20 bg-primary-600">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                        Ready to Work With Us?
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                        Let&apos;s discuss how we can help your business achieve its goals.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-700">
                            Get In Touch
                        </a>
                        <a href="/services" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-6 py-3 rounded-lg transition-all duration-200">
                            Our Services
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
