"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface RecentItem {
    id: string;
    title: string;
    image: string;
    href: string;
    timestamp: number;
}

export const addToRecentlyViewed = (item: Omit<RecentItem, "timestamp">) => {
    if (typeof window === 'undefined') return;

    try {
        const current = JSON.parse(localStorage.getItem('gwt_recent') || '[]');
        const updated = [
            { ...item, timestamp: Date.now() },
            ...current.filter((i: RecentItem) => i.id !== item.id)
        ].slice(0, 5); // Keep last 5
        localStorage.setItem('gwt_recent', JSON.stringify(updated));
    } catch (e) {
        console.error("Error saving recent item", e);
    }
};

export default function RecentlyViewed() {
    const [items, setItems] = useState<RecentItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('gwt_recent');
        if (stored) {
            setItems(JSON.parse(stored));
        }
    }, []);

    if (items.length === 0) return null;

    return (
        <div className="py-8 border-t border-beige/10">
            <h3 className="text-lg font-display font-bold text-dark-deep mb-4">Recently Viewed</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {items.map((item) => (
                    <Link key={item.id} href={item.href} className="group">
                        <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2">
                            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <p className="text-sm font-semibold text-dark-deep truncate">{item.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
