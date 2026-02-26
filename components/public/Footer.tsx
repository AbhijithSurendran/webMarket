import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

interface FooterProps {
    settings?: Record<string, string>
}

const footerLinks = [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
]

export default function Footer({ settings = {} }: FooterProps) {
    const siteName = settings.site_name || "WebMarket"
    const description = settings.footer_description || "Your trusted partner for quality products and professional services."
    const footerText = settings.footer_text || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`
    const address = settings.address || ""
    const phone = settings.phone || ""
    const email = settings.email || ""
    const facebookUrl = settings.facebook_url || ""
    const twitterUrl = settings.twitter_url || ""
    const instagramUrl = settings.instagram_url || ""
    const linkedinUrl = settings.linkedin_url || ""

    return (
        <footer className="bg-secondary-900 text-gray-300">
            <div className="container-custom py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="text-2xl font-heading font-bold text-white block mb-4">
                            {siteName}
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400 mb-6">{description}</p>
                        <div className="flex gap-3">
                            {facebookUrl && (
                                <a href={facebookUrl} target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary-600 transition-colors">
                                    <Facebook size={16} />
                                </a>
                            )}
                            {twitterUrl && (
                                <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary-600 transition-colors">
                                    <Twitter size={16} />
                                </a>
                            )}
                            {instagramUrl && (
                                <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary-600 transition-colors">
                                    <Instagram size={16} />
                                </a>
                            )}
                            {linkedinUrl && (
                                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary-600 transition-colors">
                                    <Linkedin size={16} />
                                </a>
                            )}
                            {/* Default icons if no settings */}
                            {!facebookUrl && !twitterUrl && !instagramUrl && !linkedinUrl && (
                                <>
                                    <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10"><Facebook size={16} /></span>
                                    <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10"><Twitter size={16} /></span>
                                    <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10"><Instagram size={16} /></span>
                                    <span className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10"><Linkedin size={16} /></span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-semibold text-white mb-4 text-base">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-heading font-semibold text-white mb-4 text-base">Contact</h3>
                        <ul className="space-y-3">
                            {(address || "123 Business Street, City, State") && (
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <MapPin size={16} className="flex-shrink-0 mt-0.5 text-primary-400" />
                                    <span>{address || "123 Business Street, City, State 12345"}</span>
                                </li>
                            )}
                            {(phone || "+1 (555) 000-0000") && (
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <Phone size={16} className="flex-shrink-0 mt-0.5 text-primary-400" />
                                    <a href={`tel:${phone || "+15550000000"}`} className="hover:text-white transition-colors">
                                        {phone || "+1 (555) 000-0000"}
                                    </a>
                                </li>
                            )}
                            {(email || "info@webmarket.com") && (
                                <li className="flex gap-3 text-sm text-gray-400">
                                    <Mail size={16} className="flex-shrink-0 mt-0.5 text-primary-400" />
                                    <a href={`mailto:${email || "info@webmarket.com"}`} className="hover:text-white transition-colors">
                                        {email || "info@webmarket.com"}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-heading font-semibold text-white mb-4 text-base">Stay Updated</h3>
                        <p className="text-sm text-gray-400 mb-4">Get the latest news and updates delivered to your inbox.</p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button type="submit" className="px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors flex-shrink-0">
                                Go
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-gray-500">{footerText}</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
