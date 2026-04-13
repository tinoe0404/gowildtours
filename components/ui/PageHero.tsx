import React from 'react';
import Image from 'next/image';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    image: string;
}

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
    return (
        <section className="page-hero relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <Image 
                src={image} 
                alt={title} 
                fill 
                className="object-cover"
                style={{ objectPosition: 'center 40%' }}
                priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 text-center px-4">
                <h1 className="text-display-xl text-white mb-4 drop-shadow-md">{title}</h1>
                {subtitle && (
                    <p className="text-body-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
