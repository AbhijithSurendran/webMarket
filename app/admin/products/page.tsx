import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { deleteProduct } from "@/app/actions/cms"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function ProductsAdminPage() {
    let items: import("@/lib/types/database").Product[] = []
    try { const s = createClient(); const { data } = await s.from("products").select("*").order("sort_order"); items = data || [] } catch { }
    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div><h1 className="text-2xl font-heading font-bold text-gray-900">Products</h1><p className="text-gray-500 text-sm mt-1">{items.length} item{items.length !== 1 ? "s" : ""}</p></div>
                <Link href="/admin/products/new" className="btn-primary text-sm py-2"><Plus size={16} /> New Product</Link>
            </div>
            {items.length === 0 ? <div className="admin-card p-12 text-center"><p className="text-gray-400 mb-4">No products yet.</p><Link href="/admin/products/new" className="btn-primary text-sm"><Plus size={16} /> Add Product</Link></div>
                : <div className="admin-card overflow-hidden"><table className="w-full text-sm"><thead className="bg-gray-50 border-b border-gray-100"><tr><th className="text-left px-5 py-3 text-gray-500 font-medium">Product</th><th className="text-left px-5 py-3 text-gray-500 font-medium hidden md:table-cell">Slug</th><th className="px-5 py-3 text-gray-500 font-medium">Status</th><th className="px-5 py-3 text-gray-500 font-medium">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-50">{items.map((item) => (<tr key={item.id} className="hover:bg-gray-50"><td className="px-5 py-3"><div className="flex items-center gap-3">{item.image_url && <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"><Image src={item.image_url} alt={item.title} fill className="object-cover" sizes="40px" /></div>}<span className="font-medium text-gray-900">{item.title}</span></div></td><td className="px-5 py-3 hidden md:table-cell text-gray-400 font-mono text-xs">/{item.slug}</td><td className="px-5 py-3 text-center"><span className={`badge ${item.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.is_published ? "Published" : "Draft"}</span></td><td className="px-5 py-3"><div className="flex items-center justify-center gap-2"><Link href={`/admin/products/${item.id}`} className="btn-ghost py-1 px-2.5 text-xs"><Pencil size={12} /> Edit</Link><form action={async () => { "use server"; await deleteProduct(item.id) }}><button type="submit" className="btn-danger py-1 px-2.5 text-xs"><Trash2 size={12} /></button></form></div></td></tr>))}</tbody></table></div>}
        </div>
    )
}
