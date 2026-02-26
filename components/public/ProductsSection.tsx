import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/lib/types/database"
import { truncate } from "@/lib/utils"

interface ProductsSectionProps {
    products: Product[]
}

export default function ProductsSection({ products }: ProductsSectionProps) {
    const fallback: Partial<Product>[] = [
        { id: "1", title: "Enterprise Suite", description: "Complete business management for large organizations.", image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", slug: "enterprise-suite" },
        { id: "2", title: "Business Pro", description: "The perfect solution for growing businesses.", image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", slug: "business-pro" },
        { id: "3", title: "Starter Pack", description: "Everything a small business needs to get started.", image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80", slug: "starter-pack" },
    ]
    const items = products.length > 0 ? products.slice(0, 6) : (fallback as Product[])

    return (
        <section className="page-section bg-gray-50">
            <div className="container-custom">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        Our Products
                    </div>
                    <h2 className="section-title">Featured Products</h2>
                    <p className="section-subtitle">
                        Discover our range of premium products built to deliver exceptional value and performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="group card hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative h-52 overflow-hidden bg-gray-100">
                                <Image
                                    src={product.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"}
                                    alt={product.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute top-3 right-3">
                                    <span className="badge bg-primary-600 text-white">Featured</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                                    {product.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                    {truncate(product.description || "", 100)}
                                </p>
                                <span className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
                                    View Details <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/products" className="btn-secondary">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    )
}
