"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { mapConfig } from "@/lib/mapConfig";
import { safariDestinations } from "@/lib/mapData";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import { MapPin } from "lucide-react";

const InteractiveMap = dynamic(() => import("@/components/ui/InteractiveMap"), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center bg-beige/20 border border-beige/30 rounded-xl h-full w-full">
            <MapPin className="h-12 w-12 text-warm-gray mb-4 animate-pulse" />
            <p className="text-dark-deep font-display text-lg">Loading Map…</p>
        </div>
    ),
});

interface DestinationExplorerProps {
    className?: string;
}

export default function DestinationExplorer({ className }: DestinationExplorerProps) {
    const [selectedCategory, setSelectedCategory] = useState<"All" | "Activity" | "Hotel" | "Airport">("All");

    const filteredDestinations = selectedCategory === "All"
        ? safariDestinations
        : safariDestinations.filter(d => d.category === selectedCategory);

    return (
        <div className={cn("space-y-6", className)}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-dark-deep">Explore Destinations</h2>
                    <p className="text-warm-gray mt-2">Discover the magic of Southern Africa through our interactive map.</p>
                </div>

                <div className="flex gap-2 bg-beige/30 p-1 rounded-lg">
                    {["All", "Activity", "Hotel"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat as any)}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                selectedCategory === cat
                                    ? "bg-white text-primary shadow-sm"
                                    : "text-warm-gray hover:text-dark-deep"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[600px] rounded-2xl overflow-hidden border border-beige/30 shadow-2xl">
                <InteractiveMap
                    markers={filteredDestinations.map(d => ({ ...d, category: d.category as any }))}
                    className="h-full w-full"
                />
            </div>
        </div>
    );
}
