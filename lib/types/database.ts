export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    role: "admin" | "user"
                    created_at: string
                }
                Insert: {
                    id: string
                    role?: "admin" | "user"
                    created_at?: string
                }
                Update: {
                    id?: string
                    role?: "admin" | "user"
                    created_at?: string
                }
            }
            hero_sliders: {
                Row: {
                    id: string
                    image_url: string
                    title: string
                    description: string | null
                    button_text: string | null
                    button_link: string | null
                    sort_order: number
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    image_url: string
                    title: string
                    description?: string | null
                    button_text?: string | null
                    button_link?: string | null
                    sort_order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    image_url?: string
                    title?: string
                    description?: string | null
                    button_text?: string | null
                    button_link?: string | null
                    sort_order?: number
                    is_active?: boolean
                    updated_at?: string
                }
            }
            pages: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    banner_image: string | null
                    content: Json
                    meta_title: string | null
                    meta_description: string | null
                    updated_at: string
                }
                Insert: {
                    id?: string
                    slug: string
                    title: string
                    banner_image?: string | null
                    content?: Json
                    meta_title?: string | null
                    meta_description?: string | null
                    updated_at?: string
                }
                Update: {
                    id?: string
                    slug?: string
                    title?: string
                    banner_image?: string | null
                    content?: Json
                    meta_title?: string | null
                    meta_description?: string | null
                    updated_at?: string
                }
            }
            services: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    description: string | null
                    content: string | null
                    image_url: string | null
                    meta_title: string | null
                    meta_description: string | null
                    sort_order: number
                    is_published: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    slug: string
                    title: string
                    description?: string | null
                    content?: string | null
                    image_url?: string | null
                    meta_title?: string | null
                    meta_description?: string | null
                    sort_order?: number
                    is_published?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    slug?: string
                    title?: string
                    description?: string | null
                    content?: string | null
                    image_url?: string | null
                    meta_title?: string | null
                    meta_description?: string | null
                    sort_order?: number
                    is_published?: boolean
                    updated_at?: string
                }
            }
            products: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    description: string | null
                    content: string | null
                    image_url: string | null
                    meta_title: string | null
                    meta_description: string | null
                    sort_order: number
                    is_published: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    slug: string
                    title: string
                    description?: string | null
                    content?: string | null
                    image_url?: string | null
                    meta_title?: string | null
                    meta_description?: string | null
                    sort_order?: number
                    is_published?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    slug?: string
                    title?: string
                    description?: string | null
                    content?: string | null
                    image_url?: string | null
                    meta_title?: string | null
                    meta_description?: string | null
                    sort_order?: number
                    is_published?: boolean
                    updated_at?: string
                }
            }
            gallery: {
                Row: {
                    id: string
                    image_url: string
                    caption: string | null
                    sort_order: number
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    image_url: string
                    caption?: string | null
                    sort_order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    image_url?: string
                    caption?: string | null
                    sort_order?: number
                    is_active?: boolean
                    updated_at?: string
                }
            }
            blogs: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    excerpt: string | null
                    content: string | null
                    cover_image: string | null
                    author: string | null
                    published_at: string | null
                    meta_title: string | null
                    meta_description: string | null
                    is_published: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    slug: string
                    title: string
                    excerpt?: string | null
                    content?: string | null
                    cover_image?: string | null
                    author?: string | null
                    published_at?: string | null
                    meta_title?: string | null
                    meta_description?: string | null
                    is_published?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    slug?: string
                    title?: string
                    excerpt?: string | null
                    content?: string | null
                    cover_image?: string | null
                    author?: string | null
                    published_at?: string | null
                    meta_title?: string | null
                    meta_description?: string | null
                    is_published?: boolean
                    updated_at?: string
                }
            }
            testimonials: {
                Row: {
                    id: string
                    name: string
                    designation: string | null
                    message: string
                    photo_url: string | null
                    sort_order: number
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    designation?: string | null
                    message: string
                    photo_url?: string | null
                    sort_order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    designation?: string | null
                    message?: string
                    photo_url?: string | null
                    sort_order?: number
                    is_active?: boolean
                    updated_at?: string
                }
            }
            enquiries: {
                Row: {
                    id: string
                    name: string
                    phone: string | null
                    email: string
                    location: string | null
                    message: string
                    is_read: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    phone?: string | null
                    email: string
                    location?: string | null
                    message: string
                    is_read?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    phone?: string | null
                    email?: string
                    location?: string | null
                    message?: string
                    is_read?: boolean
                }
            }
            site_settings: {
                Row: {
                    id: string
                    key: string
                    value: string | null
                    updated_at: string
                }
                Insert: {
                    id?: string
                    key: string
                    value?: string | null
                    updated_at?: string
                }
                Update: {
                    id?: string
                    key?: string
                    value?: string | null
                    updated_at?: string
                }
            }
        }
    }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type HeroSlider = Database["public"]["Tables"]["hero_sliders"]["Row"]
export type Page = Database["public"]["Tables"]["pages"]["Row"]
export type Service = Database["public"]["Tables"]["services"]["Row"]
export type Product = Database["public"]["Tables"]["products"]["Row"]
export type GalleryItem = Database["public"]["Tables"]["gallery"]["Row"]
export type Blog = Database["public"]["Tables"]["blogs"]["Row"]
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"]
export type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"]
export type SiteSetting = Database["public"]["Tables"]["site_settings"]["Row"]

export type SiteSettings = Record<string, string>
