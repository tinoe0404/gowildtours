"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

interface CartIconProps {
    onClick: () => void;
}

export default function CartIcon({ onClick }: CartIconProps) {
    const [mounted, setMounted] = useState(false);
    const totalItems = useCartStore((state) => state.totalItems());

    // Hydration fix
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <button
            onClick={onClick}
            className="relative p-2 text-inherit hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer"
            aria-label="Open cart"
        >
            <ShoppingBag className="w-6 h-6" />
            
            {mounted && totalItems > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 flex items-center justify-center w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full shadow-md animate-in zoom-in">
                    {totalItems}
                </span>
            )}
        </button>
    );
}
