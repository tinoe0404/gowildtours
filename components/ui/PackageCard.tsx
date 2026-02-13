"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Mountain, Heart } from "lucide-react";
import type { Package } from "@/lib/packages-data";
import { cn } from "@/lib/cn";

interface PackageCardProps {
    pkg: Package;
    className?: string;
}

export default function PackageCard({ pkg, className }: PackageCardProps) {
    return (
        <div
            className={cn(
                "group flex flex-col bg-white rounded-[var(--radius-card)] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full",
                className
            )}
        >
            {/* ── Image Section ── */}
            <Link href={`/packages/${pkg.slug}`} className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/50 to-transparent opacity-60" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {pkg.featured && (
                        <span className="bg-accent text-dark-deep text-[10px] font-accent font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
                            Featured
                        </span>
                    )}
                    {pkg.bestSeller && (
                        <span className="bg-primary text-white text-[10px] font-accent font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow-sm">
                            Best Seller
                        </span>
                    )}
                </div>

                {/* Category on Image Bottom */}
                <div className="absolute bottom-3 left-3">
                    <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md border border-white/20">
                        {pkg.category[0]}
                    </span>
                </div>
            </Link>

            {/* ── Content Section ── */}
            <div className="p-5 flex flex-col flex-1">

                <Link href={`/packages/${pkg.slug}`}>
                    <h3 className="font-display text-xl font-bold text-dark-deep mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {pkg.title}
                    </h3>
                </Link>

                <p className="text-warm-gray text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {pkg.shortDescription}
                </p>

                {/* Info Icons */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-xs text-warm-gray mb-5 pt-4 border-t border-beige/50">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span>{pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-accent" />
                        <span>{pkg.groupSize.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Mountain className="w-3.5 h-3.5 text-accent" />
                        <span>{pkg.difficulty}</span>
                    </div>
                </div>

                {/* Pricing & CTA */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xs text-warm-gray">From</span>
                        <span className="font-display text-2xl font-bold text-primary">
                            ${pkg.price.toLocaleString()}
                        </span>
                    </div>
                    <Link
                        href={`/packages/${pkg.slug}`}
                        className="px-4 py-2 bg-dark-deep text-white text-sm font-accent font-semibold rounded-full hover:bg-accent hover:text-dark-deep transition-colors shadow-sm"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
