import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    hover?: boolean;
}

export default function Card({ className, hover = true, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-[var(--radius-card)] bg-white overflow-hidden shadow-md",
                hover &&
                "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
