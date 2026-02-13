'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Maximize2 } from 'lucide-react';
import Lightbox from '../ui/Lightbox';
import { GalleryImage } from '../../lib/gallery-data';

interface HotelGalleryProps {
    images: string[];
    hotelName: string;
}

export const HotelGallery: React.FC<HotelGalleryProps> = ({ images, hotelName }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    // Transform hotel images into GalleryImage objects for the Lightbox
    const galleryImages: GalleryImage[] = images.map((src, index) => ({
        id: index,
        src,
        alt: `${hotelName} - Image ${index + 1}`,
        categories: ['Accommodations'],
        caption: `${hotelName} photography`,
        featured: index === 0,
        aspectRatio: 'landscape'
    }));

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    return (
        <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[400px] md:h-[600px] overflow-hidden rounded-2xl">
                {/* Main Image */}
                <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer" onClick={() => openLightbox(0)}>
                    <Image
                        src={images[0]}
                        alt={hotelName}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Thumbnails */}
                {images.slice(1, 5).map((src, idx) => (
                    <div
                        key={idx}
                        className="hidden md:block relative group cursor-pointer overflow-hidden"
                        onClick={() => openLightbox(idx + 1)}
                    >
                        <Image
                            src={src}
                            alt={`${hotelName} thumbnail ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="25vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                        {/* Show "View All" on last visible thumbnail */}
                        {idx === 3 && images.length > 5 && (
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                                <Camera className="w-6 h-6 mb-1" />
                                <span className="font-bold text-sm">+{images.length - 5} photos</span>
                            </div>
                        )}
                    </div>
                ))}

                {/* Mobile Photo Count Button */}
                <button
                    onClick={() => openLightbox(0)}
                    className="md:hidden absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center shadow-lg"
                >
                    <Camera className="w-4 h-4 mr-2" />
                    View all photos
                </button>
            </div>

            <Lightbox
                images={galleryImages}
                currentIndex={currentIndex}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onNext={() => setCurrentIndex((prev) => (prev + 1) % galleryImages.length)}
                onPrev={() => setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
            />
        </section>
    );
};
