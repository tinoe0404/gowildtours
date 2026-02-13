"use client";

import { useState } from "react";
import { Play, Pause, Circle } from "lucide-react";
import { cn } from "@/lib/cn";

interface Hotspot {
    id: string;
    time: number; // Second to appear
    duration: number; // Duration to stay visible
    x: number; // Percentage X
    y: number; // Percentage Y
    label: string;
    link?: string;
}

interface VideoHotspotsProps {
    src: string;
    poster?: string;
    hotspots?: Hotspot[];
    className?: string;
}

export default function VideoHotspots({ src, poster, hotspots = [], className }: VideoHotspotsProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        setCurrentTime(e.currentTarget.currentTime);
    };

    return (
        <div className={cn("relative rounded-xl overflow-hidden group shadow-xl", className)}>
            <video
                src={src}
                poster={poster}
                className="w-full h-full object-cover"
                controls={true}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
            />

            {/* Hotspots Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                {hotspots.map((spot) => {
                    const isVisible = currentTime >= spot.time && currentTime <= (spot.time + spot.duration);

                    if (!isVisible) return null;

                    return (
                        <div
                            key={spot.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group/spot"
                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        >
                            <div className="relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <div className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-white items-center justify-center shadow-md">
                                    <Circle className="h-2 w-2 text-white fill-white" />
                                </div>

                                {/* Tooltip */}
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-white/90 backdrop-blur text-dark-deep text-xs font-bold px-3 py-1.5 rounded-md shadow-lg opacity-0 group-hover/spot:opacity-100 transition-opacity whitespace-nowrap">
                                    {spot.label}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
