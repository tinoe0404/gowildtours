"use client";

import Image from "next/image";
import { Trash2, Plus, Minus, Calendar } from "lucide-react";
import { CartItem as CartItemType, useCartStore } from "@/lib/store/cart";

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const updateTravelers = useCartStore((state) => state.updateTravelers);
    const updateDate = useCartStore((state) => state.updateDate);
    const removeItem = useCartStore((state) => state.removeItem);

    return (
        <div className="flex gap-4 py-4 border-b border-border last:border-0 relative group">
            {/* Image */}
            <div className="relative w-[60px] h-[60px] rounded flex-shrink-0 overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0 pr-8">
                <h4 className="font-bold text-dark-deep text-sm truncate" title={item.name}>
                    {item.name}
                </h4>
                <div className="text-xs text-warm-gray mb-2">
                    {item.duration} &middot; ${(item.pricePerPerson * item.travelers).toLocaleString()}
                </div>

                <div className="flex flex-col gap-2 relative z-10">
                    {/* Travelers Stepper */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-warm-gray w-14">Travelers:</span>
                        <div className="flex items-center border border-border rounded-full bg-white overflow-hidden">
                            <button
                                type="button"
                                onClick={() => updateTravelers(item.id, Math.max(1, item.travelers - 1))}
                                className="w-6 h-6 flex items-center justify-center text-warm-gray hover:bg-gray-50 transition-colors"
                            >
                                <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-semibold">{item.travelers}</span>
                            <button
                                type="button"
                                onClick={() => updateTravelers(item.id, Math.min(8, item.travelers + 1))}
                                className="w-6 h-6 flex items-center justify-center text-warm-gray hover:bg-gray-50 transition-colors"
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* Date Input */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-warm-gray w-14 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Date:
                        </span>
                        <input
                            type="date"
                            value={item.date}
                            min={new Date().toISOString().split('T')[0]} // Min today for basic check
                            onChange={(e) => updateDate(item.id, e.target.value)}
                            className="text-xs px-2 py-1 border border-border rounded outline-none focus:border-accent bg-white w-28 cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Remove Button */}
            <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="absolute top-4 right-0 p-1 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                aria-label="Remove item"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
