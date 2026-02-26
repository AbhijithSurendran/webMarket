import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/lib/types/database"

export function createClient() {
    const cookieStore = cookies()
    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            // @ts-expect-error – cookies() is read-only in Server Components, ignore in RSC context
                            cookieStore.set(name, value, options)
                        })
                    } catch {
                        // Ignore: called from a Server Component, cookie setting handled by middleware
                    }
                },
            },
        }
    )
}
