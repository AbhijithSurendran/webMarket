import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { deleteTestimonial } from "@/app/actions/cms"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function TestimonialsAdminPage() {
    let items: import("@/lib/types/database").Testimonial[] = []
    try { const s = createClient(); const { data } = await s.from("testimonials").select("*").order("sort_order"); items = data || [] } catch { }

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div><h1 className="text-2xl font-heading font-bold text-gray-900">Testimonials</h1><p className="text-gray-500 text-sm mt-1">{items.length} testimonial{items.length !== 1 ? "s" : ""}</p></div>
                <Link href="/admin/testimonials/new" className="btn-primary text-sm py-2"><Plus size={16} /> New Testimonial</Link>
            </div>
            {items.length === 0 ? <div className="admin-card p-12 text-center"><p className="text-gray-400 mb-4">No testimonials yet.</p><Link href="/admin/testimonials/new" className="btn-primary text-sm">Add Testimonial</Link></div>
                : <div className="space-y-4">{items.map((item) => (<div key={item.id} className="admin-card p-4 flex items-center gap-4">
                    {item.photo_url ? <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100"><Image src={item.photo_url} alt={item.name} fill className="object-cover" sizes="48px" /></div>
                        : <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg flex-shrink-0">{item.name.charAt(0)}</div>}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2"><h3 className="font-medium text-gray-900">{item.name}</h3>{item.designation && <span className="text-xs text-gray-400">— {item.designation}</span>}<span className={`badge flex-shrink-0 ${item.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.is_active ? "Active" : "Hidden"}</span></div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">&ldquo;{item.message}&rdquo;</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                        <Link href={`/admin/testimonials/${item.id}`} className="btn-ghost text-xs py-1.5 px-3"><Pencil size={13} /> Edit</Link>
                        <form action={async () => { "use server"; await deleteTestimonial(item.id) }}><button type="submit" className="btn-danger text-xs py-1.5 px-3"><Trash2 size={13} /></button></form>
                    </div>
                </div>))}</div>}
        </div>
    )
}
