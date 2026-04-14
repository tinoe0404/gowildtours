"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery-data";
import Lightbox from "@/components/ui/Lightbox";

type AnyGalleryImage = GalleryImage & { url?: string; category?: string };

interface GalleryGridProps {
    images: AnyGalleryImage[];
    columns?: number;
}

export default function GalleryGrid({ images, columns }: GalleryGridProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const openLightbox = (idx: number) => {
        setLightboxIndex(idx);
        setLightboxOpen(true);
    };

    return (
        <>
            <div 
                className="instagram-grid" 
                style={columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}
            >
                {images.map((img, idx) => (
                    <button
                        key={img.id}
                        onClick={() => openLightbox(idx)}
                        className="relative w-full overflow-hidden block focus-visible:ring-2 focus-visible:ring-[var(--color-savanna)] cursor-pointer border-none p-0 group"
                        aria-label={`View: ${img.alt}`}
                    >
                        <Image
                            src={img.src || img.url || "/images/safari/lioness-rain.jpg"}
                            alt={img.alt}
                            width={500}
                            height={500}
                            className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-105 block"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                            <span className="text-[var(--color-savanna)] text-xs font-bold uppercase tracking-wider mb-1">
                                {img.categories?.[0] || (img as any).category || "General"}
                            </span>
                            <p className="text-white text-sm font-medium leading-snug line-clamp-2">
                                {img.caption}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            <Lightbox
                images={images.map(img => ({ ...img, src: img.src || img.url || "" }))}
                currentIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                onNext={() => setLightboxIndex((i) => Math.min(i + 1, images.length - 1))}
                onPrev={() => setLightboxIndex((i) => Math.max(i - 1, 0))}
            />
        </>
    );
}
