"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
    light?: boolean;
    className?: string;
}

export default function SectionHeading({
    title,
    subtitle,
    align = "center",
    light = false,
    className,
}: SectionHeadingProps) {
    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={cn(
                "mb-12 md:mb-16",
                align === "center" && "text-center",
                className
            )}
        >
            {/* Decorative accent */}
            <span
                className={cn(
                    "font-accent text-sm font-semibold tracking-[0.2em] uppercase block mb-3",
                    light ? "text-accent-light" : "text-accent"
                )}
            >
                ✦
            </span>

            <h2
                className={cn(
                    "font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
                    light ? "text-cream" : "text-dark-deep"
                )}
            >
                {title}
            </h2>

            {subtitle && (
                <p
                    className={cn(
                        "mt-4 max-w-2xl text-base md:text-lg leading-relaxed",
                        align === "center" && "mx-auto",
                        light ? "text-beige/80" : "text-warm-gray"
                    )}
                >
                    {subtitle}
                </p>
            )}

            {/* Decorative line */}
            <div
                className={cn(
                    "mt-6 h-[2px] w-16 rounded-full",
                    align === "center" && "mx-auto",
                    light
                        ? "bg-gradient-to-r from-transparent via-accent to-transparent"
                        : "bg-gradient-to-r from-transparent via-primary to-transparent"
                )}
            />
        </motion.div>
    );
}
