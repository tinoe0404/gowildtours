"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryImage } from "@/lib/gallery-data";
import { staggerContainer } from "@/lib/animations";
import Lightbox from "@/components/ui/Lightbox";

type AnyGalleryImage = GalleryImage & { url?: string; category?: string };

interface GalleryGridProps {
    images: AnyGalleryImage[];
    /** Number of columns on desktop — 3 or 4 */
    columns?: 3 | 4;
}

const spanClass: Record<GalleryImage["aspectRatio"], string> = {
    portrait: "row-span-2",
    landscape: "row-span-1",
    square: "row-span-1",
};

const aspectClass: Record<GalleryImage["aspectRatio"], string> = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
};

export default function GalleryGrid({ images, columns = 3 }: GalleryGridProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (idx: number) => {
        setLightboxIndex(idx);
        setLightboxOpen(true);
    };

    const colsClass =
        columns === 4
            ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4"
            : "columns-1 sm:columns-2 lg:columns-3";

    return (
        <>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                className={`${colsClass} gap-4 md:gap-5`}
            >
                {images.map((img, idx) => (
                    <motion.div
                        key={img.id}
                        variants={{
                            hidden: { opacity: 0, y: 24 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.5, delay: idx * 0.04 },
                            },
                        }}
                        className="mb-4 md:mb-5 break-inside-avoid"
                    >
                        <button
                            onClick={() => openLightbox(idx)}
                            className="group relative w-full overflow-hidden rounded-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                            aria-label={`View: ${img.alt}`}
                        >
                            <div className={`relative w-full ${aspectClass[img.aspectRatio] || "aspect-[4/3]"}`}>
                                <Image
                                    src={img.src || img.url || "/images/placeholder.jpg"}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    loading="lazy"
                                />
                            </div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/70 via-dark-deep/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                {/* Category badge */}
                                <span className="self-start px-2.5 py-1 rounded-full bg-accent/90 text-dark-deep text-[10px] font-accent font-semibold tracking-wider uppercase mb-2">
                                    {img.categories?.[0] || (img as any).category || "General"}
                                </span>
                                <p className="text-white text-sm font-medium leading-snug line-clamp-2">
                                    {img.caption}
                                </p>
                                {img.location && (
                                    <p className="text-white/60 text-xs mt-1">📍 {img.location}</p>
                                )}
                            </div>
                        </button>
                    </motion.div>
                ))}
            </motion.div>

            <Lightbox
                images={images.map(img => ({ ...img, src: img.src || img.url || "" }))}
                currentIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                onNext={() =>
                    setLightboxIndex((i) => Math.min(i + 1, images.length - 1))
                }
                onPrev={() => setLightboxIndex((i) => Math.max(i - 1, 0))}
            />
        </>
    );
}
