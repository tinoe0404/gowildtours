import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, className }) => {
    return (
        <div className={`space-y-4 ${className || ''}`}>
            {items.map((item, index) => (
                <details
                    key={index}
                    className="group border border-[var(--color-sand)] rounded-[var(--radius-lg)] bg-white overflow-hidden shadow-sm marker:content-['']"
                >
                    <summary className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--color-mist)] transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                        <span className="font-bold text-[var(--color-earth)] group-hover:text-[var(--color-savanna)] transition-colors">
                            {item.question}
                        </span>
                        <ChevronDown className="w-5 h-5 text-[var(--color-dusk)] transition-transform duration-300 group-open:rotate-180 group-open:text-[var(--color-savanna)]" />
                    </summary>
                    <div className="px-6 pb-6 text-[var(--color-dusk)] text-sm leading-relaxed border-t border-[var(--color-mist)] pt-4 animate-in fade-in duration-300">
                        {item.answer}
                    </div>
                </details>
            ))}
        </div>
    );
};
