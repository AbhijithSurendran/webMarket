"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
]

interface NavbarProps {
    logoUrl?: string
    siteName?: string
}

export default function Navbar({ logoUrl, siteName = "WebMarket" }: NavbarProps) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/95 backdrop-blur-md shadow-sm"
                : "bg-white/80 backdrop-blur-sm"
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        {logoUrl ? (
                            <Image
                                src={logoUrl}
                                alt={siteName}
                                width={140}
                                height={40}
                                className="h-8 w-auto object-contain"
                            />
                        ) : (
                            <span className="text-2xl font-heading font-bold text-primary-700">
                                {siteName}
                            </span>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                            ? "bg-primary-50 text-primary-700"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* CTA + Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <Link href="/contact" className="hidden lg:inline-flex btn-primary text-sm py-2 px-5">
                            Get In Touch
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                            id="mobile-menu-btn"
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-down">
                    <nav className="container-custom py-3 flex flex-col gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                            ? "bg-primary-50 text-primary-700"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                        <div className="pt-2 pb-1">
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="btn-primary text-sm justify-center w-full"
                            >
                                Get In Touch
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
