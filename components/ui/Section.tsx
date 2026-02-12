import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
    className?: string;
    spacing?: "sm" | "md" | "lg";
}

const spacingMap = {
    sm: "py-[var(--spacing-section-sm)]",
    md: "py-[var(--spacing-section-md)]",
    lg: "py-[var(--spacing-section-lg)]",
};

export default function Section({
    className,
    spacing = "md",
    children,
    ...props
}: SectionProps) {
    return (
        <section className={cn(spacingMap[spacing], className)} {...props}>
            {children}
        </section>
    );
}
