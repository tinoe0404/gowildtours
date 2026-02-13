"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface ComparisonItem {
    id: string;
    type: "package" | "hotel" | "activity";
    title: string;
    image?: string;
    features: Record<string, string | number | boolean>;
}

interface ComparisonContextType {
    items: ComparisonItem[];
    addItem: (item: ComparisonItem) => void;
    removeItem: (id: string) => void;
    clear: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<ComparisonItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = (item: ComparisonItem) => {
        if (items.some((i) => i.id === item.id)) return;
        if (items.length >= 3) {
            // Replace first if full or show error? For now, limit to 3.
            return;
        }
        setItems((prev) => [...prev, item]);
        setIsOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const clear = () => setItems([]);

    return (
        <ComparisonContext.Provider value={{ items, addItem, removeItem, clear, isOpen, setIsOpen }}>
            {children}
        </ComparisonContext.Provider>
    );
}

export function useComparison() {
    const context = useContext(ComparisonContext);
    if (context === undefined) {
        throw new Error("useComparison must be used within a ComparisonProvider");
    }
    return context;
}
