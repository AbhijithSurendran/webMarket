"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
    LayoutDashboard, ImageIcon, FileText, Wrench, Package, Images, BookOpen,
    MessageSquare, Inbox, Settings, LogOut, Menu, X, ChevronRight,
} from "lucide-react"

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/hero-sliders", label: "Hero Sliders", icon: ImageIcon },
    { href: "/admin/pages", label: "Pages", icon: FileText },
    { href: "/admin/services", label: "Services", icon: Wrench },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/gallery", label: "Gallery", icon: Images },
    { href: "/admin/blogs", label: "Blogs", icon: BookOpen },
    { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
    { href: "/admin/settings", label: "Site Settings", icon: Settings },
]

export default function AdminSidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const isActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname.startsWith(href)

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="px-6 py-5 border-b border-gray-200">
                <Link href="/admin" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">W</div>
                    <span className="font-heading font-bold text-gray-900">WebMarket CMS</span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {navItems.map(({ href, label, icon: Icon, exact }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive(href, exact)
                                ? "bg-primary-50 text-primary-700"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                    >
                        <Icon size={18} className={isActive(href, exact) ? "text-primary-600" : "text-gray-400"} />
                        <span className="flex-1">{label}</span>
                        {isActive(href, exact) && <ChevronRight size={14} className="text-primary-400" />}
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-gray-200 space-y-1">
                <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                    <ImageIcon size={18} className="text-gray-400" />
                    View Website
                </Link>
                <form action="/admin/logout" method="POST">
                    <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen fixed top-0 left-0 bottom-0 z-40">
                <SidebarContent />
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between px-4 h-14">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xs">W</div>
                    <span className="font-heading font-semibold text-gray-900 text-sm">WebMarket CMS</span>
                </Link>
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100" aria-label="Toggle sidebar">
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-40 flex">
                    <div className="fixed inset-0 bg-black/40" onClick={() => setIsOpen(false)} />
                    <div className="relative w-64 bg-white h-full shadow-xl z-50 overflow-y-auto">
                        <SidebarContent />
                    </div>
                </div>
            )}
        </>
    )
}
