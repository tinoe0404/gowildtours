"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Experience } from "@/lib/experiences-data";

interface ExperienceCardProps {
    experience: Experience;
    index: number;
}

export default function ExperienceCard({
    experience,
    index,
}: ExperienceCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const Icon = experience.icon;

    const handleMouseEnter = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay policy might block this used interaction
            });
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <Link
            href={experience.href}
            className="group relative block w-full h-[400px] md:h-[480px] overflow-hidden rounded-[var(--radius-card)] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
        >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* Poster Image (Always visible as fallback/base) */}
                <Image
                    src={experience.posterSrc}
                    alt={experience.title}
                    fill
                    className={cn(
                        "object-cover transition-opacity duration-700",
                        isPlaying ? "opacity-0" : "opacity-100"
                    )}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index === 0}
                />

                {/* Video Layer */}
                <video
                    ref={videoRef}
                    src={experience.videoSrc}
                    className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                        isPlaying ? "opacity-100" : "opacity-0"
                    )}
                    muted
                    loop
                    playsInline
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/90 via-dark-deep/40 to-dark-deep/10 group-hover:from-dark-deep/80 group-hover:via-dark-deep/30 transition-all duration-500" />
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
                {/* Icon & Label */}
                <div className="mb-auto transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white mb-4">
                        <Icon className="w-6 h-6" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-2 py-1 rounded bg-accent/90 text-dark-deep text-[10px] font-accent font-bold uppercase tracking-wider mb-3">
                        Experience
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 text-shadow-sm">
                        {experience.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                        {experience.description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex items-center gap-2 text-accent font-accent font-semibold text-sm uppercase tracking-wider group/btn">
                        <span>Discover More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
