import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { deleteGalleryItem } from "@/app/actions/cms"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function GalleryAdminPage() {
    let items: import("@/lib/types/database").GalleryItem[] = []
    try { const s = createClient(); const { data } = await s.from("gallery").select("*").order("sort_order"); items = data || [] } catch { }

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div><h1 className="text-2xl font-heading font-bold text-gray-900">Gallery</h1><p className="text-gray-500 text-sm mt-1">{items.length} image{items.length !== 1 ? "s" : ""}</p></div>
                <Link href="/admin/gallery/new" className="btn-primary text-sm py-2"><Plus size={16} /> Add Image</Link>
            </div>
            {items.length === 0 ? <div className="admin-card p-12 text-center"><p className="text-gray-400 mb-4">No gallery images yet.</p><Link href="/admin/gallery/new" className="btn-primary text-sm">Add Image</Link></div>
                : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="admin-card overflow-hidden group">
                            <div className="relative aspect-square bg-gray-100">
                                <Image src={item.image_url} alt={item.caption || "Gallery"} fill className="object-cover" sizes="200px" />
                                {!item.is_active && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">Hidden</span></div>}
                            </div>
                            <div className="p-2">
                                {item.caption && <p className="text-xs text-gray-600 truncate mb-2">{item.caption}</p>}
                                <div className="flex gap-1">
                                    <Link href={`/admin/gallery/${item.id}`} className="btn-ghost py-1 px-2 text-xs flex-1 justify-center"><Pencil size={11} /></Link>
                                    <form action={async () => { "use server"; await deleteGalleryItem(item.id) }}><button type="submit" className="btn-danger py-1 px-2 text-xs"><Trash2 size={11} /></button></form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
        </div>
    )
}
