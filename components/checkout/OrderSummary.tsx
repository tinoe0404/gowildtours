"use client";

import { useCartStore } from "@/lib/store/cart";
import { Mail, Phone, Tent, ShieldCheck } from "lucide-react";
import Image from "next/image";

/** Deposit percentage — must match server-side constant */
const DEPOSIT_PERCENTAGE = 0.30;

export default function OrderSummary() {
    const { items, subtotal } = useCartStore();
    const total = subtotal();
    const deposit = Math.round(total * DEPOSIT_PERCENTAGE * 100) / 100;
    const remainingBalance = total - deposit;

    if (items.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-[var(--radius-card)] shadow-lg border border-border relative md:sticky md:top-24 overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
            {/* Premium Gold Accent Bar */}
            <div
                className="absolute top-0 left-0 right-0 h-[4px]"
                style={{ background: 'linear-gradient(90deg, #C8873A, #E5A95A, #C8873A)' }}
            />
            
            <h3 className="font-display text-2xl font-bold text-dark-deep mb-6 mt-2 flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(200,135,58,0.12), rgba(229,169,90,0.08))' }}>
                    <Tent className="w-5 h-5 text-accent" />
                </div>
                Booking Summary
            </h3>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-mist rounded-lg">
                        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-dark-deep text-sm truncate">{item.name}</h4>
                            <div className="text-xs text-warm-gray mt-1">
                                {item.travelers} {item.travelers === 1 ? 'Traveler' : 'Travelers'}
                            </div>
                            <div className="text-xs text-warm-gray">
                                Date: {new Date(item.date).toLocaleDateString()}
                            </div>
                            <div className="font-semibold text-dark-deep text-sm mt-1">
                                ${(item.pricePerPerson * item.travelers).toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-border pt-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-warm-gray font-medium">Subtotal</span>
                    <span className="font-bold text-dark-deep">${total.toLocaleString()}</span>
                </div>
                
                {/* Deposit Highlight */}
                <div className="border rounded-xl p-4 mb-4 relative overflow-hidden" style={{ borderColor: 'rgba(200,135,58,0.3)', background: 'linear-gradient(135deg, rgba(200,135,58,0.08), rgba(200,135,58,0.02))' }}>
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ background: 'var(--color-savanna)' }} />
                    <div className="flex justify-between items-center pl-2">
                        <div>
                            <span className="font-bold text-dark-deep text-sm">Due Today (30%)</span>
                            <p className="text-[11px] text-warm-gray mt-1">Deposit to secure booking</p>
                        </div>
                        <span className="font-display font-bold text-2xl text-accent" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>${deposit.toLocaleString()}</span>
                    </div>
                </div>

                {/* Remaining Balance */}
                <div className="flex justify-between items-center pb-4 border-b border-border">
                    <div>
                        <span className="text-warm-gray font-medium text-sm">Remaining Balance</span>
                        <p className="text-[10px] text-warm-gray mt-0.5">Due before your trip</p>
                    </div>
                    <span className="font-semibold text-dark-deep">${remainingBalance.toLocaleString()}</span>
                </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 bg-green-50 text-green-700 p-3 rounded-lg mb-4 border border-green-100">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <p className="text-[10px] leading-relaxed">
                    Secured by PayPal. Your payment details are never stored on our servers.
                </p>
            </div>

            {/* Contact */}
            <div className="bg-mist p-4 rounded-lg">
                <h4 className="font-bold text-dark-deep text-sm mb-3">Need Assistance?</h4>
                <div className="space-y-2 text-sm text-warm-gray">
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-accent" />
                        <a href="mailto:info@gowildtourszim.com" className="hover:text-accent transition-colors">
                            info@gowildtourszim.com
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-accent" />
                        <a href="tel:+263771234567" className="hover:text-accent transition-colors">
                            +263 77 123 4567
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
