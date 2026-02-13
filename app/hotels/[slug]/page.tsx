'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { hotels } from '../../../lib/hotels-data';
import { HotelHero } from '../../../components/hotels/HotelHero';
import { HotelGallery } from '../../../components/hotels/HotelGallery';
import { HotelBookingSidebar } from '../../../components/hotels/HotelBookingSidebar';
import {
    Star, MapPin, Check, Wifi, Coffee, Utensils, Wind,
    Map as MapIcon, Languages, Clock, ShieldCheck,
    Trees, Waves, Users, Bed, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import SafariBadge from '../../../components/ui/SafariBadge';
import Image from 'next/image';

export default function HotelDetailPage() {
    const { slug } = useParams();
    const hotel = hotels.find(h => h.slug === slug);

    if (!hotel) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Small Hero / Breadcrumbs */}
            <div className="bg-gray-50 border-b border-gray-100 py-6">
                <div className="container mx-auto px-4 md:px-6">
                    <nav className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
                        <a href="/" className="hover:text-primary-600 transition-colors">Home</a>
                        <span>/</span>
                        <a href="/hotels" className="hover:text-primary-600 transition-colors">Hotels</a>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{hotel.name}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <SafariBadge variant="primary" className="text-[10px] uppercase font-bold px-2 py-0.5">{hotel.propertyType}</SafariBadge>
                                <div className="flex">
                                    {Array.from({ length: hotel.starRating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                            <p className="flex items-center text-gray-600 font-medium">
                                <MapPin className="w-4 h-4 mr-1 text-primary-600" />
                                {hotel.location.address}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="flex items-center justify-end gap-2 mb-1">
                                    <span className="text-lg font-bold text-gray-900">Exceptional</span>
                                    <div className="bg-primary-600 text-white font-bold px-2 py-1 rounded text-lg">
                                        {hotel.reviews.averageRating.toFixed(1)}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{hotel.reviews.totalReviews} verified reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Gallery */}
                <HotelGallery images={hotel.images.gallery} hotelName={hotel.name} />

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-1 space-y-12">

                        {/* Quick Info Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Clock className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Check-in</span>
                                    <span className="text-sm font-bold text-gray-900">{hotel.policies.checkIn}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Clock className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Check-out</span>
                                    <span className="text-sm font-bold text-gray-900">{hotel.policies.checkOut}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Languages className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Languages</span>
                                    <span className="text-sm font-bold text-gray-900">English</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <ShieldCheck className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Rating</span>
                                    <span className="text-sm font-bold text-gray-900">{hotel.starRating} Stars</span>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Property</h2>
                            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
                                <p>{hotel.longDescription}</p>
                            </div>
                        </section>

                        {/* Highlights */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Highlights</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {hotel.highlights.map((highlight, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 bg-primary-50/50 rounded-xl border border-primary-100">
                                        <div className="mt-1">
                                            <Sparkles className="w-5 h-5 text-primary-600" />
                                        </div>
                                        <span className="text-gray-800 font-medium">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Room Types */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Room Types</h2>
                            <div className="space-y-6">
                                {hotel.roomTypes.map((room, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <div className="w-full md:w-1/3 relative h-48 md:h-auto">
                                            <Image
                                                src={room.images[0]}
                                                alt={room.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                                                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
                                                        <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-1" /> Max {room.maxOccupancy} Guests</span>
                                                        <span className="flex items-center"><Bed className="w-3.5 h-3.5 mr-1" /> {room.bedConfiguration}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-2xl font-bold text-primary-600">${room.price}</span>
                                                    <span className="text-xs text-gray-500 font-medium">per night</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-6">{room.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {room.amenities.slice(0, 4).map((amen, i) => (
                                                    <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">{amen}</span>
                                                ))}
                                            </div>
                                            <button className="w-full md:w-auto bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all">
                                                Select Room
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Amenities Grid */}
                        <section className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">What this property offers</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div>
                                    <h4 className="flex items-center font-bold text-gray-900 mb-4">
                                        <Utensils className="w-5 h-5 mr-3 text-primary-600" />
                                        Dining & Bars
                                    </h4>
                                    <ul className="space-y-3">
                                        {hotel.amenities.dining.map((item, i) => (
                                            <li key={i} className="flex items-center text-sm text-gray-600 font-medium">
                                                <Check className="w-4 h-4 mr-2 text-green-500" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="flex items-center font-bold text-gray-900 mb-4">
                                        <Trees className="w-5 h-5 mr-3 text-primary-600" />
                                        Safari Activities
                                    </h4>
                                    <ul className="space-y-3">
                                        {hotel.amenities.activities.map((item, i) => (
                                            <li key={i} className="flex items-center text-sm text-gray-600 font-medium">
                                                <Check className="w-4 h-4 mr-2 text-green-500" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="flex items-center font-bold text-gray-900 mb-4">
                                        <Sparkles className="w-5 h-5 mr-3 text-primary-600" />
                                        Facilities
                                    </h4>
                                    <ul className="space-y-3">
                                        {hotel.amenities.general.map((item, i) => (
                                            <li key={i} className="flex items-center text-sm text-gray-600 font-medium">
                                                <Check className="w-4 h-4 mr-2 text-green-500" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-[380px]">
                        <HotelBookingSidebar hotel={hotel} />
                    </aside>
                </div>

                {/* Similar Properties */}
                <section className="mt-20 pt-12 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Similar Properties You May Like</h2>
                        <a href="/hotels" className="text-primary-600 font-bold hover:underline text-sm">View all hotels</a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {hotels
                            .filter(h => h.id !== hotel.id && h.propertyType === hotel.propertyType)
                            .slice(0, 3)
                            .map(h => (
                                <div key={h.id} className="group">
                                    <a href={`/hotels/${h.slug}`} className="block relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                                        <img src={h.images.thumbnail} alt={h.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold">
                                            ${h.pricing.pricePerNightFrom}+
                                        </div>
                                    </a>
                                    <a href={`/hotels/${h.slug}`}>
                                        <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{h.name}</h3>
                                    </a>
                                    <p className="text-gray-500 text-xs flex items-center mt-1">
                                        <MapPin className="w-3 h-3 mr-1" /> {h.location.destination}
                                    </p>
                                </div>
                            ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
