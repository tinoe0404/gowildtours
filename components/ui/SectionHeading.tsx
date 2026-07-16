"use client";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    label?: string;
    align?: "left" | "center";
    light?: boolean;
    className?: string;
}

export default function SectionHeading({
    title,
    subtitle,
    label = "Explore",
    light = false,
    className,
}: SectionHeadingProps) {
    return (
        <div className={`section-header ${className || ""}`}>
            {label && (
                <span
                    className="section-header__label"
                    style={light ? { color: 'var(--color-savanna-light)' } : undefined}
                >
                    {label}
                </span>
            )}
            <h2
                className="section-header__title"
                style={light ? { color: '#FFFDF9' } : undefined}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className="section-header__subtitle"
                    style={light ? { color: 'rgba(255,255,255,0.65)' } : undefined}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
