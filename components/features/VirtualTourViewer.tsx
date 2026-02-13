"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import Script from "next/script";
import { Loader2 } from "lucide-react";

declare global {
    interface Window {
        pannellum: any;
    }
}

interface VirtualTourViewerProps {
    image: string;
    preview?: string;
    autoLoad?: boolean;
    className?: string;
    title?: string;
}

export default function VirtualTourViewer({
    image,
    preview,
    autoLoad = false,
    className,
    title
}: VirtualTourViewerProps) {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isLoaded && window.pannellum && viewerRef.current) {
            window.pannellum.viewer(viewerRef.current, {
                type: "equirectangular",
                panorama: image,
                autoLoad: autoLoad,
                preview: preview,
                title: title,
                showControls: true,
                compass: true,
            });
        }
    }, [isLoaded, image, autoLoad, preview, title]);

    return (
        <>
            <Script
                src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
                onLoad={() => setIsLoaded(true)}
            />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />

            <div
                ref={viewerRef}
                className={cn("w-full h-[500px] bg-neutral-900 rounded-xl overflow-hidden relative shadow-2xl", className)}
            >
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                )}
            </div>
        </>
    );
}
