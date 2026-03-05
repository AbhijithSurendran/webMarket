import { getDB } from "@/lib/db"
import { deleteEnquiry, markEnquiryRead } from "@/app/actions/cms"
import { formatDate } from "@/lib/utils"
import { Mail, Phone, MapPin, Trash2, CheckCircle } from "lucide-react"

export default async function EnquiriesPage() {
    let enquiries: import("@/lib/types").Enquiry[] = []
    try {
        const db = await getDB();
        enquiries = db.enquiries ? [...db.enquiries].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) : [];
    } catch { }

    const unread = enquiries.filter((e) => !e.is_read).length

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-gray-900">Enquiries</h1>
                    <p className="text-gray-500 text-sm mt-1">{enquiries.length} total{unread > 0 ? ` · ${unread} unread` : ""}</p>
                </div>
                {unread > 0 && <span className="badge bg-red-100 text-red-700 text-sm px-3 py-1">{unread} new</span>}
            </div>

            {enquiries.length === 0 ? (
                <div className="admin-card p-12 text-center"><p className="text-gray-400">No enquiries yet. They&apos;ll appear here when users fill out the contact form.</p></div>
            ) : (
                <div className="space-y-4">
                    {enquiries.map((e) => (
                        <div key={e.id} className={`admin-card p-5 ${!e.is_read ? "border-l-4 border-primary-500" : ""}`}>
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-900">{e.name}</h3>
                                        {!e.is_read && <span className="badge bg-primary-100 text-primary-700 text-xs">New</span>}
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                                        <span className="flex items-center gap-1"><Mail size={12} /><a href={`mailto:${e.email}`} className="hover:text-primary-600">{e.email}</a></span>
                                        {e.phone && <span className="flex items-center gap-1"><Phone size={12} />{e.phone}</span>}
                                        {e.location && <span className="flex items-center gap-1"><MapPin size={12} />{e.location}</span>}
                                    </div>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-3">{e.message}</p>
                                    <p className="text-xs text-gray-300 mt-2">{formatDate(e.created_at)}</p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    {!e.is_read && (
                                        <form action={async () => { "use server"; await markEnquiryRead(e.id) }}>
                                            <button type="submit" className="btn-ghost text-xs py-1.5 px-3 text-green-600 border-green-200 hover:bg-green-50">
                                                <CheckCircle size={13} /> Mark Read
                                            </button>
                                        </form>
                                    )}
                                    <form action={async () => { "use server"; await deleteEnquiry(e.id) }}>
                                        <button type="submit" className="btn-danger text-xs py-1.5 px-3"><Trash2 size={13} /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
