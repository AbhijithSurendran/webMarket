import { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://webmarket.vercel.app"

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    ]

    try {
        const supabase = createClient()

        const [{ data: services }, { data: products }, { data: blogs }] = await Promise.all([
            supabase.from("services").select("slug, updated_at").eq("is_published", true),
            supabase.from("products").select("slug, updated_at").eq("is_published", true),
            supabase.from("blogs").select("slug, updated_at, published_at").eq("is_published", true),
        ])

        const serviceRoutes: MetadataRoute.Sitemap = (services || []).map((s) => ({
            url: `${baseUrl}/services/${s.slug}`,
            lastModified: new Date(s.updated_at),
            changeFrequency: "monthly",
            priority: 0.7,
        }))

        const productRoutes: MetadataRoute.Sitemap = (products || []).map((p) => ({
            url: `${baseUrl}/products/${p.slug}`,
            lastModified: new Date(p.updated_at),
            changeFrequency: "monthly",
            priority: 0.7,
        }))

        const blogRoutes: MetadataRoute.Sitemap = (blogs || []).map((b) => ({
            url: `${baseUrl}/blog/${b.slug}`,
            lastModified: new Date(b.updated_at),
            changeFrequency: "weekly",
            priority: 0.6,
        }))

        return [...staticRoutes, ...serviceRoutes, ...productRoutes, ...blogRoutes]
    } catch {
        return staticRoutes
    }
}
