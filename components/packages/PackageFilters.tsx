"use client";

import { useState } from "react";
import { Check, ChevronDown, Search, RotateCcw, Filter } from "lucide-react";
import { cn } from "@/lib/cn";
import type { DifficultyLevel, PackageCategory } from "@/lib/packages-data";

export interface PackageFiltersProps {
    filters: {
        destinations: string[];
        duration: string[];
        priceRange: string[];
        categories: string[];
        difficulty: string[];
    };
    destinationOptions: string[];
    optionCounts?: {
        destinations?: Record<string, number>;
        duration?: Record<string, number>;
        priceRange?: Record<string, number>;
        categories?: Record<string, number>;
        difficulty?: Record<string, number>;
    };
    onFilterChange: (type: string, value: string) => void;
    onClearSection?: (type: string) => void;
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
    optionCounts = {},
    onFilterChange,
    onClearSection,
    onClearFilters,
    className,
}: PackageFiltersProps) {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        destinations: true,
        duration: true,
        priceRange: true,
        categories: true,
        difficulty: true,
    });

    const [destSearch, setDestSearch] = useState("");

    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const totalActiveFilters =
        filters.destinations.length +
        filters.duration.length +
        filters.priceRange.length +
        filters.categories.length +
        filters.difficulty.length;

    const filteredDestinations = destinationOptions.filter((d) =>
        d.toLowerCase().includes(destSearch.toLowerCase())
    );

    return (
        <div className={cn("bg-white rounded-2xl shadow-sm border border-neutral-200/80 p-5 space-y-4", className)}>
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-accent" />
                    <h3 className="font-display text-base font-bold text-dark-deep">Filters</h3>
                    {totalActiveFilters > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full">
                            {totalActiveFilters}
                        </span>
                    )}
                </div>
                {totalActiveFilters > 0 && (
                    <button
                        onClick={onClearFilters}
                        className="flex items-center gap-1 text-xs font-semibold text-warm-gray hover:text-accent transition-colors"
                    >
                        <RotateCcw className="w-3 h-3" />
                        Clear All
                    </button>
                )}
            </div>

            <div className="divide-y divide-neutral-100">
                {/* Destinations */}
                <AccordionSection
                    title="Destinations"
                    isOpen={openSections.destinations}
                    activeCount={filters.destinations.length}
                    onToggle={() => toggleSection("destinations")}
                    onReset={() => onClearSection ? onClearSection("destinations") : filters.destinations.forEach(v => onFilterChange("destinations", v))}
                >
                    <div className="pt-2 pb-1 space-y-3">
                        {destinationOptions.length > 5 && (
                            <div className="relative">
                                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
                                <input
                                    type="text"
                                    placeholder="Search destinations..."
                                    value={destSearch}
                                    onChange={(e) => setDestSearch(e.target.value)}
                                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
                                />
                            </div>
                        )}
                        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                            {filteredDestinations.map((dest) => (
                                <FilterCheckboxOption
                                    key={dest}
                                    label={dest}
                                    count={optionCounts.destinations?.[dest]}
                                    isSelected={filters.destinations.includes(dest)}
                                    onChange={() => onFilterChange("destinations", dest)}
                                />
                            ))}
                            {filteredDestinations.length === 0 && (
                                <p className="text-xs text-warm-gray py-2">No matching destinations found</p>
                            )}
                        </div>
                    </div>
                </AccordionSection>

                {/* Duration */}
                <AccordionSection
                    title="Duration"
                    isOpen={openSections.duration}
                    activeCount={filters.duration.length}
                    onToggle={() => toggleSection("duration")}
                    onReset={() => onClearSection ? onClearSection("duration") : filters.duration.forEach(v => onFilterChange("duration", v))}
                >
                    <div className="pt-2 pb-1 space-y-1.5">
                        {DURATION_OPTIONS.map((dur) => (
                            <FilterCheckboxOption
                                key={dur}
                                label={dur}
                                count={optionCounts.duration?.[dur]}
                                isSelected={filters.duration.includes(dur)}
                                onChange={() => onFilterChange("duration", dur)}
                            />
                        ))}
                    </div>
                </AccordionSection>

                {/* Price Range */}
                <AccordionSection
                    title="Price Range"
                    isOpen={openSections.priceRange}
                    activeCount={filters.priceRange.length}
                    onToggle={() => toggleSection("priceRange")}
                    onReset={() => onClearSection ? onClearSection("priceRange") : filters.priceRange.forEach(v => onFilterChange("priceRange", v))}
                >
                    <div className="pt-2 pb-1 space-y-1.5">
                        {PRICE_OPTIONS.map((price) => (
                            <FilterCheckboxOption
                                key={price}
                                label={price}
                                count={optionCounts.priceRange?.[price]}
                                isSelected={filters.priceRange.includes(price)}
                                onChange={() => onFilterChange("priceRange", price)}
                            />
                        ))}
                    </div>
                </AccordionSection>

                {/* Experience Type */}
                <AccordionSection
                    title="Experience Type"
                    isOpen={openSections.categories}
                    activeCount={filters.categories.length}
                    onToggle={() => toggleSection("categories")}
                    onReset={() => onClearSection ? onClearSection("categories") : filters.categories.forEach(v => onFilterChange("categories", v))}
                >
                    <div className="pt-2 pb-1 space-y-1.5">
                        {CATEGORY_OPTIONS.map((cat) => (
                            <FilterCheckboxOption
                                key={cat}
                                label={cat}
                                count={optionCounts.categories?.[cat]}
                                isSelected={filters.categories.includes(cat)}
                                onChange={() => onFilterChange("categories", cat)}
                            />
                        ))}
                    </div>
                </AccordionSection>

                {/* Difficulty */}
                <AccordionSection
                    title="Difficulty Level"
                    isOpen={openSections.difficulty}
                    activeCount={filters.difficulty.length}
                    onToggle={() => toggleSection("difficulty")}
                    onReset={() => onClearSection ? onClearSection("difficulty") : filters.difficulty.forEach(v => onFilterChange("difficulty", v))}
                >
                    <div className="pt-2 pb-1 space-y-1.5">
                        {DIFFICULTY_OPTIONS.map((diff) => (
                            <FilterCheckboxOption
                                key={diff}
                                label={diff}
                                count={optionCounts.difficulty?.[diff]}
                                isSelected={filters.difficulty.includes(diff)}
                                onChange={() => onFilterChange("difficulty", diff)}
                            />
                        ))}
                    </div>
                </AccordionSection>
            </div>
        </div>
    );
}

