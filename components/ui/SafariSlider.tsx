"use client";

import { cn } from "@/lib/cn";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface SliderProps {
    min: number;
    max: number;
    step?: number;
    value: [number, number];
    onValueChange: (value: number[]) => void;
    className?: string;
}

const Slider = ({ min, max, step = 1, value, onValueChange, className }: SliderProps) => {
    return (
        <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value[1]} // Simple single-slider proxy for now
                onChange={(e) => onValueChange([value[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-beige rounded-lg appearance-none cursor-pointer accent-accent"
            />
        </div>
    );
};

export default Slider;
