import { forwardRef } from "react";
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

const Section = forwardRef<HTMLElement, SectionProps>(({
    className,
    spacing = "md",
    children,
    ...props
}, ref) => {
    return (
        <section ref={ref} className={cn(spacingMap[spacing], className)} {...props}>
            {children}
        </section>
    );
});

Section.displayName = "Section";

export default Section;