function AccordionSection({
    title,
    isOpen,
    activeCount,
    onToggle,
    onReset,
    children,
}: {
    title: string;
    isOpen: boolean;
    activeCount: number;
    onToggle: () => void;
    onReset: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="py-3.5 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between group cursor-pointer" onClick={onToggle}>
                <div className="flex items-center gap-2">
                    <h4 className="font-accent text-xs font-bold uppercase tracking-wider text-dark-deep group-hover:text-accent transition-colors">
                        {title}
                    </h4>
                    {activeCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold text-accent bg-amber-50 rounded border border-amber-200">
                            {activeCount}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {activeCount > 0 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onReset();
                            }}
                            className="text-[11px] text-warm-gray hover:text-accent transition-colors underline mr-1"
                        >
                            Reset
                        </button>
                    )}
                    <ChevronDown
                        className={cn(
                            "w-4 h-4 text-warm-gray transition-transform duration-200",
                            isOpen && "transform rotate-180"
                        )}
                    />
                </div>
            </div>
            {isOpen && children}
        </div>
    );
}

function FilterCheckboxOption({
    label,
    count,
    isSelected,
    onChange,
}: {
    label: string;
    count?: number;
    isSelected: boolean;
    onChange: () => void;
}) {
    return (
        <label className="flex items-center justify-between gap-2 px-1.5 py-1 rounded-lg hover:bg-neutral-50 cursor-pointer group transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
                <div
                    className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-150",
                        isSelected
                            ? "bg-accent border-accent text-white"
                            : "bg-white border-neutral-300 group-hover:border-accent"
                    )}
                >
                    {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                </div>
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={isSelected}
                    onChange={onChange}
                />
                <span
                    className={cn(
                        "text-xs transition-colors truncate",
                        isSelected ? "text-dark-deep font-semibold" : "text-neutral-600 group-hover:text-dark-deep"
                    )}
                >
                    {label}
                </span>
            </div>
            {typeof count === "number" && (
                <span
                    className={cn(
                        "text-[11px] font-mono shrink-0 transition-colors px-1.5 py-0.5 rounded-full",
                        isSelected
                            ? "bg-accent/10 font-bold text-accent"
                            : "text-neutral-400 group-hover:text-neutral-600"
                    )}
                >
                    {count}
                </span>
            )}
        </label>
    );
}
