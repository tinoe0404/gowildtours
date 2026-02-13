"use client";

import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/cn";
import { Heart } from "lucide-react";

interface WishlistButtonProps {
    item: {
        id: string;
        type: "package" | "hotel" | "activity";
        title: string;
        image?: string;
        price?: string;
    };
    className?: string;
}

export default function WishlistButton({ item, className }: WishlistButtonProps) {
    const { isInWishlist, addItem, removeItem } = useWishlist();
    const isSaved = isInWishlist(item.id);

    const toggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSaved) {
            removeItem(item.id);
        } else {
            addItem(item);
        }
    };

    return (
        <button
            onClick={toggle}
            className={cn(
                "p-2 rounded-full transition-all duration-300 group",
                isSaved
                    ? "bg-red-50 text-red-500 hover:bg-red-100"
                    : "bg-white/80 backdrop-blur text-dark-deep hover:bg-white hover:scale-110",
                className
            )}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart className={cn("h-5 w-5 transition-colors", isSaved ? "fill-current" : "group-hover:text-red-500")} />
        </button>
    );
}
