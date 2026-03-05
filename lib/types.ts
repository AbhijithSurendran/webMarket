export interface HeroSlider {
    id: string;
    imageUrl: string;
    title: string;
    description: string | null;
    buttonText: string | null;
    buttonLink: string | null;
    sortOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    features: string[];
    price?: number;
    image?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    benefits: string[];
    image?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface GalleryImage {
    id: string;
    url: string;
    alt: string;
    createdAt: string;
}

export interface PagesContent {
    home: {
        heroTitle: string;
        heroSubtitle: string;
        heroCta: string;
    };
    about: {
        title: string;
        content: string;
        mission: string;
        vision: string;
    };
    contact: {
        email: string;
        phone: string;
        address: string;
    };
}

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    role: "admin";
}

export interface Enquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export interface DB {
    heroSliders: HeroSlider[];
    products: Product[];
    services: Service[];
    blogs: Blog[];
    gallery: GalleryImage[];
    pages: PagesContent;
    users: User[];
    enquiries: Enquiry[];
}
