"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WishlistItem {
    id: string;
    type: "package" | "hotel" | "activity";
    title: string;
    image?: string;
    price?: string;
}

interface WishlistContextType {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: string) => void;
    isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("gwt_wishlist");
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("gwt_wishlist", JSON.stringify(items));
    }, [items]);

    const addItem = (item: WishlistItem) => {
        if (items.some((i) => i.id === item.id)) return;
        setItems((prev) => [...prev, item]);
        // toast.success("Added to wishlist");
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
        // toast.error("Removed from wishlist");
    };

    const isInWishlist = (id: string) => items.some((item) => item.id === id);

    return (
        <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
