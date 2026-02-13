"use client";

import { useState } from "react";
import { safariDestinations } from "@/lib/mapData";
import { cn } from "@/lib/cn";
import { MapPin } from "lucide-react";

interface DestinationExplorerProps {
    className?: string;
}

const DestinationExplorer = ({ className }: DestinationExplorerProps) => {
    const [selectedCategory, setSelectedCategory] = useState<"All" | "Activity" | "Hotel" | "Airport">("All");

    const filteredDestinations = selectedCategory === "All"
        ? safariDestinations
        : safariDestinations.filter(d => d.category === selectedCategory);

    return (
        <div className={cn("space-y-6", className)}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-dark-deep">Explore Destinations</h2>
                    <p className="text-warm-gray mt-2">Discover the magic of Southern Africa.</p>
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

            <div className="h-[400px] rounded-2xl overflow-hidden border border-beige/30 shadow-2xl bg-neutral-100 flex items-center justify-center flex-col gap-4">
                <MapPin className="w-12 h-12 text-neutral-400" />
                <p className="text-neutral-500 font-medium">Interactive map is currently unavailable</p>
            </div>
        </div>
    );
}

export default DestinationExplorer;
