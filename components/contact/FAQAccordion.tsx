'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, className }) => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    return (
        <div className={cn("space-y-4", className)}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group"
                    >
                        <span className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {item.question}
                        </span>
                        <ChevronDown
                            className={cn(
                                "w-5 h-5 text-gray-400 transition-transform duration-300",
                                openIndex === index && "rotate-180 text-primary-600"
                            )}
                        />
                    </button>
                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                                    {item.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};
