"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    MapPin, Clock, Users, Mountain, Check, X,
    Calendar, Info, ChevronDown, ChevronUp, Share2
} from "lucide-react";
import type { Package } from "@/lib/packages-data";
import Container from "@/components/ui/Container";
import BookingForm from "@/components/packages/BookingForm";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import SocialShare from "@/components/marketing/SocialShare";

interface PackageDetailClientProps {
    pkg: Package;
}

export default function PackageDetailClient({ pkg }: PackageDetailClientProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "accommodation">("overview");

    // Mock itinerary generator since data file doesn't have it yet
    const itinerary = Array.from({ length: pkg.duration.days }).map((_, i) => ({
        day: i + 1,
        title: i === 0 ? "Arrival & Welcome" : i === pkg.duration.days - 1 ? "Departure" : `Exploration of ${pkg.destinations[0]}`,
        description: i === 0
            ? "Arrive at the airport and transfer to your lodge. Enjoy a welcome dinner and settle in."
            : i === pkg.duration.days - 1
                ? "Morning breakfast and transfer to the airport for your onward journey."
                : "Full day of activities including morning and afternoon game drives, bush walks, or relaxation at the lodge.",
    }));

    return (
        <>
            {/* ── Hero Gallery ── */}
            <div className="relative h-[50vh] min-h-[400px] bg-gray-900 group">
                <Image
                    src={pkg.images[0]}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/80 via-transparent to-transparent" />

                <Container className="relative h-full flex items-end pb-12 z-10">
                    <div className="w-full">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {pkg.category.map((cat) => (
                                <span key={cat} className="px-3 py-1 bg-accent/90 text-dark-deep text-xs font-accent font-bold uppercase rounded-full">
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 shadow-sm">
                            {pkg.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-accent" />
                                <span>{pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-accent" />
                                <span>Min {pkg.groupSize.min} - Max {pkg.groupSize.max} Guests</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-accent" />
                                <span>{pkg.destinations.join(", ")}</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* ── Main Content ── */}
            <section className="py-12 bg-light">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Left Column (Details) */}
                        <div className="lg:col-span-2 space-y-12">

                            {/* Highlights */}
                            <div className="bg-white p-6 rounded-[var(--radius-card)] shadow-sm border border-beige/50">
                                <h3 className="font-display text-2xl font-bold text-dark-deep mb-4">Highlights</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pkg.highlights.map((highlight, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 min-w-[20px]">
                                                <Check className="w-5 h-5 text-green-500" />
                                            </div>
                                            <span className="text-warm-gray">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="font-display text-2xl font-bold text-dark-deep mb-4">About This Safari</h3>
                                <div className="prose prose-lg text-warm-gray">
                                    <p className="leading-relaxed whitespace-pre-line">{pkg.longDescription}</p>
                                </div>
                            </div>

                            {/* Itinerary */}
                            <div>
                                <h3 className="font-display text-2xl font-bold text-dark-deep mb-6">Detailed Itinerary</h3>
                                <div className="space-y-4">
                                    {itinerary.map((day) => (
                                        <ItineraryItem key={day.day} item={day} />
                                    ))}
                                </div>
                            </div>

                            {/* Inclusions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-dark-deep mb-4 flex items-center gap-2">
                                        <Check className="w-5 h-5 text-green-500" /> What&apos;s Included
                                    </h4>
                                    <ul className="space-y-3">
                                        {pkg.inclusions.map((item, i) => (
                                            <li key={i} className="text-sm text-warm-gray border-b border-dashed border-gray-100 pb-2">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark-deep mb-4 flex items-center gap-2">
                                        <X className="w-5 h-5 text-red-400" /> What&apos;s Not Included
                                    </h4>
                                    <ul className="space-y-3 text-sm text-warm-gray">
                                        <li className="border-b border-dashed border-gray-100 pb-2">International Flights</li>
                                        <li className="border-b border-dashed border-gray-100 pb-2">Visas</li>
                                        <li className="border-b border-dashed border-gray-100 pb-2">Travel Insurance</li>
                                        <li className="border-b border-dashed border-gray-100 pb-2">Personal Expenses & Tips</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        {/* Right Column (Sidebar) */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">

                                {/* Price Card */}
                                <div className="bg-dark-deep text-white p-6 rounded-[var(--radius-card)] shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Share2 className="w-24 h-24" />
                                    </div>
                                    <p className="text-white/60 text-sm mb-1 uppercase tracking-wider font-semibold">Starting From</p>
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-4xl font-bold font-display">${pkg.price.toLocaleString()}</span>
                                        <span className="text-white/60">/ person</span>
                                    </div>

                                    <div className="space-y-3 mb-6 text-sm text-white/80">
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span>Duration</span>
                                            <span className="font-semibold text-white">{pkg.duration.days} Days</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span>Group Size</span>
                                            <span className="font-semibold text-white">{pkg.groupSize.type}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span>Difficulty</span>
                                            <span className="font-semibold text-white">{pkg.difficulty}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-white/50 text-center">
                                        *Prices vary by season and group size.
                                    </p>
                                </div>

                                {/* Booking Form */}
                                <BookingForm packageTitle={pkg.title} />

                                {/* Assistance */}
                                <div className="bg-white p-6 rounded-[var(--radius-card)] border border-beige text-center">
                                    <h4 className="font-bold text-dark-deep mb-2">Need Help?</h4>
                                    <p className="text-sm text-warm-gray mb-4">
                                        Speak to our safari experts to customize this itinerary.
                                    </p>
                                    <a href="mailto:info@gowildtours.com" className="text-accent font-semibold hover:underline">
                                        info@gowildtours.com
                                    </a>
                                </div>

                                {/* Social Share */}
                                <div className="bg-white p-6 rounded-[var(--radius-card)] border border-beige text-center">
                                    <SocialShare
                                        url={`https://gowildtours.com/packages/${pkg.slug}`}
                                        title={`Check out this amazing safari: ${pkg.title}`}
                                        className="justify-center"
                                    />
                                </div>

                                {/* Download Brochure */}
                                <a
                                    href={`/packages/${pkg.slug}/print`}
                                    target="_blank"
                                    className="block w-full text-center py-3 border border-dark-deep text-dark-deep font-bold rounded-full hover:bg-dark-deep hover:text-white transition-colors uppercase tracking-wider text-sm mt-4"
                                >
                                    Download Brochure
                                </a>
                            </div>
                        </div>

                    </div>
                </Container>
            </section>
        </>
    );
}

function ItineraryItem({ item }: { item: { day: number; title: string; description: string } }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-beige rounded-lg bg-white overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {item.day}
                    </span>
                    <span className="font-bold text-dark-deep">{item.title}</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0 }}
                className="overflow-hidden"
            >
                <div className="p-4 pt-0 text-warm-gray text-sm ml-12 border-l-2 border-dashed border-beige/50 pl-6">
                    {item.description}
                </div>
            </motion.div>
        </div>
    );
}
