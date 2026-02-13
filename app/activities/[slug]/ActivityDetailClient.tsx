"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "@/lib/activities-data";
import {
    Clock,
    Users,
    Star,
    Check,
    X,
    ArrowLeft,
    Calendar,
    MapPin,
    AlertCircle,
    Info,
    Share2,
    Heart
} from "lucide-react";
import Button from "@/components/ui/Button";
import SafariBadge from "@/components/ui/SafariBadge";
import BookingForm from "@/components/packages/BookingForm";

interface ActivityDetailClientProps {
    activity: Activity;
}

export default function ActivityDetailClient({ activity }: ActivityDetailClientProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <section className="min-h-screen bg-neutral-50 pb-24">
            {/* Gallery / Hero */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-black overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={activity.images[selectedImage] || activity.image}
                            alt={activity.title}
                            fill
                            className="object-cover opacity-80"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-neutral-50 to-transparent" />

                <div className="absolute top-8 left-8 z-20">
                    <Link href="/activities">
                        <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full backdrop-blur-md">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Activities
                        </Button>
                    </Link>
                </div>

                <div className="absolute top-8 right-8 z-20 flex gap-2">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full backdrop-blur-md">
                        <Share2 className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full backdrop-blur-md">
                        <Heart className="w-5 h-5" />
                    </Button>
                </div>

                {/* Thumbnail Strip */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20 items-center">
                    {activity.images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-orange-500 scale-110" : "border-transparent opacity-60 hover:opacity-100"
                                }`}
                        >
                            <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-30">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Content */}
                    <div className="flex-grow space-y-8">
                        {/* Header Info */}
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-100">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <SafariBadge className="bg-orange-100 text-orange-600 border-none px-4 py-1">
                                    {activity.category}
                                </SafariBadge>
                                {activity.featured && (
                                    <SafariBadge className="bg-emerald-100 text-emerald-600 border-none px-4 py-1">
                                        Featured Experience
                                    </SafariBadge>
                                )}
                                {activity.popular && (
                                    <SafariBadge className="bg-blue-100 text-blue-600 border-none px-4 py-1">
                                        Top Rated
                                    </SafariBadge>
                                )}
                                {activity.seasonal && (
                                    <SafariBadge className="bg-purple-100 text-purple-600 border-none px-4 py-1">
                                        Seasonal
                                    </SafariBadge>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
                                {activity.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-neutral-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-neutral-500 block">Duration</span>
                                        <span className="text-sm font-bold">{activity.duration.display}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-neutral-500 block">Group Size</span>
                                        <span className="text-sm font-bold">Up to {activity.groupSize.max} People</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                        <Star className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-neutral-500 block">Difficulty</span>
                                        <span className="text-sm font-bold">{activity.difficulty}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-neutral-500 block">Location</span>
                                        <span className="text-sm font-bold">{activity.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                                <p className="text-neutral-600 leading-relaxed text-lg">
                                    {activity.longDescription}
                                </p>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="bg-white rounded-3xl p-8 md:px-12 shadow-sm border border-neutral-100">
                            <h2 className="text-2xl font-bold mb-8">What to Expect</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {activity.highlights.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <span className="text-neutral-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Inclusions & Practicalities */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Check className="w-5 h-5 text-emerald-600" />
                                    What&apos;s Included
                                </h3>
                                <ul className="space-y-4">
                                    {activity.inclusions.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-neutral-600 text-sm">
                                            <Check className="w-4 h-4 mt-0.5 text-emerald-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-orange-600" />
                                    What to Bring
                                </h3>
                                <ul className="space-y-4">
                                    {activity.whatToBring.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-neutral-600 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-2" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Important Info */}
                        <div className="bg-orange-50/50 rounded-3xl p-8 border border-orange-100">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-900">
                                <AlertCircle className="w-5 h-5" />
                                Important Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-700">
                                <div className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                                    Booking should be made at least 24 hours in advance.
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                                    Pick-up times are subject to your hotel location.
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                                    Cancellations made within 24 hours are non-refundable.
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                                    Weather conditions may affect some activities.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Sidebar */}
                    <div className="w-full lg:w-[400px] flex-shrink-0">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-neutral-100">
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-neutral-500">From</span>
                                    <span className="text-4xl font-black text-neutral-900">
                                        ${activity.price.amount}
                                    </span>
                                    <span className="text-neutral-500 ml-1">/{activity.price.per === "Person" ? "person" : "unit"}</span>
                                </div>

                                <div className="space-y-6 py-8 border-y border-neutral-100 mb-8">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-500 font-medium flex items-center gap-2">
                                            <Calendar className="w-4 h-4" /> Available Dates
                                        </span>
                                        <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">Daily</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-500 font-medium flex items-center gap-2">
                                            <Users className="w-4 h-4" /> Group size
                                        </span>
                                        <span className="font-bold">1 - {activity.groupSize.max} People</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-neutral-500 font-medium flex items-center gap-2">
                                            <Star className="w-4 h-4" /> Rating
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold">4.9 (42 Reviews)</span>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="font-bold text-neutral-900 mb-6 uppercase tracking-wider text-xs">
                                    Inquire for Booking
                                </h4>
                                <BookingForm />
                            </div>

                            <div className="bg-white rounded-3xl p-6 border border-neutral-100 flex items-center gap-4 group cursor-pointer hover:border-orange-200 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                                    <Info className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h5 className="font-bold text-sm">Need help?</h5>
                                    <p className="text-xs text-neutral-500">Contact our safari experts 24/7</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
