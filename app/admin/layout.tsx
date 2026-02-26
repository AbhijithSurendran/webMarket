import AdminSidebar from "@/components/admin/AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar />
            {/* Content area offset for sidebar */}
            <div className="lg:pl-64">
                <main className="pt-14 lg:pt-0 min-h-screen">{children}</main>
            </div>
        </div>
    )
}
