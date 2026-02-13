'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Coffee, Utensils, Wifi, Wind, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Hotel } from '../../lib/types/hotel';
import SafariBadge from '../ui/SafariBadge';

interface HotelCardProps {
    hotel: Hotel;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % hotel.images.gallery.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev - 1 + hotel.images.gallery.length) % hotel.images.gallery.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Link href={`/hotels/${hotel.slug}`}>
                    <img
                        src={hotel.images.gallery[currentImageIndex] || hotel.images.thumbnail}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {/* Image Controls */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={prevImage}
                        className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {hotel.starRating && (
                        <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold flex items-center">
                            {hotel.starRating} <Star className="w-3 h-3 ml-0.5 fill-yellow-400 text-yellow-400" />
                        </div>
                    )}
                    {hotel.features.featured && (
                        <SafariBadge variant="primary" className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">Featured</SafariBadge>
                    )}
                </div>

                {/* Favorite Icon */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors shadow-sm">
                    <Heart className="w-4 h-4" />
                </button>

                {/* Image Indicator */}
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm font-medium">
                    {currentImageIndex + 1} / {hotel.images.gallery.length || 1}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="text-secondary-600 font-medium text-xs uppercase tracking-wider mb-1 block">
                            {hotel.propertyType.replace('-', ' ')}
                        </span>
                        <Link href={`/hotels/${hotel.slug}`}>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">
                                {hotel.name}
                            </h3>
                        </Link>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="bg-primary-600 text-white font-bold px-1.5 py-0.5 rounded rounded-bl-none text-sm">
                            {hotel.reviews.averageRating.toFixed(1)}
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 whitespace-nowrap">
                            {hotel.reviews.totalReviews} reviews
                        </span>
                    </div>
                </div>

                <div className="flex items-center text-gray-500 text-xs mb-3">
                    <MapPin className="w-3 h-3 mr-1" />
                    {hotel.location.destination}
                    {hotel.location.distanceToVictoriaFalls && (
                        <span className="ml-1 opacity-80">• {hotel.location.distanceToVictoriaFalls}km from Falls</span>
                    )}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {hotel.shortDescription}
                </p>

                {/* Amenities Icons */}
                <div className="flex items-center gap-3 mb-5 mt-auto">
                    {hotel.amenities.general.includes('Free WiFi') && <Wifi className="w-4 h-4 text-gray-400" />}
                    {hotel.amenities.general.includes('Swimming Pool') && <Coffee className="w-4 h-4 text-gray-400" />}
                    {hotel.amenities.dining.length > 0 && <Utensils className="w-4 h-4 text-gray-400" />}
                    {hotel.amenities.room.includes('Air Conditioning') && <Wind className="w-4 h-4 text-gray-400" />}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <span className="text-gray-500 text-xs block">From</span>
                        <span className="text-xl font-bold text-primary-600">${hotel.pricing.pricePerNightFrom}</span>
                        <span className="text-gray-500 text-xs ml-1 font-medium">/ night</span>
                    </div>
                    <Link
                        href={`/hotels/${hotel.slug}`}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all transform active:scale-95 shadow-sm hover:shadow-md"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};
