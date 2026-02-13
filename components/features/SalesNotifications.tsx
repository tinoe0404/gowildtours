"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const notifications = [
    { id: 1, text: "Sarah from London just booked the 'Vic Falls Explorer'", time: "2 mins ago" },
    { id: 2, text: "Michael from Sydney is viewing 'Okavango Delta'", time: "Just now" },
    { id: 3, text: "The 'Hwange Luxury' package is in high demand!", time: "5 mins ago" },
];

export default function SalesNotifications() {
    const [current, setCurrent] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            // Show random notification every 10-20 seconds
            const random = Math.floor(Math.random() * notifications.length);
            setCurrent(random);

            // Hide after 5 seconds
            setTimeout(() => setCurrent(null), 5000);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {current !== null && (
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    className="fixed bottom-4 left-4 z-40 bg-white/90 backdrop-blur border border-beige/50 p-4 rounded-lg shadow-xl max-w-sm flex items-center gap-4"
                >
                    <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-xl">🌍</span>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-dark-deep">{notifications[current].text}</p>
                        <p className="text-xs text-warm-gray">{notifications[current].time}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
