"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function upsertHeroSlide(formData: FormData) {
    const supabase = createAdminClient()
    const id = formData.get("id") as string
    const payload = {
        image_url: formData.get("image_url") as string,
        title: formData.get("title") as string,
        description: formData.get("description") as string || null,
        button_text: formData.get("button_text") as string || null,
        button_link: formData.get("button_link") as string || null,
        sort_order: parseInt(formData.get("sort_order") as string) || 0,
        is_active: formData.get("is_active") === "true",
    }

    if (id) {
        await supabase.from("hero_sliders").update(payload).eq("id", id)
    } else {
        await supabase.from("hero_sliders").insert(payload)
    }

    revalidatePath("/")
    revalidatePath("/admin/hero-sliders")
    redirect("/admin/hero-sliders")
}

export async function deleteHeroSlide(id: string) {
    const supabase = createAdminClient()
    await supabase.from("hero_sliders").delete().eq("id", id)
    revalidatePath("/")
    revalidatePath("/admin/hero-sliders")
}

export async function upsertService(formData: FormData) {
    const supabase = createAdminClient()
    const id = formData.get("id") as string
    const payload = {
        slug: formData.get("slug") as string,
        title: formData.get("title") as string,
        description: formData.get("description") as string || null,
        content: formData.get("content") as string || null,
        image_url: formData.get("image_url") as string || null,
        meta_title: formData.get("meta_title") as string || null,
        meta_description: formData.get("meta_description") as string || null,
        sort_order: parseInt(formData.get("sort_order") as string) || 0,
        is_published: formData.get("is_published") === "true",
    }

    if (id) {
        await supabase.from("services").update(payload).eq("id", id)
    } else {
        await supabase.from("services").insert(payload)
    }

    revalidatePath("/services")
    revalidatePath(`/services/${payload.slug}`)
    revalidatePath("/")
    revalidatePath("/admin/services")
    redirect("/admin/services")
}

export async function deleteService(id: string) {
    const supabase = createAdminClient()
    await supabase.from("services").delete().eq("id", id)
    revalidatePath("/services")
    revalidatePath("/admin/services")
}

export async function upsertProduct(formData: FormData) {
    const supabase = createAdminClient()
    const id = formData.get("id") as string
    const payload = {
        slug: formData.get("slug") as string,
        title: formData.get("title") as string,
        description: formData.get("description") as string || null,
        content: formData.get("content") as string || null,
        image_url: formData.get("image_url") as string || null,
        meta_title: formData.get("meta_title") as string || null,
        meta_description: formData.get("meta_description") as string || null,
        sort_order: parseInt(formData.get("sort_order") as string) || 0,
        is_published: formData.get("is_published") === "true",
    }

    if (id) {
        await supabase.from("products").update(payload).eq("id", id)
    } else {
        await supabase.from("products").insert(payload)
    }

    revalidatePath("/products")
    revalidatePath(`/products/${payload.slug}`)
    revalidatePath("/")
    revalidatePath("/admin/products")
    redirect("/admin/products")
}

export async function deleteProduct(id: string) {
    const supabase = createAdminClient()
    await supabase.from("products").delete().eq("id", id)
    revalidatePath("/products")
    revalidatePath("/admin/products")
}

export async function upsertGalleryItem(formData: FormData) {
    const supabase = createAdminClient()
    const id = formData.get("id") as string
    const payload = {
        image_url: formData.get("image_url") as string,
        caption: formData.get("caption") as string || null,
        sort_order: parseInt(formData.get("sort_order") as string) || 0,
        is_active: formData.get("is_active") === "true",
    }

    if (id) {
        await supabase.from("gallery").update(payload).eq("id", id)
    } else {
        await supabase.from("gallery").insert(payload)
    }

    revalidatePath("/gallery")
    revalidatePath("/")
    revalidatePath("/admin/gallery")
    redirect("/admin/gallery")
}

export async function deleteGalleryItem(id: string) {
    const supabase = createAdminClient()
    await supabase.from("gallery").delete().eq("id", id)
    revalidatePath("/gallery")
    revalidatePath("/admin/gallery")
}

