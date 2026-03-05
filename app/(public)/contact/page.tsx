import type { Metadata } from "next"
import { MapPin, Phone, Mail } from "lucide-react"
import PageHeader from "@/components/ui/PageHeader"
import PageContainer from "@/components/ui/PageContainer"
import ContactForm from "@/components/public/ContactForm"
import FadeIn from "@/components/ui/FadeIn"
import { getDB } from "@/lib/db"

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with our team.",
}

export default async function ContactPage() {
    const db = await getDB();
    const contactInfo = db.pages.contact;

    return (
        <>
            <PageHeader
                title="Contact Us"
                description="Have a question or want to work with us? We'd love to hear from you."
            />

            <PageContainer className="bg-white">
                <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
                    {/* Contact Information */}
                    <FadeIn direction="right">
                        <div className="mb-10">
                            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                                Get In Touch
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Fill out the form and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 text-primary-600">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-semibold text-gray-900 mb-1 text-lg">Office</h3>
                                    <p className="text-gray-600 leading-relaxed max-w-xs">
                                        {contactInfo.address || "123 Business Avenue, Tech District, City, Country"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 text-primary-600">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-semibold text-gray-900 mb-1 text-lg">Phone</h3>
                                    <p className="text-gray-600">
                                        <a href={`tel:${contactInfo.phone || "+1234567890"}`} className="hover:text-primary-600 transition-colors">
                                            {contactInfo.phone || "+1 (234) 567-890"}
                                        </a>
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">Mon-Fri from 8am to 5pm.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 text-primary-600">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-semibold text-gray-900 mb-1 text-lg">Email</h3>
                                    <p className="text-gray-600">
                                        <a href={`mailto:${contactInfo.email || "hello@webmarket.com"}`} className="hover:text-primary-600 transition-colors">
                                            {contactInfo.email || "hello@webmarket.com"}
                                        </a>
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">We typically reply within 24 hours.</p>
                                </div>
                            </div>
                        </div>

                        {/* Map or image placeholder */}
                        <div className="mt-12 h-64 bg-gray-100 rounded-2xl overflow-hidden relative">
                            <iframe width="100%" height="100%" frameBorder="0" scrolling="no" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=New%20York+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                        </div>
                    </FadeIn>

                    {/* Contact Form */}
                    <FadeIn direction="left" delay={0.2} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 lg:sticky lg:top-32">
                        <ContactForm />
                    </FadeIn>
                </div>
            </PageContainer>
        </>
    )
}
