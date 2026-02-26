import { createClient } from "@/lib/supabase/server"
import type { SiteSettings } from "@/lib/types/database"

/**
 * Fetch all site settings as a key-value record.
 * Returns an empty record if settings are unavailable (e.g., DB not configured).
 */
export async function getSiteSettings(): Promise<SiteSettings> {
    try {
        const supabase = createClient()
        const { data } = await supabase.from("site_settings").select("key, value")
        if (!data) return {}
        return Object.fromEntries(data.map((s) => [s.key, s.value ?? ""]))
    } catch {
        return {}
    }
}

export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trimEnd() + "…"
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
}

export const ITEMS_PER_PAGE = 25
