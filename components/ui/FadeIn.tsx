"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface FadeInProps {
    children: ReactNode
    direction?: "up" | "down" | "left" | "right" | "none"
    delay?: number
    duration?: number
    className?: string
}

export default function FadeIn({
    children,
    direction = "up",
    delay = 0,
    duration = 0.5,
    className = "",
}: FadeInProps) {
    const [isVisible, setIsVisible] = useState(false)
    const domRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                        observer.unobserve(entry.target)
                    }
                })
            },
            { rootMargin: "-10%" }
        )

        const currentRef = domRef.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [])

    const getDirectionClass = () => {
        switch (direction) {
            case "up":
                return "translate-y-10"
            case "down":
                return "-translate-y-10"
            case "left":
                return "translate-x-10"
            case "right":
                return "-translate-x-10"
            case "none":
            default:
                return "translate-y-0 translate-x-0"
        }
    }

    return (
        <div
            ref={domRef}
            className={`transition-all ${className} ${isVisible ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${getDirectionClass()}`
                }`}
            style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // easeOut logic
            }}
        >
            {children}
        </div>
    )
}
