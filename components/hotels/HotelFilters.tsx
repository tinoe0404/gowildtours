'use client';

import React from 'react';
import { Search, ChevronDown, ChevronUp, Star, Filter, X } from 'lucide-react';
import Checkbox from '../ui/SafariCheckbox';
import SafariSlider from '../ui/SafariSlider';

interface FilterSectionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, isOpen, onToggle, children }) => {
    return (
        <div className="border-b border-gray-100 py-4 last:border-0">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full text-left mb-3 group"
            >
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">{title}</h4>
                {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-primary-600" /> : <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary-600" />}
            </button>
            {isOpen && (
                <div className="space-y-2 mt-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export interface FilterState {
    propertyTypes: string[];
    priceRange: [number, number];
    starRating: number[];
    locations: string[];
    amenities: string[];
}

interface HotelFiltersProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    onClearFilters: () => void;
    className?: string;
}

export const HotelFilters: React.FC<HotelFiltersProps> = ({
    filters,
    onFilterChange,
    onClearFilters,
    className = ""
}) => {
    const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
        types: true,
        price: true,
        rating: true,
        locations: true,
        amenities: false
    });

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleTypeChange = (type: string) => {
        const nextTypes = filters.propertyTypes.includes(type)
            ? filters.propertyTypes.filter(t => t !== type)
            : [...filters.propertyTypes, type];
        onFilterChange({ ...filters, propertyTypes: nextTypes });
    };

    const propertyTypes = [
        { id: 'lodge', label: 'Safari Lodge' },
        { id: 'camp', label: 'Tented Camp' },
        { id: 'hotel', label: 'Hotel' },
        { id: 'guesthouse', label: 'Guesthouse' },
        { id: 'eco-lodge', label: 'Eco-Lodge' },
    ];

    const locations = [
        'Victoria Falls',
        'Hwange National Park',
        'Mana Pools',
        'Lake Kariba',
        'Matobo Hills'
    ];

    const amenities = [
        'Free WiFi',
        'Swimming Pool',
        'Restaurant',
        'Air Conditioning',
        'Spa'
    ];

    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-gray-900">
                    <Filter className="w-5 h-5 mr-2" />
                    <h3 className="font-bold text-lg">Filters</h3>
                </div>
                <button
                    onClick={onClearFilters}
                    className="text-primary-600 text-xs font-bold hover:text-primary-700 transition-colors flex items-center"
                >
                    <X className="w-3 h-3 mr-1" />
                    Clear All
                </button>
            </div>

            <div className="space-y-2">
                {/* Property Type */}
                <FilterSection
                    title="Property Type"
                    isOpen={openSections.types}
                    onToggle={() => toggleSection('types')}
                >
                    {propertyTypes.map(type => (
                        <label key={type.id} className="flex items-center space-x-3 cursor-pointer group py-1">
                            <Checkbox
                                checked={filters.propertyTypes.includes(type.id)}
                                onCheckedChange={() => handleTypeChange(type.id)}
                            />
                            <span className="text-sm text-gray-600 group-hover:text-primary-600 transition-colors">{type.label}</span>
                        </label>
                    ))}
                </FilterSection>

                {/* Price Range */}
                <FilterSection
                    title="Price per night"
                    isOpen={openSections.price}
                    onToggle={() => toggleSection('price')}
                >
                    <div className="px-2 pt-2 pb-6">
                        <SafariSlider
                            min={0}
                            max={1500}
                            step={50}
                            value={[0, filters.priceRange[1]]}
                            onValueChange={(val: number[]) => onFilterChange({ ...filters, priceRange: [val[0], val[1]] })}
                        />
                        <div className="flex justify-between mt-4 text-xs font-bold text-gray-500">
                            <span>$0</span>
                            <span>${filters.priceRange[1]}+</span>
                        </div>
                    </div>
                </FilterSection>

                {/* Star Rating */}
                <FilterSection
                    title="Rating"
                    isOpen={openSections.rating}
                    onToggle={() => toggleSection('rating')}
                >
                    {[5, 4, 3, 2].map(star => (
                        <label key={star} className="flex items-center space-x-3 cursor-pointer group py-1">
                            <Checkbox
                                checked={filters.starRating.includes(star)}
                                onCheckedChange={() => {
                                    const nextRating = filters.starRating.includes(star)
                                        ? filters.starRating.filter(r => r !== star)
                                        : [...filters.starRating, star];
                                    onFilterChange({ ...filters, starRating: nextRating });
                                }}
                            />
                            <div className="flex items-center">
                                {Array.from({ length: star }).map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                ))}
                                {Array.from({ length: 5 - star }).map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 text-gray-200" />
                                ))}
                            </div>
                        </label>
                    ))}
                </FilterSection>

                {/* Locations */}
                <FilterSection
                    title="Location"
                    isOpen={openSections.locations}
                    onToggle={() => toggleSection('locations')}
                >
                    {locations.map(loc => (
                        <label key={loc} className="flex items-center space-x-3 cursor-pointer group py-1">
                            <Checkbox
                                checked={filters.locations.includes(loc)}
                                onCheckedChange={() => {
                                    const nextLocs = filters.locations.includes(loc)
                                        ? filters.locations.filter(l => l !== loc)
                                        : [...filters.locations, loc];
                                    onFilterChange({ ...filters, locations: nextLocs });
                                }}
                            />
                            <span className="text-sm text-gray-600 group-hover:text-primary-600 transition-colors font-medium">{loc}</span>
                        </label>
                    ))}
                </FilterSection>

                {/* Amenities */}
                <FilterSection
                    title="Amenities"
                    isOpen={openSections.amenities}
                    onToggle={() => toggleSection('amenities')}
                >
                    {amenities.map(amenity => (
                        <label key={amenity} className="flex items-center space-x-3 cursor-pointer group py-1">
                            <Checkbox
                                checked={filters.amenities.includes(amenity)}
                                onCheckedChange={() => {
                                    const nextAmens = filters.amenities.includes(amenity)
                                        ? filters.amenities.filter(a => a !== amenity)
                                        : [...filters.amenities, amenity];
                                    onFilterChange({ ...filters, amenities: nextAmens });
                                }}
                            />
                            <span className="text-sm text-gray-600 group-hover:text-primary-600 transition-colors font-medium">{amenity}</span>
                        </label>
                    ))}
                </FilterSection>
            </div>
        </div>
    );
};
