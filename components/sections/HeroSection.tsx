'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedData={() => setIsLoaded(true)}
                >
                    <source src="/videos/hero-safari.mp4" type="video/mp4" />
                </video>

                {/* Fallback Image */}
                <Image
                    src="/images/hero/hero-fallback.svg"
                    alt="African Safari"
                    fill
                    className={`object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-0 md:opacity-0' : 'opacity-100'}`}
                    priority
                />

                {/* Gradient Overlay */}
                <div className="hero__overlay absolute inset-0" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Eyebrow */}
                    <p className="hero__eyebrow text-label mb-4 text-white uppercase tracking-[0.2em]">
                        Your Next Adventure
                    </p>

                    {/* Main Headline */}
                    <h1 className="hero__title font-display text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        Discover Wild Africa
                    </h1>

                    {/* Subheadline */}
                    <p className="hero__subtitle text-body-lg text-white mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
                        Experience the breathtaking beauty of African wildlife through
                        immersive safari adventures that will leave you with memories
                        to last a lifetime.
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero__actions flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact" className="btn btn--primary btn--lg">
                            Start Your Journey
                        </Link>
                        <Link href="/packages" className="btn btn--ghost btn--lg">
                            View Tours
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="hero__scroll-cue" aria-hidden="true">
                    <span className="hero__scroll-label">Scroll</span>
                    <span className="hero__scroll-line" />
                </div>
            </div>
        </section>
    );
}
