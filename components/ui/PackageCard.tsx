"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Package } from "@/lib/packages-data";
import { getReviewSummary } from "@/lib/reviews";

interface PackageCardProps {
    pkg: Package;
    className?: string;
}

export default function PackageCard({ pkg, className }: PackageCardProps) {
    const mainImage = pkg.image || (pkg.images && pkg.images.length > 0 ? pkg.images[0] : "/images/safari/elephants-waterhole.jpg");

    const durationText = typeof pkg.duration === "string" 
        ? pkg.duration 
        : `${(pkg.duration as any)?.days || 0} Days`;

    const categories = typeof pkg.category === "string" ? [pkg.category] : (pkg.category as any) || ["Safari"];
    const category = categories[0];

    const price = Number(pkg.price).toLocaleString();
    const reviewSummary = getReviewSummary(pkg.slug);

    return (
        <article className={`package-card ${className || ""}`}>
            <div className="package-card__image-wrap">
                <Image 
                    src={mainImage} 
                    alt={pkg.title} 
                    fill 
                    className="package-card__image" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="package-card__badge">{category}</span>
                <span className="package-card__duration">{durationText}</span>
            </div>
            <div className="package-card__body">
                <Link href={`/safaris/${pkg.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 className="package-card__title">{pkg.title}</h3>
                </Link>
                <p className="package-card__excerpt">
                    {pkg.shortDescription || pkg.description?.substring(0, 100)}
                </p>
                <Link href={`/safaris/${pkg.slug}#reviews`} className="package-card__reviews" aria-label={`Read reviews for ${pkg.title}`}>
                    <Star aria-hidden="true" />
                    <strong>{reviewSummary.average ? reviewSummary.average.toFixed(1) : "New"}</strong>
                    <span>{reviewSummary.count === 1 ? "1 review" : `${reviewSummary.count} reviews`}</span>
                </Link>
                <div className="package-card__footer">
                    <div className="package-card__price">
                        <span className="package-card__price-from">from</span>
                        <span className="package-card__price-amount">${price}</span>
                        <span className="package-card__price-unit">/ person</span>
                    </div>
                    <Link href={`/safaris/${pkg.slug}`} className="package-card__cta">
                        View Details →
                    </Link>
                </div>
            </div>
        </article>
    );
}

