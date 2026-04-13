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
    className,
}: SectionHeadingProps) {
    return (
        <div className={`section-header ${className || ""}`}>
            {label && <span className="section-header__label">{label}</span>}
            <h2 className="section-header__title">{title}</h2>
            {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
        </div>
    );
}
