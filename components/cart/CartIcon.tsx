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
            className="relative flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 group"
            aria-label="Open cart"
        >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-colors shadow-sm" style={{ color: 'inherit' }}>
                <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
            </div>
            
            {mounted && totalItems > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 flex items-center justify-center w-5 h-5 text-white text-[10px] font-bold rounded-full shadow-md animate-in zoom-in" style={{ background: 'linear-gradient(135deg, var(--color-sunset), var(--color-savanna-deep))' }}>
                    {totalItems}
                </span>
            )}
        </button>
    );
}
