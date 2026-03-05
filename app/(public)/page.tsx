import type { Metadata } from "next"
import HeroSection from "@/components/ui/HeroSection"
import HeroSliderSection from "@/components/public/HeroSlider"
import AboutSection from "@/components/public/AboutSection"
import ServicesSection from "@/components/public/ServicesSection"
import ProductsSection from "@/components/public/ProductsSection"
import GallerySection from "@/components/public/GallerySection"
import { getDB } from "@/lib/db"

export const metadata: Metadata = {
    title: "WebMarket — Quality Products & Services",
    description: "Discover our wide range of quality products and professional services.",
}

export default async function HomePage() {
    const db = await getDB();
    const { home, about } = db.pages;
    const heroSliders = (db.heroSliders?.filter(s => s.isActive) || []).sort((a, b) => a.sortOrder - b.sortOrder);
    const services = db.services.slice(0, 6);
    const products = db.products.slice(0, 6);
    const galleryItems = db.gallery.slice(0, 6);

    return (
        <>
            {heroSliders.length > 0 && (
                <HeroSliderSection slides={heroSliders} />
            )}
            {heroSliders.length === 0 && (
                <HeroSection
                    title={home.heroTitle}
                    subtitle={home.heroSubtitle}
                    ctaText={home.heroCta}
                />
            )}

            <AboutSection
                content={about.content}
                bannerImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
            />

            {services.length > 0 && <ServicesSection services={services} />}
            {products.length > 0 && <ProductsSection products={products} />}
            {galleryItems.length > 0 && <GallerySection items={galleryItems} />}

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
