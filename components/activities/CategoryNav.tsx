"use client";

import { motion } from "framer-motion";
import { ActivityCategory } from "@/lib/activities-data";
import {
    Trees as WildlifeIcon,
    Zap as AdventureIcon,
    Waves as WaterIcon,
    Palette as CulturalIcon,
    Plane as AirIcon,
    Map as DayTripsIcon,
    Calendar as SeasonalIcon,
    LayoutGrid as AllIcon
} from "lucide-react";
import { cn } from "@/lib/cn";

interface CategoryNavProps {
    activeCategory: ActivityCategory | "All";
    onCategoryChange: (category: ActivityCategory | "All") => void;
}

const categories = [
    { id: "All", label: "All Activities", icon: AllIcon },
    { id: "Wildlife", label: "Wildlife", icon: WildlifeIcon },
    { id: "Adventure", label: "Adventure", icon: AdventureIcon },
    { id: "Water", label: "Water Sport", icon: WaterIcon },
    { id: "Cultural", label: "Cultural", icon: CulturalIcon },
    { id: "Air", label: "Air Tours", icon: AirIcon },
    { id: "Day Trips", label: "Day Trips", icon: DayTripsIcon },
    { id: "Seasonal", label: "Seasonal", icon: SeasonalIcon },
] as const;

export default function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
    return (
        <div className="w-full relative py-8 overflow-hidden">
            <div className="flex items-center justify-center gap-2 md:gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 mask-fade-edges">
                {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    const Icon = category.icon;

                    return (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id as any)}
                            className={cn(
                                "relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                                isActive
                                    ? "text-white"
                                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="category-active"
                                    className="absolute inset-0 bg-orange-600 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <Icon className={cn("w-4 h-4 relative z-10", isActive ? "text-white" : "text-neutral-400")} />
                            <span className="relative z-10">{category.label}</span>
                        </button>
                    );
                })}
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .mask-fade-edges {
                    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                }
            `}</style>
        </div>
    );
}
