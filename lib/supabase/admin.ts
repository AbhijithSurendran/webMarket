import { createServerClient } from "@supabase/ssr"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/types/database"

/**
 * Admin/service-role client for server actions (bypasses RLS).
 * NEVER use on the client side.
 */
export function createAdminClient() {
    return createSupabaseClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        }
    )
}
