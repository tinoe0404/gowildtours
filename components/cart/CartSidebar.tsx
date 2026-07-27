"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tent } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import CartItem from "./CartItem";
import Button from "@/components/ui/Button";

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
    const [mounted, setMounted] = useState(false);
    const { items, subtotal } = useCartStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-dark-deep/60 backdrop-blur-sm z-[9998]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[420px] bg-white shadow-2xl z-[9999] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border bg-mist">
                            <div>
                                <h3 className="font-display font-bold text-xl text-gray-900 flex items-center gap-2">
                                    <Tent className="w-5 h-5 text-accent" />
                                    Your Safari Cart
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {items.length} {items.length === 1 ? 'item' : 'items'}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                aria-label="Close cart"
                            >
                                <X className="w-5 h-5 text-gray-900" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide bg-white">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-24 h-24 bg-mist rounded-full flex items-center justify-center text-accent/20 mb-2">
                                        <Tent className="w-12 h-12" />
                                    </div>
                                    <h4 className="font-display font-bold text-2xl text-gray-900">Your cart is empty</h4>
                                    <p className="text-gray-500 text-sm max-w-[240px]">
                                        Ready to start your adventure? Explore our breathtaking safari packages.
                                    </p>
                                    <Button
                                        onClick={onClose}
                                        className="mt-6 relative overflow-hidden"
                                    >
                                        <Link href="/safaris" className="absolute inset-0 z-10" onClick={onClose} />
                                        <span className="relative z-0 pointer-events-none">Explore Safaris</span>
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {items.map((item) => (
                                        <CartItem key={item.id} item={item} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-border bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-gray-500 font-medium">Subtotal</span>
                                    <span className="font-display font-bold text-2xl text-gray-900">${subtotal().toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-gray-500/70 mb-6 text-center">
                                    *Final price varies by season and group size. A 30% deposit is required upon confirmation.
                                </p>
                                
                                <div className="space-y-3">
                                    <Link href="/checkout" onClick={onClose} className="block">
                                        <Button className="w-full h-12 text-sm uppercase tracking-wider font-bold">
                                            Proceed to Checkout
                                        </Button>
                                    </Link>
                                    <button 
                                        onClick={onClose}
                                        className="w-full py-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                                    >
                                        Continue Browsing
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
