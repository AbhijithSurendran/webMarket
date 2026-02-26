"use client"

import { useState, useActionState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsPending(true)
        setError("")

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const supabase = createClient()
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

        if (authError) {
            setError("Invalid email or password. Please try again.")
            setIsPending(false)
            return
        }

        router.push("/admin")
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-950 to-secondary-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">W</div>
                    <h1 className="text-2xl font-heading font-bold text-white">WebMarket CMS</h1>
                    <p className="text-gray-400 text-sm mt-1">Sign in to manage your content</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6">Admin Sign In</h2>

                    {error && (
                        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="label" htmlFor="admin-email">Email Address</label>
                            <input
                                id="admin-email"
                                name="email"
                                type="email"
                                placeholder="admin@example.com"
                                required
                                className="input-field"
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="admin-password">Password</label>
                            <div className="relative">
                                <input
                                    id="admin-password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    className="input-field pr-10"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" disabled={isPending} className="btn-primary w-full mt-2">
                            {isPending ? <><Loader2 size={16} className="animate-spin" /> Signing in…</> : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        Admin access only. Public visitors: <a href="/" className="text-primary-600 hover:underline">Visit Website</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
