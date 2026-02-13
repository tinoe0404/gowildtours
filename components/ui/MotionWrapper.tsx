"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ReactNode } from "react";

interface MotionWrapperProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    viewport?: { once: boolean; margin: string };
}

export const MotionWrapper = ({
    children,
    className,
    delay = 0,
    direction = "up",
    viewport = { once: true, margin: "-100px" },
}: MotionWrapperProps) => {
    const directions = {
        up: { y: 20, x: 0 },
        down: { y: -20, x: 0 },
        left: { x: 20, y: 0 },
        right: { x: -20, y: 0 },
        none: { x: 0, y: 0 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;
