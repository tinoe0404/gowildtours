import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "primary" | "secondary" | "success" | "outline" | "destructive";
}

export default function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "bg-accent text-dark-deep border-transparent",
        primary: "bg-primary text-white border-transparent",
        secondary: "bg-primary-light text-primary-dark border-transparent",
        success: "bg-green-500 text-white border-transparent",
        outline: "text-accent border-accent",
        destructive: "bg-red-500 text-white border-transparent",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold font-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}
