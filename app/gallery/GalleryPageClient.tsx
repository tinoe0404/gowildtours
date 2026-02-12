"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    galleryImages,
    galleryCategories,
    type GalleryCategory,
} from "@/lib/gallery-data";
import { fadeInUp } from "@/lib/animations";
import Container from "@/components/ui/Container";
import GalleryGrid from "@/components/ui/GalleryGrid";
import { cn } from "@/lib/cn";
import { ChevronRight, SlidersHorizontal } from "lucide-react";

const INITIAL_COUNT = 16;
const LOAD_MORE_COUNT = 12;

export default function GalleryPageClient() {
    const [activeCategory, setActiveCategory] = useState<
        "All" | GalleryCategory
    >("All");
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const filteredImages = useMemo(() => {
        if (activeCategory === "All") return galleryImages;
        return galleryImages.filter((img) =>
            img.categories.includes(activeCategory)
        );
    }, [activeCategory]);

    const visibleImages = filteredImages.slice(0, visibleCount);
    const hasMore = visibleCount < filteredImages.length;

    const handleCategoryChange = (cat: "All" | GalleryCategory) => {
        setActiveCategory(cat);
        setVisibleCount(INITIAL_COUNT);
    };

    return (
        <>
            {/* ── Hero Banner ── */}
            <section className="relative h-56 md:h-72 flex items-end overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80"
                    alt="African savanna panorama"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/80 via-dark-deep/40 to-dark-deep/20" />

                <Container className="relative z-10 pb-8 md:pb-10">
                    {/* Breadcrumb */}
                    <nav
                        className="flex items-center gap-1.5 text-xs font-accent text-cream/60 mb-3"
                        aria-label="Breadcrumb"
                    >
                        <Link
                            href="/"
                            className="hover:text-accent transition-colors"
                        >
                            Home
                        </Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-cream/90">Gallery</span>
                    </nav>
                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream">
                        Safari Gallery
                    </h1>
                </Container>
            </section>

            {/* ── Filters + Grid ── */}
            <section className="bg-cream py-12 md:py-20">
                <Container>
                    {/* Filter bar */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap items-center gap-2.5 mb-10 md:mb-14"
                    >
                        <SlidersHorizontal className="h-4 w-4 text-warm-gray mr-1 hidden md:block" />

                        {(["All", ...galleryCategories] as const).map((cat) => {
                            const isActive = activeCategory === cat;
                            const count =
                                cat === "All"
                                    ? galleryImages.length
                                    : galleryImages.filter((img) =>
                                        img.categories.includes(cat)
                                    ).length;

                            return (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-accent font-medium transition-all duration-300 cursor-pointer",
                                        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                                        isActive
                                            ? "bg-primary text-white shadow-md"
                                            : "bg-white text-warm-gray hover:bg-beige/80 border border-beige"
                                    )}
                                    aria-pressed={isActive}
                                >
                                    {cat}
                                    <span
                                        className={cn(
                                            "ml-1.5 text-xs",
                                            isActive ? "text-white/80" : "text-warm-gray/60"
                                        )}
                                    >
                                        ({count})
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Gallery grid */}
                    <GalleryGrid images={visibleImages} columns={4} />

                    {/* Load more */}
                    {hasMore && (
                        <div className="mt-12 text-center">
                            <button
                                onClick={() =>
                                    setVisibleCount((c) => c + LOAD_MORE_COUNT)
                                }
                                className="px-8 py-3 rounded-full border-2 border-accent text-accent font-accent font-semibold hover:bg-accent hover:text-dark-deep transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                            >
                                Load More Photos
                            </button>
                        </div>
                    )}

                    {/* Empty state */}
                    {filteredImages.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-warm-gray text-lg">
                                No images found in this category yet.
                            </p>
                        </div>
                    )}
                </Container>
            </section>
        </>
    );
}
