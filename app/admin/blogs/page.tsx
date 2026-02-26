import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { deleteBlog } from "@/app/actions/cms"
import { formatDate } from "@/lib/utils"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function BlogsAdminPage() {
    let items: import("@/lib/types/database").Blog[] = []
    try { const s = createClient(); const { data } = await s.from("blogs").select("*").order("created_at", { ascending: false }); items = data || [] } catch { }

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div><h1 className="text-2xl font-heading font-bold text-gray-900">Blog Posts</h1><p className="text-gray-500 text-sm mt-1">{items.length} post{items.length !== 1 ? "s" : ""}</p></div>
                <Link href="/admin/blogs/new" className="btn-primary text-sm py-2"><Plus size={16} /> New Post</Link>
            </div>
            {items.length === 0 ? <div className="admin-card p-12 text-center"><p className="text-gray-400 mb-4">No blog posts yet.</p><Link href="/admin/blogs/new" className="btn-primary text-sm">Create First Post</Link></div>
                : <div className="space-y-4">{items.map((item) => (<div key={item.id} className="admin-card p-4 flex items-center gap-4">
                    {item.cover_image && <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100"><Image src={item.cover_image} alt={item.title} fill className="object-cover" sizes="80px" /></div>}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5"><h3 className="font-medium text-gray-900 truncate">{item.title}</h3><span className={`badge flex-shrink-0 ${item.is_published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{item.is_published ? "Published" : "Draft"}</span></div>
                        <p className="text-xs text-gray-400">{item.author && `By ${item.author} · `}{item.published_at ? formatDate(item.published_at) : "Unpublished"}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                        <Link href={`/admin/blogs/${item.id}`} className="btn-ghost text-xs py-1.5 px-3"><Pencil size={13} /> Edit</Link>
                        <form action={async () => { "use server"; await deleteBlog(item.id) }}><button type="submit" className="btn-danger text-xs py-1.5 px-3"><Trash2 size={13} /></button></form>
                    </div>
                </div>))}</div>}
        </div>
    )
}