export async function upsertBlog(formData: FormData) {
    const supabase = createAdminClient()
    const id = formData.get("id") as string
    const isPublished = formData.get("is_published") === "true"
    const payload = {
        slug: formData.get("slug") as string,
        title: formData.get("title") as string,
        excerpt: formData.get("excerpt") as string || null,
        content: formData.get("content") as string || null,
        cover_image: formData.get("cover_image") as string || null,
        author: formData.get("author") as string || null,
        published_at: isPublished ? new Date().toISOString() : null,
        meta_title: formData.get("meta_title") as string || null,
        meta_description: formData.get("meta_description") as string || null,
        is_published: isPublished,
    }

    if (id) {
        await supabase.from("blogs").update(payload).eq("id", id)
    } else {
        await supabase.from("blogs").insert(payload)
    }

    revalidatePath("/blog")
    revalidatePath(`/blog/${payload.slug}`)
    revalidatePath("/admin/blogs")
    redirect("/admin/blogs")
}

export async function deleteBlog(id: string) {
    const supabase = createAdminClient()
    await supabase.from("blogs").delete().eq("id", id)
    revalidatePath("/blog")
    revalidatePath("/admin/blogs")
}

export async function upsertTestimonial(formData: FormData) {
    const supabase = createAdminClient()
    const id = formData.get("id") as string
    const payload = {
        name: formData.get("name") as string,
        designation: formData.get("designation") as string || null,
        message: formData.get("message") as string,
        photo_url: formData.get("photo_url") as string || null,
        sort_order: parseInt(formData.get("sort_order") as string) || 0,
        is_active: formData.get("is_active") === "true",
    }

    if (id) {
        await supabase.from("testimonials").update(payload).eq("id", id)
    } else {
        await supabase.from("testimonials").insert(payload)
    }

    revalidatePath("/")
    revalidatePath("/admin/testimonials")
    redirect("/admin/testimonials")
}

export async function deleteTestimonial(id: string) {
    const supabase = createAdminClient()
    await supabase.from("testimonials").delete().eq("id", id)
    revalidatePath("/admin/testimonials")
}

export async function deleteEnquiry(id: string) {
    const supabase = createAdminClient()
    await supabase.from("enquiries").delete().eq("id", id)
    revalidatePath("/admin/enquiries")
}

export async function markEnquiryRead(id: string) {
    const supabase = createAdminClient()
    await supabase.from("enquiries").update({ is_read: true }).eq("id", id)
    revalidatePath("/admin/enquiries")
}

export async function updateSiteSettings(formData: FormData) {
    const supabase = createAdminClient()
    const keys = [
        "site_name", "logo_url", "footer_text", "footer_description",
        "address", "phone", "email", "google_maps_embed",
        "facebook_url", "twitter_url", "instagram_url", "linkedin_url",
        "meta_title", "meta_description",
    ]

    const updates = keys.map((key) => ({
        key,
        value: (formData.get(key) as string) || "",
        updated_at: new Date().toISOString(),
    }))

    for (const update of updates) {
        await supabase.from("site_settings").upsert(update, { onConflict: "key" })
    }

    revalidatePath("/")
    revalidatePath("/admin/settings")
    revalidatePath("/contact")
}

export async function updateAboutPage(formData: FormData) {
    const supabase = createAdminClient()
    const content = {
        description: formData.get("description") as string,
        vision_title: formData.get("vision_title") as string,
        vision_description: formData.get("vision_description") as string,
        mission_title: formData.get("mission_title") as string,
        mission_description: formData.get("mission_description") as string,
    }

    await supabase.from("pages").upsert({
        slug: "about",
        title: "About Us",
        banner_image: formData.get("banner_image") as string || null,
        content,
        meta_title: formData.get("meta_title") as string || null,
        meta_description: formData.get("meta_description") as string || null,
        updated_at: new Date().toISOString(),
    }, { onConflict: "slug" })

    revalidatePath("/about")
    revalidatePath("/")
    revalidatePath("/admin/pages")
}
