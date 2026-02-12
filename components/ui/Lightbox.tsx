"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@/lib/gallery-data";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
    images: GalleryImage[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export default function Lightbox({
    images,
    currentIndex,
    isOpen,
    onClose,
    onNext,
    onPrev,
}: LightboxProps) {
    const image = images[currentIndex];

    /* ── Keyboard Navigation ── */
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return;
            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "ArrowLeft":
                    onPrev();
                    break;
                case "ArrowRight":
                case " ":
                    e.preventDefault();
                    onNext();
                    break;
            }
        },
        [isOpen, onClose, onNext, onPrev]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    /* ── Lock body scroll ── */
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!image) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
                    onClick={onClose}
                >
                    {/* ── Close button ── */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Close lightbox"
                    >
                        <X className="h-7 w-7" />
                    </button>

                    {/* ── Prev arrow ── */}
                    {currentIndex > 0 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onPrev();
                            }}
                            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </button>
                    )}

                    {/* ── Next arrow ── */}
                    {currentIndex < images.length - 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onNext();
                            }}
                            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-8 w-8" />
                        </button>
                    )}

                    {/* ── Image ── */}
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-[90vw] h-[75vh] md:w-[80vw] md:h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={image.src.replace("w=800", "w=1920")}
                            alt={image.alt}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                        />
                    </motion.div>

                    {/* ── Bottom info bar ── */}
                    <div
                        className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                            <div>
                                <p className="text-white text-sm md:text-base font-medium">
                                    {image.caption}
                                </p>
                                {image.location && (
                                    <p className="text-white/60 text-xs md:text-sm mt-1">
                                        📍 {image.location}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                {image.categories.map((cat) => (
                                    <span
                                        key={cat}
                                        className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-xs font-accent"
                                    >
                                        {cat}
                                    </span>
                                ))}
                                <span className="text-white/50 text-sm font-accent">
                                    {currentIndex + 1} / {images.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
