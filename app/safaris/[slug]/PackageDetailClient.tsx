"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    MapPin, Clock, Users, Mountain, Check, X,
    Calendar, Info, ChevronDown, ChevronUp, Share2, Plus, Minus
} from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cart";
import type { Package } from "@/lib/packages-data";
import Container from "@/components/ui/Container";
import BookingForm from "@/components/packages/BookingForm";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import SocialShare from "@/components/marketing/SocialShare";
import ReviewsSection from "@/components/reviews/ReviewsSection";

interface PackageDetailClientProps {
    pkg: Package;
}

export default function PackageDetailClient({ pkg }: PackageDetailClientProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "accommodation">("overview");

    // Extract values safely
    const durationDays = typeof pkg.duration === "string"
        ? (parseInt(pkg.duration.match(/(\d+)/)?.[1] || "0"))
        : pkg.duration.days;

    const durationNights = typeof pkg.duration === "string"
        ? (parseInt(pkg.duration.match(/(\d+)\s+Nights/)?.[1] || "0"))
        : pkg.duration.nights;

    const categories = typeof pkg.category === "string" ? [pkg.category] : pkg.category;
    const destinations = pkg.destinations || [];
    const mainImage = pkg.image || (pkg.images && pkg.images.length > 0 ? pkg.images[0] : "/images/safari/lioness-rain.jpg");
    const description = pkg.description || pkg.longDescription || "";

    // Mock itinerary generator since data file doesn't have it yet
    const itinerary = Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 
        ? pkg.itinerary 
        : Array.from({ length: durationDays || 1 }).map((_, i) => ({
            day: i + 1,
            title: i === 0 ? "Arrival & Welcome" : i === (durationDays || 1) - 1 ? "Departure" : `Exploration of ${destinations[0] || "Zimbabwe"}`,
            description: i === 0
                ? "Arrive at the airport and transfer to your lodge. Enjoy a welcome dinner and settle in."
                : i === (durationDays || 1) - 1
                    ? "Morning breakfast and transfer to the airport for your onward journey."
                    : "Full day of activities including morning and afternoon game drives, bush walks, or relaxation at the lodge.",
        }));

    return (
        <>
            {/* ── Page Header ── */}
            <div className="pt-36 pb-8 bg-[var(--color-mist)]">
                <Container>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {categories.map((cat) => (
                            <span key={cat} className="px-3 py-1 bg-accent/90 text-dark-deep text-xs font-accent font-bold uppercase rounded-full">
                                {cat}
                            </span>
                        ))}
                    </div>
                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-earth)] mb-4">
                        {pkg.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-[var(--color-text-muted)] text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-accent" />
                            <span>{durationDays} Days / {durationNights} Nights</span>
                        </div>
                        {(pkg.minGuests || pkg.maxGuests) && (
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-accent" />
                                <span>Min {pkg.minGuests || 2} - Max {pkg.maxGuests || 6} Guests</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-accent" />
                            <span>{destinations.join(", ")}</span>
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
                                    {(pkg.highlights || []).map((highlight, idx) => (
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
                                    <p className="leading-relaxed whitespace-pre-line">{description}</p>
                                </div>
                            </div>

                            {/* Itinerary */}
                            <div>
                                <h3 className="font-display text-2xl font-bold text-dark-deep mb-6">Detailed Itinerary</h3>
                                <div className="space-y-4">
                                    {(itinerary as any[]).map((day, index, array) => (
                                        <ItineraryItem key={day.day} item={day} isLastDay={index === array.length - 1} />
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
                                        {(pkg.inclusions || []).map((item, i) => (
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
                                        {(pkg.exclusions || []).map((item, i) => (
                                            <li key={i} className="border-b border-dashed border-gray-100 pb-2">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>

                        {/* Right Column (Sidebar) */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6 pb-24 md:pb-0">

                                {/* Add to Cart Widget */}
                                <SafariBookingWidget pkg={pkg as any} />

                                {/* Price Card */}
                                <div 
                                    className="text-white p-6 rounded-[var(--radius-card)] relative overflow-hidden"
                                    style={{ background: 'linear-gradient(135deg, #2C1A0E, #1A1007)', boxShadow: 'var(--shadow-elevated)' }}
                                >
                                    <div className="absolute top-0 left-0 w-full h-[4px]" style={{ background: 'linear-gradient(90deg, #C8873A, #E5A95A, #C8873A)' }} />
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
                                            <span className="font-semibold text-white">{durationDays} Days</span>
                                        </div>
                                        {(pkg.minGuests || pkg.maxGuests) && (
                                            <div className="flex justify-between border-b border-white/10 pb-2">
                                                <span>Group Size</span>
                                                <span className="font-semibold text-white">
                                                    {pkg.minGuests === pkg.maxGuests ? 'Private' : 'Small Group'}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between border-b border-white/10 pb-2">
                                            <span>Difficulty</span>
                                            <span className="font-semibold text-white">{pkg.difficulty || "Moderate"}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-white/50 text-center">
                                        *Prices vary by season and group size.
                                    </p>
                                </div>

                                {/* Booking Form */}
                                <div className="mt-6 bg-white p-6 rounded-[var(--radius-card)] shadow-lg" style={{ border: '1px solid var(--color-border)' }}>
                                    <h4 className="font-display text-xl font-bold text-dark-deep mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-savanna)' }} />
                                        Prefer to inquire?
                                    </h4>
                                    <BookingForm packageTitle={pkg.title} />
                                </div>

                                {/* Assistance */}
                                <div className="bg-white p-6 rounded-[var(--radius-card)] text-center transition-shadow hover:shadow-md" style={{ border: '1px solid var(--color-border)' }}>
                                    <h4 className="font-bold text-dark-deep mb-2">Need Help?</h4>
                                    <p className="text-sm text-warm-gray mb-4">
                                        Speak to our safari experts to customize this itinerary.
                                    </p>
                                    <a href="mailto:info@gowildtourszim.com" className="text-accent font-semibold hover:underline">
                                        info@gowildtourszim.com
                                    </a>
                                </div>

                                {/* Social Share */}
                                <div className="bg-white p-6 rounded-[var(--radius-card)] text-center transition-shadow hover:shadow-md" style={{ border: '1px solid var(--color-border)' }}>
                                    <SocialShare
                                        url={`https://gowildtours.com/safaris/${pkg.slug}`}
                                        title={`Check out this amazing safari: ${pkg.title}`}
                                        className="justify-center"
                                    />
                                </div>

                                {/* Download Brochure */}
                                <a
                                    href={`/safaris/${pkg.slug}/print`}
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
            <div id="reviews">
                <ReviewsSection tourSlug={pkg.slug} tourTitle={pkg.title} />
            </div>
        </>
    );
}

function ItineraryItem({ item, isLastDay }: { item: { day: number; title: string; description: string; accommodation?: string; meals?: string; highlights?: string; facilities?: string; }, isLastDay?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    // Format accommodation to only show the first option and remove "or similar"
    let formattedAccommodation = "Standard Lodge / Camp";
    if (isLastDay) {
        formattedAccommodation = "Own arrangements";
    } else if (item.accommodation) {
        formattedAccommodation = item.accommodation.split('/')[0].replace(/or similar/i, '').trim();
    }

    return (
        <div className="rounded-lg bg-white overflow-hidden transition-all duration-300" style={{ border: isOpen ? '1px solid rgba(200,135,58,0.4)' : '1px solid rgba(44,26,14,0.1)', boxShadow: isOpen ? 'var(--shadow-card)' : 'none' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm" style={{ background: isOpen ? 'linear-gradient(135deg, var(--color-savanna), var(--color-sunset))' : 'rgba(44,26,14,0.08)', color: isOpen ? 'white' : 'var(--color-earth)' }}>
                        {item.day}
                    </span>
                    <span className="font-bold text-dark-deep text-lg">{item.title}</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0 }}
                className="overflow-hidden"
            >
                <div className="p-4 pt-0 text-warm-gray text-sm ml-12 border-l-2 border-dashed pl-6 space-y-4" style={{ borderColor: 'rgba(200,135,58,0.3)' }}>
                    <p className="leading-relaxed">{item.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg mt-4 text-sm" style={{ background: 'rgba(200,135,58,0.04)', border: '1px solid rgba(200,135,58,0.1)' }}>
                        <div>
                            <span className="font-bold text-dark-deep block mb-1">Accommodation:</span>
                            <span>{formattedAccommodation}</span>
                        </div>
                        <div>
                            <span className="font-bold text-dark-deep block mb-1">Meals:</span>
                            <span>{item.meals || "Breakfast, Lunch, Dinner"}</span>
                        </div>
                        <div>
                            <span className="font-bold text-dark-deep block mb-1">Facilities:</span>
                            <span>{item.facilities || "En-suite, Wi-Fi (where available), Restaurant"}</span>
                        </div>
                        <div>
                            <span className="font-bold text-dark-deep block mb-1">Highlights included:</span>
                            <span>{item.highlights || "Scenic views, Game viewing"}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function SafariBookingWidget({ pkg }: { pkg: Package }) {
    const [travelers, setTravelers] = useState(2);
    const [date, setDate] = useState("");
    const addItem = useCartStore((state) => state.addItem);

    // Min date is 7 days from today
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 7);
    const minDateStr = minDate.toISOString().split("T")[0];

    // Helper functions for safe values
    const safePrice = pkg.price ? Number(pkg.price) : 0;
    
    // Determine duration string
    let durationString = "Unknown Duration";
    if (typeof pkg.duration === "string") {
        durationString = pkg.duration;
    } else if (pkg.duration && typeof pkg.duration === "object") {
         durationString = `${pkg.duration.days} Days / ${pkg.duration.nights} Nights`;
    }

    // Determine image
    const imageString = pkg.image || (pkg.images && pkg.images.length > 0 ? pkg.images[0] : "/images/safari/lioness-rain.jpg");

    const handleAddToCart = () => {
        if (!date) {
            toast.error("Please select a preferred departure date");
            return;
        }

        const selectedDate = new Date(date);
        if (selectedDate < minDate) {
            toast.error("Departure date must be at least 7 days in advance");
            return;
        }

        addItem({
            id: pkg.slug,
            name: pkg.title,
            image: imageString,
            duration: durationString,
            pricePerPerson: safePrice,
            travelers: travelers,
            date: date
        });

        toast.success(`"${pkg.title}" added to your cart`, {
            action: {
                label: "View Cart",
                onClick: () => {
                    // We can trigger cart open by selecting the cart button if we implemented an event, 
                    // but for this, we can just let them click it or navigate
                     const btn = document.querySelector('button[aria-label="Open cart"]') as HTMLButtonElement | null;
                     if (btn) btn.click();
                }
            }
        });
    };

    return (
        <div className="bg-white p-6 rounded-[var(--radius-card)] shadow-lg border border-border">
            <h3 className="font-display text-2xl font-bold text-dark-deep mb-4">Book Your Safari</h3>
            
            <div className="space-y-4 mb-6">
                {/* Travelers */}
                <div>
                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">
                        Travelers
                    </label>
                    <div className="flex items-center border border-border rounded-lg bg-gray-50 h-11">
                        <button
                            type="button"
                            onClick={() => setTravelers(Math.max(1, travelers - 1))}
                            className="w-12 h-full flex items-center justify-center text-warm-gray hover:bg-gray-100 transition-colors rounded-l-lg cursor-pointer"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <div className="flex-1 text-center font-semibold text-sm">
                            {travelers}
                        </div>
                        <button
                            type="button"
                            onClick={() => setTravelers(Math.min(8, travelers + 1))}
                            className="w-12 h-full flex items-center justify-center text-warm-gray hover:bg-gray-100 transition-colors rounded-r-lg cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Date Picker */}
                <div>
                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">
                        Preferred Departure
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
                        <input
                            type="date"
                            value={date}
                            min={minDateStr}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full pl-10 pr-4 h-11 bg-gray-50 border border-border rounded-lg focus:ring-2 focus:ring-accent outline-none text-sm cursor-pointer transition-shadow"
                        />
                    </div>
                    <p className="text-[10px] text-warm-gray mt-1">*Safaris require at least 7 days advance notice</p>
                </div>
                
                {/* Line Total preview */}
                {travelers > 0 && safePrice > 0 && (
                    <div className="flex justify-between items-center py-2 border-t border-border mt-4">
                        <span className="text-sm font-medium text-warm-gray">Total Estimated:</span>
                        <span className="font-display font-bold text-lg text-dark-deep">${(safePrice * travelers).toLocaleString()}</span>
                    </div>
                )}
            </div>

            <Button onClick={handleAddToCart} className="w-full uppercase tracking-wider text-sm font-bold h-12">
                Add to Safari Cart
            </Button>
            
            {/* Mobile Fixed Bar - Shows only on small screens */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 px-6 z-50 flex items-center justify-between shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                <div>
                     <p className="text-[10px] uppercase font-bold text-warm-gray tracking-wider">Per Person</p>
                     <p className="font-display font-bold text-xl text-dark-deep">${safePrice.toLocaleString()}</p>
                </div>
                <Button onClick={handleAddToCart} className="px-8 whitespace-nowrap shadow-none">
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}

