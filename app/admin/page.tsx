import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { LayoutDashboard, Inbox, BookOpen, Package, Wrench, Images, MessageSquare, ArrowUpRight } from "lucide-react"

async function getStats() {
    try {
        const supabase = createClient()
        const [enquiries, blogs, products, services, gallery, testimonials] = await Promise.all([
            supabase.from("enquiries").select("id", { count: "exact" }).then(r => r.count || 0),
            supabase.from("blogs").select("id", { count: "exact" }).eq("is_published", true).then(r => r.count || 0),
            supabase.from("products").select("id", { count: "exact" }).eq("is_published", true).then(r => r.count || 0),
            supabase.from("services").select("id", { count: "exact" }).eq("is_published", true).then(r => r.count || 0),
            supabase.from("gallery").select("id", { count: "exact" }).eq("is_active", true).then(r => r.count || 0),
            supabase.from("testimonials").select("id", { count: "exact" }).eq("is_active", true).then(r => r.count || 0),
        ])
        const unreadEnquiries = await supabase.from("enquiries").select("id", { count: "exact" }).eq("is_read", false).then(r => r.count || 0)
        return { enquiries, unreadEnquiries, blogs, products, services, gallery, testimonials }
    } catch {
        return { enquiries: 0, unreadEnquiries: 0, blogs: 0, products: 0, services: 0, gallery: 0, testimonials: 0 }
    }
}

const statCards = (stats: Awaited<ReturnType<typeof getStats>>) => [
    { label: "Total Enquiries", value: stats.enquiries, badge: stats.unreadEnquiries > 0 ? `${stats.unreadEnquiries} new` : undefined, icon: Inbox, href: "/admin/enquiries", color: "bg-blue-50 text-blue-700" },
    { label: "Blog Posts", value: stats.blogs, icon: BookOpen, href: "/admin/blogs", color: "bg-green-50 text-green-700" },
    { label: "Products", value: stats.products, icon: Package, href: "/admin/products", color: "bg-purple-50 text-purple-700" },
    { label: "Services", value: stats.services, icon: Wrench, href: "/admin/services", color: "bg-orange-50 text-orange-700" },
    { label: "Gallery Images", value: stats.gallery, icon: Images, href: "/admin/gallery", color: "bg-pink-50 text-pink-700" },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquare, href: "/admin/testimonials", color: "bg-yellow-50 text-yellow-700" },
]

export default async function AdminDashboard() {
    const stats = await getStats()
    const cards = statCards(stats)

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-heading font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Welcome back! Here&apos;s an overview of your content.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {cards.map((card) => (
                    <Link key={card.label} href={card.href} className="admin-card p-5 flex items-center gap-4 hover:shadow-md transition-shadow group">
                        <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center flex-shrink-0`}>
                            <card.icon size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-heading font-bold text-gray-900">{card.value}</span>
                                {card.badge && (
                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">{card.badge}</span>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 truncate">{card.label}</p>
                        </div>
                        <ArrowUpRight size={16} className="text-gray-300 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="admin-card p-6">
                <h2 className="text-base font-heading font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {[
                        { href: "/admin/blogs/new", label: "New Blog Post", icon: BookOpen },
                        { href: "/admin/services/new", label: "New Service", icon: Wrench },
                        { href: "/admin/products/new", label: "New Product", icon: Package },
                        { href: "/admin/gallery/new", label: "Add Image", icon: Images },
                        { href: "/admin/testimonials/new", label: "New Testimonial", icon: MessageSquare },
                        { href: "/admin/hero-sliders/new", label: "Add Slide", icon: LayoutDashboard },
                        { href: "/admin/enquiries", label: "View Enquiries", icon: Inbox },
                        { href: "/admin/settings", label: "Site Settings", icon: LayoutDashboard },
                    ].map((action) => (
                        <Link key={action.href} href={action.href}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:bg-primary-50 hover:border-primary-200 transition-all text-center group">
                            <action.icon size={20} className="text-gray-400 group-hover:text-primary-600 transition-colors" />
                            <span className="text-xs font-medium text-gray-600 group-hover:text-primary-700 transition-colors leading-snug">{action.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
