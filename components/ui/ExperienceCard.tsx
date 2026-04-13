"use client";

import Link from "next/link";
import type { Experience } from "@/lib/experiences-data";

interface ExperienceCardProps {
    experience: Experience;
    index?: number;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
    const Icon = experience.icon;

    if (experience.href) {
        return (
            <Link href={experience.href} className="feature-card" style={{ textDecoration: 'none' }}>
                <div className="feature-card__icon">
                    <Icon size={24} />
                </div>
                <h3 className="feature-card__title">{experience.title}</h3>
                <p className="feature-card__desc">{experience.description}</p>
            </Link>
        );
    }

    return (
        <div className="feature-card">
            <div className="feature-card__icon">
                <Icon size={24} />
            </div>
            <h3 className="feature-card__title">{experience.title}</h3>
            <p className="feature-card__desc">{experience.description}</p>
        </div>
    );
}

