import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink?: string;
    backgroundImageUrl?: string;
}

export default function HeroSection({
    title,
    subtitle,
    ctaText,
    ctaLink = "/services",
    backgroundImageUrl = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
}: HeroSectionProps) {
    return (
        <section className="relative h-[88vh] min-h-[560px] w-full flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
            </div>

            {/* Content */}
            <div className="container-custom relative z-10 w-full animate-fade-in">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 animate-slide-up">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl animate-slide-up" style={{ animationDelay: "100ms" }}>
                            {subtitle}
                        </p>
                    )}
                    {(ctaText && ctaLink) && (
                        <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
                            <Link
                                href={ctaLink}
                                className="btn-primary text-base px-8 py-3.5"
                            >
                                {ctaText}
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
        </section>
    );
}
