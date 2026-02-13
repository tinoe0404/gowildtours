"use client";

import { useState } from "react";
import SafariSlider from "@/components/ui/SafariSlider";
import SafariCheckbox from "@/components/ui/SafariCheckbox";
import {
    Clock,
    DollarSign,
    BarChart3,
    Filter,
    X
} from "lucide-react";
import Button from "@/components/ui/Button";

interface FiltersState {
    priceRange: [number, number];
    durations: string[];
    difficulty: string[];
}

interface ActivityFiltersProps {
    onFilterChange: (filters: FiltersState) => void;
    onClose?: () => void;
}

const DURATIONS = ["Under 3 Hours", "3-6 Hours", "Full Day"];
const DIFFICULTIES = ["Easy", "Moderate", "Challenging"];

export default function ActivityFilters({ onFilterChange, onClose }: ActivityFiltersProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);

    const handlePriceChange = (value: number[]) => {
        const newRange: [number, number] = [value[0], value[1]];
        setPriceRange(newRange);
        updateFilters({ priceRange: newRange });
    };

    const toggleDuration = (duration: string) => {
        const updated = selectedDurations.includes(duration)
            ? selectedDurations.filter(d => d !== duration)
            : [...selectedDurations, duration];
        setSelectedDurations(updated);
        updateFilters({ durations: updated });
    };

    const toggleDifficulty = (level: string) => {
        const updated = selectedDifficulty.includes(level)
            ? selectedDifficulty.filter(d => d !== level)
            : [...selectedDifficulty, level];
        setSelectedDifficulty(updated);
        updateFilters({ difficulty: updated });
    };

    const updateFilters = (overrides: Partial<FiltersState> = {}) => {
        onFilterChange({
            priceRange,
            durations: selectedDurations,
            difficulty: selectedDifficulty,
            ...overrides
        });
    };

    const resetFilters = () => {
        setPriceRange([0, 500]);
        setSelectedDurations([]);
        setSelectedDifficulty([]);
        onFilterChange({
            priceRange: [0, 500],
            durations: [],
            difficulty: []
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-neutral-900">Filters</h3>
                </div>
                {onClose && (
                    <button onClick={onClose} className="lg:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Price Range */}
            <div className="mb-8 p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-neutral-900">Price Range</span>
                    <span className="text-sm font-medium text-orange-600">
                        Up to ${priceRange[1]}
                    </span>
                </div>
                <SafariSlider
                    max={500}
                    step={10}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={handlePriceChange}
                    className="py-4"
                    min={0}
                />
            </div>

            {/* Duration Filter */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-neutral-900 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    Duration
                </h3>
                <div className="space-y-3">
                    {DURATIONS.map((duration) => (
                        <label key={duration} className="flex items-center gap-3 cursor-pointer group">
                            <SafariCheckbox
                                checked={selectedDurations.includes(duration)}
                                onCheckedChange={() => toggleDuration(duration)}
                            />
                            <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                                {duration}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-neutral-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-orange-600" />
                    Difficulty Level
                </h3>
                <div className="space-y-3">
                    {DIFFICULTIES.map((level) => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                            <SafariCheckbox
                                checked={selectedDifficulty.includes(level)}
                                onCheckedChange={() => toggleDifficulty(level)}
                            />
                            <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                                {level}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full rounded-full text-xs"
                onClick={resetFilters}
            >
                Reset All Filters
            </Button>
        </div>
    );
}
