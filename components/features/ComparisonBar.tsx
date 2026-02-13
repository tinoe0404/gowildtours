"use client";

import { useComparison } from "@/context/ComparisonContext";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import { X, ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

export default function ComparisonBar() {
    const { items, removeItem, clear, isOpen, setIsOpen } = useComparison();

    if (items.length === 0) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-beige/50 shadow-2xl p-4"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-6 overflow-x-auto pb-2 md:pb-0">
                            <div className="flex items-center gap-2 text-dark-deep font-display font-bold whitespace-nowrap">
                                <ArrowRightLeft className="h-5 w-5 text-accent" />
                                <span>Compare ({items.length}/3)</span>
                            </div>

                            <div className="flex gap-4">
                                {items.map((item) => (
                                    <div key={item.id} className="relative group bg-beige/20 rounded-lg p-2 flex items-center gap-3 min-w-[200px]">
                                        {item.image && (
                                            <div className="relative h-10 w-10 rounded-md overflow-hidden shrink-0">
                                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate text-dark-deep">{item.title}</p>
                                            <p className="text-xs text-warm-gray capitalize">{item.type}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="absolute -top-2 -right-2 bg-white rounded-full p-1 border border-beige/30 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 ml-4 shrink-0">
                            <button onClick={clear} className="text-sm text-warm-gray hover:text-dark-deep underline">
                                Clear All
                            </button>
                            <Link href="/compare">
                                <Button variant="primary" size="sm" disabled={items.length < 2}>
                                    Compare Now
                                </Button>
                            </Link>
                            <button onClick={() => setIsOpen(false)} className="md:hidden">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
