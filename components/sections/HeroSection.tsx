'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
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

                {/* Fallback Image - Visible if video fails or loading */}
                <Image
                    src="/images/hero/hero-fallback.svg"
                    alt="African Safari"
                    fill
                    className={`object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-0 md:opacity-0' : 'opacity-100'}`}
                    priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-hero-gradient" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-4xl mx-auto"
                >
                    {/* Main Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-display"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                    >
                        Discover Wild Africa
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl lg:text-2xl text-primary-50 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Experience the breathtaking beauty of African wildlife through
                        immersive safari adventures that will leave you with memories
                        to last a lifetime.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Start Your Journey
                        </Link>
                        <Link
                            href="/packages"
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105"
                        >
                            View Tours
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-white text-sm flex flex-col items-center cursor-pointer"
                        onClick={() => {
                            document.getElementById('gallery')?.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}
                    >
                        <span className="mb-2">Scroll to explore</span>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
