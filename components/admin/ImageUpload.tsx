"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Upload, X, Loader2 } from "lucide-react"

interface ImageUploadProps {
    value?: string
    onChange: (url: string) => void
    label?: string
}

export default function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState("")

    async function handleFile(file: File) {
        if (!file) return
        if (file.size > 5 * 1024 * 1024) {
            setError("File must be under 5MB")
            return
        }

        setIsUploading(true)
        setError("")

        try {
            const supabase = createClient()
            const ext = file.name.split(".").pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
            const { error: uploadError } = await supabase.storage.from("media").upload(fileName, file, { cacheControl: "3600", upsert: false })

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(fileName)
            onChange(publicUrl)
        } catch (err) {
            setError("Upload failed. Please try again.")
            console.error(err)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-2">
            <span className="label">{label}</span>

            {value ? (
                <div className="relative inline-block">
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200">
                        <Image src={value} alt="Preview" fill className="object-cover" sizes="400px" />
                    </div>
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                        aria-label="Remove image"
                    >
                        <X size={14} />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    className="w-full h-36 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all"
                >
                    {isUploading ? (
                        <><Loader2 size={24} className="text-primary-500 animate-spin" /><span className="text-sm text-gray-500">Uploading…</span></>
                    ) : (
                        <><Upload size={24} className="text-gray-400" /><span className="text-sm text-gray-500">Click to upload image</span><span className="text-xs text-gray-400">PNG, JPG, WebP — max 5MB</span></>
                    )}
                </div>
            )}

            {/* URL Input as fallback */}
            <input
                type="url"
                placeholder="Or paste image URL here"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="input-field text-xs"
            />

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
        </div>
    )
}
