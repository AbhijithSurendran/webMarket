import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: {
        default: "WebMarket — Quality Products & Services",
        template: "%s | WebMarket",
    },
    description:
        "Discover our wide range of quality products and professional services. Your trusted partner for business success.",
    openGraph: {
        type: "website",
        locale: "en_US",
        siteName: "WebMarket",
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>{children}</body>
        </html>
    )
}
