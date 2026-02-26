import { getSiteSettings } from "@/lib/utils"
import Navbar from "@/components/public/Navbar"
import Footer from "@/components/public/Footer"

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const settings = await getSiteSettings()
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar logoUrl={settings.logo_url} siteName={settings.site_name} />
            <main className="flex-1 pt-16 lg:pt-20">{children}</main>
            <Footer settings={settings} />
        </div>
    )
}
