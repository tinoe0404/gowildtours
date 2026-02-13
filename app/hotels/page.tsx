'use client';

import React from 'react';
import { hotels } from '../../lib/hotels-data';
import { HotelHero } from '../../components/hotels/HotelHero';
import { HotelCard } from '../../components/hotels/HotelCard';
import { HotelFilters, FilterState } from '../../components/hotels/HotelFilters';
import { Search, LayoutGrid, List, Map as MapIcon, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultFilters: FilterState = {
    propertyTypes: [],
    priceRange: [0, 1500],
    starRating: [],
    locations: [],
    amenities: []
};

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'rating' | 'popularity';

export default function HotelsPage() {
    const [filters, setFilters] = React.useState<FilterState>(defaultFilters);
    const [sortBy, setSortBy] = React.useState<SortOption>('recommended');
    const [viewMode, setViewMode] = React.useState<'grid' | 'list' | 'map'>('grid');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState(false);

    const filteredHotels = hotels.filter(hotel => {
        if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(hotel.propertyType)) return false;
        if (hotel.pricing.pricePerNightFrom > filters.priceRange[1]) return false;
        if (filters.starRating.length > 0 && !filters.starRating.includes(hotel.starRating)) return false;
        if (filters.locations.length > 0 && !filters.locations.includes(hotel.location.destination)) return false;
        if (filters.amenities.length > 0) {
            const allHotelAmenities = [...hotel.amenities.general, ...hotel.amenities.room, ...hotel.amenities.dining];
            if (!filters.amenities.every(a => allHotelAmenities.some(ha => ha.includes(a)))) return false;
        }
        return true;
    }).sort((a, b) => {
        if (sortBy === 'price-low') return a.pricing.pricePerNightFrom - b.pricing.pricePerNightFrom;
        if (sortBy === 'price-high') return b.pricing.pricePerNightFrom - a.pricing.pricePerNightFrom;
        if (sortBy === 'rating') return b.reviews.averageRating - a.reviews.averageRating;
        if (sortBy === 'popularity') return b.reviews.totalReviews - a.reviews.totalReviews;
        return 0; // 'recommended' - default order
    });

    const clearFilters = () => setFilters(defaultFilters);

    return (
        <main className="min-h-screen bg-gray-50">
            <HotelHero
                title="Safari Lodges & Accommodations"
                subtitle="From luxury lodges to authentic bush camps"
                backgroundImage="https://images.unsplash.com/photo-1544473489-13833b76a086?auto=format&fit=crop&q=80&w=1200"
            />

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-1/4">
                        <HotelFilters
                            filters={filters}
                            onFilterChange={setFilters}
                            onClearFilters={clearFilters}
                        />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center">
                                <span className="text-gray-600 font-medium">
                                    <span className="text-gray-900 font-bold">{filteredHotels.length}</span> properties found
                                </span>

                                {/* Active Filter Chips (Partial Example) */}
                                {filters.propertyTypes.length > 0 && (
                                    <div className="flex gap-2 ml-4 overflow-x-auto no-scrollbar">
                                        {filters.propertyTypes.map(type => (
                                            <span key={type} className="bg-primary-50 text-primary-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center whitespace-nowrap">
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                {/* Mobile Filter Trigger */}
                                <button
                                    onClick={() => setIsMobileFiltersOpen(true)}
                                    className="lg:hidden flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold transition-colors"
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                </button>

                                {/* View Toggles */}
                                <div className="hidden md:flex bg-gray-100 p-1 rounded-lg">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <LayoutGrid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('map')}
                                        className={`p-1.5 rounded-md transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <MapIcon className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Sort Dropdown */}
                                <div className="relative group">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                                        className="appearance-none bg-gray-100 hover:bg-gray-200 text-gray-700 pl-4 pr-10 py-2 rounded-lg font-bold transition-colors cursor-pointer outline-none border-none text-sm"
                                    >
                                        <option value="recommended">Sort: Recommended</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Guest Rating</option>
                                        <option value="popularity">Most Popular</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                            <AnimatePresence>
                                {filteredHotels.length > 0 ? (
                                    filteredHotels.map(hotel => (
                                        <HotelCard key={hotel.id} hotel={hotel} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center">
                                        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 max-w-md mx-auto">
                                            <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
                                            <p className="text-gray-600 mb-8">We couldn't find any accommodations matching your current filters. Try adjusting your search criteria.</p>
                                            <button
                                                onClick={clearFilters}
                                                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
                                            >
                                                Clear All Filters
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Filters Modal (Basic) */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 lg:hidden"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-[85%] max-w-md bg-white shadow-2xl flex flex-col"
                        >
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-lg">Filters</h3>
                                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4">
                                <HotelFilters
                                    filters={filters}
                                    onFilterChange={setFilters}
                                    onClearFilters={clearFilters}
                                    className="shadow-none border-0 p-0 sticky-none"
                                />
                            </div>
                            <div className="p-4 border-t border-gray-100">
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
                                >
                                    Apply Filters ({filteredHotels.length})
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
