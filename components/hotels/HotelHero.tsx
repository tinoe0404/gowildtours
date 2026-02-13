'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface HotelHeroProps {
    title: string;
    subtitle: string;
    backgroundImage: string;
}

export const HotelHero: React.FC<HotelHeroProps> = ({ title, subtitle, backgroundImage }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <section className="relative h-[450px] overflow-hidden flex items-center">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* Content */}
            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="max-w-3xl">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-white/80 text-sm mb-6">
                        <Link href="/" className="hover:text-white transition-colors flex items-center">
                            <Home className="w-4 h-4 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white font-medium">Hotels</span>
                    </nav>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/90 font-medium"
                    >
                        {subtitle}
                    </motion.p>
                </div>
            </div>
        </section>
    );
};
