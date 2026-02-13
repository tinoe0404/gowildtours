"use client";

import { useState, useMemo } from "react";
import { Activity, ActivityCategory } from "@/lib/activities-data";
import CategoryNav from "@/components/activities/CategoryNav";
import FeaturedActivities from "@/components/activities/FeaturedActivities";
import ActivityCard from "@/components/activities/ActivityCard";
import ActivityFilters from "@/components/activities/ActivityFilters";
import SafariInput from "@/components/ui/SafariInput";
import SafariSelect, {
    SelectItem,
} from "@/components/ui/SafariSelect";
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import Button from "@/components/ui/Button";
import { SafariSheet, SheetContent, SheetTrigger } from "@/components/ui/SafariSheet";

interface ActivitiesClientProps {
    activities: Activity[];
}

export default function ActivitiesClient({ activities }: ActivitiesClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | "All">("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("popular");
    const [filters, setFilters] = useState({
        priceRange: [0, 500] as [number, number],
        durations: [] as string[],
        difficulty: [] as string[]
    });

    const filteredActivities = useMemo(() => {
        return activities
            .filter((activity) => {
                const matchesCategory = selectedCategory === "All" || activity.category === selectedCategory;
                const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    activity.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesPrice = activity.price.amount >= filters.priceRange[0] && activity.price.amount <= filters.priceRange[1];

                const matchesDuration = filters.durations.length === 0 || filters.durations.some(d => {
                    if (d === "Under 3 Hours") return activity.duration.value < 3;
                    if (d === "3-6 Hours") return activity.duration.value >= 3 && activity.duration.value <= 6;
                    if (d === "Full Day") return activity.duration.value > 6 || activity.duration.unit === "Days";
                    return true;
                });

                const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(activity.difficulty);

                return matchesCategory && matchesSearch && matchesPrice && matchesDuration && matchesDifficulty;
            })
            .sort((a, b) => {
                if (sortBy === "price-low") return a.price.amount - b.price.amount;
                if (sortBy === "price-high") return b.price.amount - a.price.amount;
                if (sortBy === "duration") return b.duration.value - a.duration.value;
                if (sortBy === "name") return a.title.localeCompare(b.title);
                return (b.popular ? 1 : 0) - (a.popular ? 1 : 0); // popular default
            });
    }, [activities, selectedCategory, searchQuery, sortBy, filters]);

    const featuredItems = useMemo(() => {
        return activities.filter(a => a.featured).slice(0, 2);
    }, [activities]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 bg-neutral-50">
            {/* Category Navigation */}
            <CategoryNav
                activeCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            {/* Featured Section (Only show when "All" is selected and no search) */}
            {selectedCategory === "All" && searchQuery === "" && (
                <FeaturedActivities activities={featuredItems} />
            )}

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-8 border-b border-neutral-200">
                <div className="w-full md:max-w-md relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <SafariInput
                        placeholder="Search activities..."
                        className="pl-10 rounded-full border-neutral-200 focus:ring-orange-500 focus:border-orange-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex items-center gap-1 bg-white border border-neutral-200 p-1 rounded-lg">
                        <Button variant="ghost" size="sm" className="p-2 h-8 w-8 bg-neutral-100 text-orange-600">
                            <LayoutGrid className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2 h-8 w-8 text-neutral-400">
                            <List className="w-4 h-4" />
                        </Button>
                    </div>

                    <SafariSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="duration">Longest First</SelectItem>
                        <SelectItem value="name">Name: A-Z</SelectItem>
                    </SafariSelect>

                    {/* Mobile Filters Trigger */}
                    <SafariSheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="md:hidden rounded-lg border-neutral-200">
                                <SlidersHorizontal className="w-4 h-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] p-0">
                            <ActivityFilters onFilterChange={setFilters} />
                        </SheetContent>
                    </SafariSheet>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Desktop Sidebar Filters */}
                <aside className="hidden lg:block w-72 flex-shrink-0">
                    <ActivityFilters onFilterChange={setFilters} />
                </aside>

                {/* Grid */}
                <div className="flex-grow">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-neutral-900">
                            {filteredActivities.length} {filteredActivities.length === 1 ? 'Activity' : 'Activities'} Found
                        </h2>
                    </div>

                    {filteredActivities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                            {filteredActivities.map((activity) => (
                                <ActivityCard key={activity.id} activity={activity} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-neutral-300">
                            <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-neutral-400" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">No activities found</h3>
                            <p className="text-neutral-500 mb-6 max-w-xs mx-auto">
                                We couldn&apos;t find any activities matching your current filters. Try adjusting your search or category.
                            </p>
                            <Button
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSearchQuery("");
                                    setFilters({ priceRange: [0, 500], durations: [], difficulty: [] });
                                }}
                                className="bg-orange-600 hover:bg-orange-700 text-white rounded-full"
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
