import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import ContactForm from "@/components/public/ContactForm"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with WebMarket. We'd love to hear from you.",
}

export default async function ContactPage() {
    let settings: Record<string, string> = {}
    try {
        const supabase = createClient()
        const { data } = await supabase.from("site_settings").select("key, value")
        if (data) settings = Object.fromEntries(data.map((s) => [s.key, s.value ?? ""]))
    } catch { }

    const address = settings.address || "123 Business Street, City, State 12345"
    const phone = settings.phone || "+1 (555) 000-0000"
    const email = settings.email || "info@webmarket.com"
    const mapsEmbed = settings.google_maps_embed || ""

    return (
        <>
            {/* Banner */}
            <div className="bg-gradient-to-r from-primary-800 to-primary-600 py-20">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">Have a question or want to work together? We&apos;d love to hear from you.</p>
                </div>
            </div>

            <section className="page-section bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Get In Touch</h2>
                                <p className="text-gray-500 text-sm">We&apos;re here to help. Send us a message and we&apos;ll respond as soon as possible.</p>
                            </div>

                            <div className="space-y-5">
                                {[
                                    { icon: MapPin, label: "Address", value: address, href: undefined },
                                    { icon: Phone, label: "Phone", value: phone, href: `tel:${phone}` },
                                    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
                                    { icon: Clock, label: "Working Hours", value: "Mon – Fri: 9AM – 6PM", href: undefined },
                                ].map(({ icon: Icon, label, value, href }) => (
                                    <div key={label} className="flex gap-4">
                                        <div className="w-11 h-11 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">{label}</p>
                                            {href ? (
                                                <a href={href} className="text-gray-700 text-sm hover:text-primary-700 transition-colors">{value}</a>
                                            ) : (
                                                <p className="text-gray-700 text-sm">{value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-6">Send Us a Message</h3>
                                <ContactForm />
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    {mapsEmbed && (
                        <div className="mt-16 rounded-2xl overflow-hidden h-80 border border-gray-200 shadow-sm">
                            <div dangerouslySetInnerHTML={{ __html: mapsEmbed }} className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0" />
                        </div>
                    )}
                    {!mapsEmbed && (
                        <div className="mt-16 rounded-2xl overflow-hidden h-80 bg-gray-100 border border-gray-200 flex items-center justify-center">
                            <div className="text-center text-gray-400">
                                <MapPin size={40} className="mx-auto mb-3 opacity-30" />
                                <p className="text-sm">Google Maps embed can be added via the CMS Settings.</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
