"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { packages, type Package } from "@/lib/packages-data";
import PackageCard from "@/components/ui/PackageCard";
import PackageFilters from "@/components/packages/PackageFilters";
import Button from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/cn";

export default function PackagesClient({ initialPackages }: { initialPackages: Package[] }) {
    const [allPackages, setAllPackages] = useState<Package[]>(initialPackages);
    const [error, setError] = useState<string | null>(null);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [sortOption, setSortOption] = useState("featured");

    // Filter State
    const [filters, setFilters] = useState({
        destinations: [] as string[],
        duration: [] as string[],
        priceRange: [] as string[],
        categories: [] as string[],
        difficulty: [] as string[],
    });

    // ── Derived Data ──
    const uniqueDestinations = useMemo(() => {
        const allDestinations = allPackages.flatMap((pkg) => pkg.destinations || []);
        return Array.from(new Set(allDestinations)).sort();
    }, [allPackages]);

    // ── Handlers ──
    const [searchQuery, setSearchQuery] = useState("");

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

    // ── Filtering Logic ──
    const filteredPackages = useMemo(() => {
        return allPackages.filter((pkg) => {
            // Search Query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    pkg.title.toLowerCase().includes(query) ||
                    (pkg.shortDescription || "").toLowerCase().includes(query) ||
                    (pkg.destinations || []).some(d => d.toLowerCase().includes(query));

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
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                />
            </aside>

            {/* ── Mobile Filters Modal ── */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                            onClick={() => setIsMobileFiltersOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white z-50 p-4 overflow-y-auto lg:hidden"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold font-display">Filters</h2>
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="p-2 bg-gray-100 rounded-full"
                                >
                                    ✕
                                </button>
                            </div>
                            <PackageFilters
                                filters={filters}
                                destinationOptions={uniqueDestinations}
                                onFilterChange={handleFilterChange}
                                onClearFilters={clearFilters}
                                className="shadow-none border-0 p-0"
                            />
                            <div className="sticky bottom-0 left-0 right-0 pt-4 bg-white border-t border-gray-100 mt-4">
                                <Button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full"
                                >
                                    Show {filteredPackages.length} Results
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ── Main Content ── */}
            <div className="flex-1 w-full">
                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search packages by name, destination, or keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-sm shadow-sm"
                    />
                </div>

                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <p className="text-warm-gray text-sm">
                        Showing <span className="font-bold text-dark-deep">{sortedPackages.length}</span> adventures
                    </p>

                    <div className="flex items-center gap-3">
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setIsMobileFiltersOpen(true)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full text-sm font-medium text-dark-deep"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>

                        {/* Sort Dropdown */}
                        <div className="relative flex items-center gap-2">
                            <ArrowUpDown className="w-4 h-4 text-warm-gray" />
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="bg-transparent text-sm font-medium text-dark-deep focus:outline-none cursor-pointer"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="duration-short">Duration: Short to Long</option>
                                <option value="duration-long">Duration: Long to Short</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    key={JSON.stringify(filters) + sortOption}
                    className="packages-grid"
                >
                    {sortedPackages.length > 0 ? (
                        sortedPackages.map((pkg) => (
                            <motion.div key={pkg.id} variants={staggerItem}>
                                <PackageCard pkg={pkg as any} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <h3 className="text-xl font-display font-bold text-dark-deep mb-2">No safaris match your filters</h3>
                            <p className="text-warm-gray mb-6">Try adjusting your filters to find your perfect adventure.</p>
                            <Button onClick={clearFilters} variant="outline">
                                Clear filters
                            </Button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
