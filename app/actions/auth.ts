"use server"

import { cookies } from "next/headers"
import { getDB } from "@/lib/db"

export type AuthState = {
    success?: boolean
    error?: string
}

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        return { error: "Email and password are required." }
    }

    try {
        const db = await getDB()
        const admin = db.users.find(u => u.role === "admin")

        if (!admin) {
            return { error: "System configuration error. Admin user not found." }
        }

        // For this simple file-based DB, we compare direct strings.
        // In a production system, this should be a bcrypt compare.
        if (admin.email === email && admin.passwordHash === password) {
            // Set a simple session cookie
            const oneDay = 24 * 60 * 60 * 1000

            // Generate a simple token (In real app, use JWT)
            const token = Buffer.from(`${admin.id}:${Date.now()}`).toString("base64")

            cookies().set("admin_session", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                expires: Date.now() + oneDay,
                path: "/"
            })

            return { success: true }
        }

        return { error: "Invalid email or password." }
    } catch (error) {
        console.error("Login Error:", error)
        return { error: "An unexpected error occurred during login." }
    }
}

export async function logoutAction() {
    cookies().delete("admin_session")
}
