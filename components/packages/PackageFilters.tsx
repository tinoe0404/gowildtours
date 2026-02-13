"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { DifficultyLevel, PackageCategory } from "@/lib/packages-data";

interface PackageFiltersProps {
    filters: {
        destinations: string[];
        duration: string[];
        priceRange: string[];
        categories: string[];
        difficulty: string[];
    };
    destinationOptions: string[];
    onFilterChange: (type: string, value: string) => void;
    onClearFilters: () => void;
    className?: string;
}

const DURATION_OPTIONS = ["1-3 Days", "4-7 Days", "8-14 Days", "15+ Days"];
const PRICE_OPTIONS = ["Budget (<$1500)", "Mid-Range ($1500-$3000)", "Luxury (>$3000)"];
const CATEGORY_OPTIONS: PackageCategory[] = [
    "Wildlife Safari",
    "Cultural Tour",
    "Adventure",
    "Photography",
    "Honeymoon",
    "Family",
    "Solo",
];
const DIFFICULTY_OPTIONS: DifficultyLevel[] = ["Easy", "Moderate", "Challenging"];

export default function PackageFilters({
    filters,
    destinationOptions,
    onFilterChange,
    onClearFilters,
    className,
}: PackageFiltersProps) {

    const hasActiveFilters =
        filters.destinations.length > 0 ||
        filters.duration.length > 0 ||
        filters.priceRange.length > 0 ||
        filters.categories.length > 0 ||
        filters.difficulty.length > 0;

    return (
        <div className={cn("bg-white rounded-[var(--radius-card)] shadow-sm border border-beige/50 p-6", className)}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-dark-deep">Filters</h3>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="text-xs text-warm-gray hover:text-accent underline transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="space-y-8">
                {/* Destinations */}
                <FilterGroup
                    title="Destinations"
                    options={destinationOptions}
                    selected={filters.destinations}
                    onChange={(val) => onFilterChange("destinations", val)}
                />

                {/* Days */}
                <FilterGroup
                    title="Duration"
                    options={DURATION_OPTIONS}
                    selected={filters.duration}
                    onChange={(val) => onFilterChange("duration", val)}
                />

                {/* Price */}
                <FilterGroup
                    title="Price Range"
                    options={PRICE_OPTIONS}
                    selected={filters.priceRange}
                    onChange={(val) => onFilterChange("priceRange", val)}
                />

                {/* Category */}
                <FilterGroup
                    title="Experience Type"
                    options={CATEGORY_OPTIONS}
                    selected={filters.categories}
                    onChange={(val) => onFilterChange("categories", val)}
                />

                {/* Difficulty */}
                <FilterGroup
                    title="Difficulty"
                    options={DIFFICULTY_OPTIONS}
                    selected={filters.difficulty}
                    onChange={(val) => onFilterChange("difficulty", val)}
                />
            </div>
        </div>
    );
}

function FilterGroup({
    title,
    options,
    selected,
    onChange,
}: {
    title: string;
    options: string[];
    selected: string[];
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <h4 className="font-accent text-sm font-semibold text-dark-deep mb-3 uppercase tracking-wider">
                {title}
            </h4>
            <div className="space-y-2">
                {options.map((option) => {
                    const isSelected = selected.includes(option);
                    return (
                        <label
                            key={option}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <div
                                className={cn(
                                    "w-5 h-5 rounded border flex items-center justify-center transition-all duration-200",
                                    isSelected
                                        ? "bg-primary border-primary"
                                        : "bg-white border-warm-gray/40 group-hover:border-primary"
                                )}
                            >
                                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isSelected}
                                onChange={() => onChange(option)}
                            />
                            <span
                                className={cn(
                                    "text-sm transition-colors",
                                    isSelected ? "text-primary font-medium" : "text-warm-gray group-hover:text-dark-deep"
                                )}
                            >
                                {option}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
