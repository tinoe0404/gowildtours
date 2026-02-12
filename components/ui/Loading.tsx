'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Loading() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-br from-primary-900 via-wild-earth to-black"
        >
            <div className="text-center">
                {/* Animated Logo */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2
                    }}
                >
                    <Image
                        src="/images/logo/go-wild-tours-icon.png"
                        alt="Loading"
                        width={120}
                        height={120}
                        className="mb-6 mx-auto"
                    />
                </motion.div>

                {/* Loading Text */}
                <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-white text-xl font-light tracking-widest font-display"
                >
                    Loading Adventure...
                </motion.p>
            </div>
        </motion.div>
    );
}
