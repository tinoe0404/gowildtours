"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown, X, Search, RotateCcw } from "lucide-react";
import type { Package } from "@/lib/packages-data";
import PackageCard from "@/components/ui/PackageCard";
import PackageFilters from "@/components/packages/PackageFilters";
import Button from "@/components/ui/Button";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function PackagesClient({ initialPackages }: { initialPackages: Package[] }) {
    const [allPackages] = useState<Package[]>(initialPackages);
    const [error] = useState<string | null>(null);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [sortOption, setSortOption] = useState("featured");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter State
    const [filters, setFilters] = useState({
        destinations: [] as string[],
        duration: [] as string[],
        priceRange: [] as string[],
        categories: [] as string[],
        difficulty: [] as string[],
    });

    // ── Derived Unique Destinations ──
    const uniqueDestinations = useMemo(() => {
        const allDestinations = allPackages.flatMap((pkg) => pkg.destinations || []);
        return Array.from(new Set(allDestinations)).sort();
    }, [allPackages]);

    // ── Handlers ──
    const handleFilterChange = (type: string, value: string) => {
        setFilters((prev) => {
            const current = (prev as any)[type];
            const updated = current.includes(value)
                ? current.filter((item: string) => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    const handleClearSection = (type: string) => {
        setFilters((prev) => ({ ...prev, [type]: [] }));
    };

    const clearFilters = () => {
        setFilters({
            destinations: [],
            duration: [],
            priceRange: [],
            categories: [],
            difficulty: [],
        });
        setSearchQuery("");
    };

    // ── Option Counts Calculation ──
    const optionCounts = useMemo(() => {
        const counts = {
            destinations: {} as Record<string, number>,
            duration: {} as Record<string, number>,
            priceRange: {} as Record<string, number>,
            categories: {} as Record<string, number>,
            difficulty: {} as Record<string, number>,
        };

        allPackages.forEach((pkg) => {
            // Destinations
            (pkg.destinations || []).forEach((d) => {
                counts.destinations[d] = (counts.destinations[d] || 0) + 1;
            });

            // Duration
            let days = 0;
            if (typeof pkg.duration === "string") {
                const daysMatch = pkg.duration.match(/(\d+)\s+Days/);
                days = daysMatch ? parseInt(daysMatch[1]) : 0;
            } else {
                days = pkg.duration.days;
            }

            if (days <= 3) counts.duration["1-3 Days"] = (counts.duration["1-3 Days"] || 0) + 1;
            if (days >= 4 && days <= 7) counts.duration["4-7 Days"] = (counts.duration["4-7 Days"] || 0) + 1;
            if (days >= 8 && days <= 14) counts.duration["8-14 Days"] = (counts.duration["8-14 Days"] || 0) + 1;
            if (days >= 15) counts.duration["15+ Days"] = (counts.duration["15+ Days"] || 0) + 1;

            // Price
            if (pkg.price < 1500) counts.priceRange["Budget (<$1500)"] = (counts.priceRange["Budget (<$1500)"] || 0) + 1;
            if (pkg.price >= 1500 && pkg.price <= 3000) counts.priceRange["Mid-Range ($1500-$3000)"] = (counts.priceRange["Mid-Range ($1500-$3000)"] || 0) + 1;
            if (pkg.price > 3000) counts.priceRange["Luxury (>$3000)"] = (counts.priceRange["Luxury (>$3000)"] || 0) + 1;

            // Categories
            if (typeof pkg.category === "string") {
                counts.categories[pkg.category] = (counts.categories[pkg.category] || 0) + 1;
            } else if (Array.isArray(pkg.category)) {
                pkg.category.forEach((c) => {
                    counts.categories[c] = (counts.categories[c] || 0) + 1;
                });
            }

            // Difficulty
            if (pkg.difficulty) {
                counts.difficulty[pkg.difficulty] = (counts.difficulty[pkg.difficulty] || 0) + 1;
            }
        });

        return counts;
    }, [allPackages]);

    // ── Filtering Logic ──
    const filteredPackages = useMemo(() => {
        return allPackages.filter((pkg) => {
            // Search Query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    pkg.title.toLowerCase().includes(query) ||
                    (pkg.shortDescription || "").toLowerCase().includes(query) ||
                    (pkg.destinations || []).some((d) => d.toLowerCase().includes(query));

                if (!matchesSearch) return false;
            }

            // Destinations
            if (filters.destinations.length > 0) {
                const hasDestination = (pkg.destinations || []).some((d) => filters.destinations.includes(d));
                if (!hasDestination) return false;
            }

            // Duration
            if (filters.duration.length > 0) {
                let days = 0;
                if (typeof pkg.duration === "string") {
                    const daysMatch = pkg.duration.match(/(\d+)\s+Days/);
                    days = daysMatch ? parseInt(daysMatch[1]) : 0;
                } else {
                    days = pkg.duration.days;
                }

                const matchesDuration = filters.duration.some((range) => {
                    if (range === "1-3 Days") return days <= 3;
                    if (range === "4-7 Days") return days >= 4 && days <= 7;
                    if (range === "8-14 Days") return days >= 8 && days <= 14;
                    if (range === "15+ Days") return days >= 15;
                    return false;
                });
                if (!matchesDuration) return false;
            }

            // Price
            if (filters.priceRange.length > 0) {
                const matchesPrice = filters.priceRange.some((range) => {
                    if (range.includes("<$1500")) return pkg.price < 1500;
                    if (range.includes("$1500-$3000")) return pkg.price >= 1500 && pkg.price <= 3000;
                    if (range.includes(">$3000")) return pkg.price > 3000;
                    return false;
                });
                if (!matchesPrice) return false;
            }

            // Category
            if (filters.categories.length > 0) {
                if (typeof pkg.category === "string") {
                    if (!filters.categories.includes(pkg.category)) return false;
                } else {
                    const hasCategory = pkg.category.some((cat) => filters.categories.includes(cat));
                    if (!hasCategory) return false;
                }
            }

            // Difficulty
            if (filters.difficulty.length > 0) {
                if (!filters.difficulty.includes(pkg.difficulty || "")) return false;
            }

            return true;
        });
    }, [allPackages, filters, searchQuery]);

    // ── Sorting Logic ──
    const sortedPackages = useMemo(() => {
        const items = [...filteredPackages];
        switch (sortOption) {
            case "price-low":
                return items.sort((a, b) => a.price - b.price);
            case "price-high":
                return items.sort((a, b) => b.price - a.price);
            case "duration-short": {
                const getDays = (d: any) => {
                    if (typeof d === "string") {
                        const m = d.match(/(\d+)/);
                        return m ? parseInt(m[1]) : 0;
                    }
                    return d.days;
                };
                return items.sort((a, b) => getDays(a.duration) - getDays(b.duration));
            }
            case "duration-long": {
                const getDays = (d: any) => {
                    if (typeof d === "string") {
                        const m = d.match(/(\d+)/);
                        return m ? parseInt(m[1]) : 0;
                    }
                    return d.days;
                };
                return items.sort((a, b) => getDays(b.duration) - getDays(a.duration));
            }
            default: // featured
                return items.sort((a, b) => {
                    const isAFeatured = a.isFeatured ?? a.featured ?? false;
                    const isBFeatured = b.isFeatured ?? b.featured ?? false;
                    return (isBFeatured ? 1 : 0) - (isAFeatured ? 1 : 0);
                });
        }
    }, [filteredPackages, sortOption]);

    const totalActiveFilters =
        filters.destinations.length +
        filters.duration.length +
        filters.priceRange.length +
        filters.categories.length +
        filters.difficulty.length;

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 relative items-start">
            {/* ── Sidebar Filters (Desktop) ── */}
            <aside className="hidden lg:block w-72 sticky top-24 shrink-0">
                <PackageFilters
                    filters={filters}
                    destinationOptions={uniqueDestinations}
                    optionCounts={optionCounts}
                    onFilterChange={handleFilterChange}
                    onClearSection={handleClearSection}
                    onClearFilters={clearFilters}
                />
            </aside>

            {/* ── Mobile Filters Drawer ── */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setIsMobileFiltersOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 p-5 overflow-y-auto lg:hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="w-5 h-5 text-accent" />
                                    <h2 className="text-lg font-bold font-display text-dark-deep">Filters</h2>
                                </div>
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="p-1.5 text-neutral-500 hover:text-dark-deep bg-neutral-100 rounded-full"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <PackageFilters
                                    filters={filters}
                                    destinationOptions={uniqueDestinations}
                                    optionCounts={optionCounts}
                                    onFilterChange={handleFilterChange}
                                    onClearSection={handleClearSection}
                                    onClearFilters={clearFilters}
                                    className="shadow-none border-0 p-0"
                                />
                            </div>

                            <div className="pt-4 border-t border-neutral-100 mt-4 bg-white sticky bottom-0">
                                <Button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full justify-center"
                                >
                                    Show {filteredPackages.length} Safaris
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── Main Content Area ── */}
            <div className="flex-1 w-full space-y-6">
                {/* Search & Action Bar */}
                <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-sm space-y-4">
                    <div className="relative flex items-center">
                        <Search className="w-5 h-5 absolute left-4 text-warm-gray" />
                        <input
                            type="text"
                            placeholder="Search by tour title, destination, or highlight..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-10 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-sm font-medium"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 p-1 text-neutral-400 hover:text-dark-deep"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-neutral-100">
                        <p className="text-warm-gray text-xs font-medium">
                            Showing <span className="font-bold text-dark-deep">{sortedPackages.length}</span> of{" "}
                            {allPackages.length} safaris
                        </p>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            {/* Mobile Filter Toggle */}
                            <button
                                onClick={() => setIsMobileFiltersOpen(true)}
                                className="lg:hidden flex items-center gap-2 px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200/80 rounded-full text-xs font-bold text-dark-deep transition-colors"
                            >
                                <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
                                Filters
                                {totalActiveFilters > 0 && (
                                    <span className="w-4 h-4 text-[10px] bg-accent text-white rounded-full flex items-center justify-center font-bold">
                                        {totalActiveFilters}
                                    </span>
                                )}
                            </button>

                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-xl text-xs">
                                <ArrowUpDown className="w-3.5 h-3.5 text-warm-gray" />
                                <span className="text-neutral-400 font-medium">Sort:</span>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="bg-transparent text-xs font-semibold text-dark-deep focus:outline-none cursor-pointer pr-1"
                                >
                                    <option value="featured">Featured First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="duration-short">Duration: Short to Long</option>
                                    <option value="duration-long">Duration: Long to Short</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Active Filter Badges Bar ── */}
                {(totalActiveFilters > 0 || searchQuery) && (
                    <div className="flex flex-wrap items-center gap-2 p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl">
                        <span className="text-xs font-bold text-dark-deep uppercase tracking-wider text-[10px] mr-1">
                            Active Filters:
                        </span>

                        {searchQuery && (
                            <ActiveFilterBadge
                                label={`Search: "${searchQuery}"`}
                                onRemove={() => setSearchQuery("")}
                            />
                        )}

                        {filters.destinations.map((dest) => (
                            <ActiveFilterBadge
                                key={dest}
                                label={dest}
                                onRemove={() => handleFilterChange("destinations", dest)}
                            />
                        ))}

                        {filters.duration.map((dur) => (
                            <ActiveFilterBadge
                                key={dur}
                                label={dur}
                                onRemove={() => handleFilterChange("duration", dur)}
                            />
                        ))}

                        {filters.priceRange.map((price) => (
                            <ActiveFilterBadge
                                key={price}
                                label={price}
                                onRemove={() => handleFilterChange("priceRange", price)}
                            />
                        ))}

                        {filters.categories.map((cat) => (
                            <ActiveFilterBadge
                                key={cat}
                                label={cat}
                                onRemove={() => handleFilterChange("categories", cat)}
                            />
                        ))}

                        {filters.difficulty.map((diff) => (
                            <ActiveFilterBadge
                                key={diff}
                                label={`Difficulty: ${diff}`}
                                onRemove={() => handleFilterChange("difficulty", diff)}
                            />
                        ))}

                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 text-xs font-bold text-accent hover:underline ml-auto pl-2"
                        >
                            <RotateCcw className="w-3 h-3" />
                            Clear All
                        </button>
                    </div>
                )}

                {/* ── Results Grid ── */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    key={JSON.stringify(filters) + sortOption + searchQuery}
                    className="packages-grid"
                >
                    {sortedPackages.length > 0 ? (
                        sortedPackages.map((pkg) => (
                            <motion.div key={pkg.id} variants={staggerItem}>
                                <PackageCard pkg={pkg as any} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-16 px-4 bg-white rounded-2xl border border-dashed border-neutral-300 text-center">
                            <h3 className="text-lg font-display font-bold text-dark-deep mb-2">
                                No safaris match your current filter selections
                            </h3>
                            <p className="text-xs text-warm-gray mb-6 max-w-md mx-auto">
                                Try removing some active filter tags or searching for broader terms to view available tours.
                            </p>
                            <Button onClick={clearFilters} variant="outline">
                                Reset All Filters
                            </Button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

function ActiveFilterBadge({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-dark-deep bg-white border border-neutral-200 rounded-full shadow-xs transition-all hover:border-neutral-300">
            {label}
            <button
                onClick={onRemove}
                className="p-0.5 text-neutral-400 hover:text-accent rounded-full transition-colors"
                aria-label={`Remove ${label} filter`}
            >
                <X className="w-3 h-3" />
            </button>
        </span>
    );
}
