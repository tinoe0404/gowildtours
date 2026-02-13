"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export default function BlurImage({ className, ...props }: ImageProps) {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className={cn("overflow-hidden", className)}>
            <Image
                {...props}
                className={cn(
                    "duration-700 ease-in-out",
                    isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
                    className
                )}
                onLoad={() => setLoading(false)}
            />
        </div>

    );
}
