"use client"

import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"
import { loginAction, type AuthState } from "@/app/actions/auth"

const initialState: AuthState = {}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="btn-primary w-full mt-2 flex justify-center items-center gap-2">
            {pending ? <><Loader2 size={16} className="animate-spin" /> Signing in…</> : "Sign In"}
        </button>
    )
}

export default function LoginPage() {
    const [state, action] = useFormState(loginAction, initialState)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (state?.success) {
            router.push("/admin")
            router.refresh()
        }
    }, [state?.success, router])

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

                    {state.error && (
                        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex gap-3 items-start">
                            <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                            {state.error}
                        </div>
                    )}

                    <form action={action} className="space-y-5">
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
                        <SubmitButton />
                    </form>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        Admin access only. Public visitors: <a href="/" className="text-primary-600 hover:underline">Visit Website</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
