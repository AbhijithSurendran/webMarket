"use client"

import { useEffect, useId } from "react"
import { generateSlug } from "@/lib/utils"

interface SlugInputProps {
    value: string
    onChange: (slug: string) => void
    sourceValue?: string
    label?: string
    disabled?: boolean
}

export default function SlugInput({ value, onChange, sourceValue, label = "Slug", disabled }: SlugInputProps) {
    const id = useId()

    function handleGenerate() {
        if (sourceValue) {
            onChange(generateSlug(sourceValue))
        }
    }

    return (
        <div>
            <label className="label" htmlFor={id}>{label}</label>
            <div className="flex gap-2">
                <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent">
                    <span className="px-3 text-gray-400 text-sm flex-shrink-0">/</span>
                    <input
                        id={id}
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                        placeholder="auto-generated-slug"
                        disabled={disabled}
                        className="flex-1 py-2.5 pr-3 text-sm bg-transparent focus:outline-none text-gray-900"
                    />
                </div>
                {sourceValue && (
                    <button
                        type="button"
                        onClick={handleGenerate}
                        className="btn-ghost text-xs px-3 py-2 border border-gray-200 flex-shrink-0"
                    >
                        Generate
                    </button>
                )}
            </div>
            <p className="text-xs text-gray-400 mt-1">Used in the URL. Only lowercase letters, numbers, and hyphens.</p>
        </div>
    )
}
