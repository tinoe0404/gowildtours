"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ChevronDown, ChevronUp, ShieldCheck, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cart";
import Button from "@/components/ui/Button";
import OrderSummary from "./OrderSummary";

const checkoutSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    confirmEmail: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone number is required"),
    nationality: z.string().min(2, "Nationality/Country is required"),
    specialRequests: z.string().optional(),
    hearAboutUs: z.string().optional(),
    termsAccepted: z.literal(true, {
        errorMap: () => ({ message: "You must agree to the booking terms" })
    }),
    policyAccepted: z.literal(true, {
        errorMap: () => ({ message: "You must agree to the cancellation policy" })
    })
}).refine((data) => data.email === data.confirmEmail, {
    message: "Email addresses must match",
    path: ["confirmEmail"]
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
    const router = useRouter();
    const { items, subtotal, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema)
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Redirect if cart is empty on mount (only if not currently submitted/submitting)
    useEffect(() => {
        if (mounted && items.length === 0 && !isSubmitted && !isProcessing) {
            toast.error("Your cart is empty", { description: "Please select a safari first." });
            router.push("/safaris");
        }
    }, [mounted, items.length, router, isSubmitted, isProcessing]);

    const onSubmit = useCallback(async (data: CheckoutFormData) => {
        setIsProcessing(true);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName: data.name,
                    customerEmail: data.email,
                    customerPhone: data.phone,
                    nationality: data.nationality,
                    specialRequests: data.specialRequests,
                    hearAboutUs: data.hearAboutUs,
                    items: items,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSubmitted(true);
                clearCart();
                toast.success("Booking request submitted!", {
                    description: "Our team will contact you shortly to confirm details.",
                });
                router.push(`/booking/success`);
            } else {
                toast.error("Booking request failed", {
                    description: result.error || "Please try again or contact support.",
                });
            }
        } catch (error) {
            console.error("Booking submission error:", error);
            toast.error("Submission failed", {
                description: "An unexpected error occurred. Please try again.",
            });
        } finally {
            setIsProcessing(false);
        }
    }, [items, clearCart, router]);

    // ── Early return AFTER all hooks ──
    if (!mounted || items.length === 0) return null;

    const total = subtotal();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Mobile Order Summary Toggle */}
            <div className="lg:hidden w-full bg-white rounded-[var(--radius-card)] shadow-md border border-border overflow-hidden">
                <button 
                    onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
                    className="w-full p-4 flex items-center justify-between font-bold text-dark-deep bg-mist cursor-pointer"
                >
                    <span>{mobileSummaryOpen ? "Hide" : "Show"} Order Summary</span>
                    <div className="flex items-center gap-2">
                        <span className="text-accent">${total.toLocaleString()}</span>
                        {mobileSummaryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                </button>
                {mobileSummaryOpen && (
                    <div className="p-4 border-t border-border">
                        <OrderSummary />
                    </div>
                )}
            </div>

            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-6 md:p-8 rounded-[var(--radius-card)] shadow-lg border border-border">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    
                        {/* Section 1: Your Details */}
                        <section className="relative">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'rgba(44, 26, 14, 0.15)' }}>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold font-accent text-sm shadow-md" style={{ background: 'linear-gradient(135deg, var(--color-savanna), var(--color-sunset))' }}>1</div>
                                <h2 className="font-display text-2xl font-bold text-dark-deep">Your Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Full Name *</label>
                                    <input 
                                        {...register("name")} 
                                        disabled={isProcessing}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-savanna focus:ring-2 focus:ring-savanna/20 transition-all shadow-sm disabled:opacity-60"
                                        placeholder="Jane Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Email Address *</label>
                                    <input 
                                        type="email"
                                        {...register("email")} 
                                        disabled={isProcessing}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-savanna focus:ring-2 focus:ring-savanna/20 transition-all shadow-sm disabled:opacity-60"
                                        placeholder="jane@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Confirm Email Address *</label>
                                    <input 
                                        type="email"
                                        {...register("confirmEmail")} 
                                        disabled={isProcessing}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-savanna focus:ring-2 focus:ring-savanna/20 transition-all shadow-sm disabled:opacity-60"
                                        placeholder="jane@example.com"
                                    />
                                    {errors.confirmEmail && <p className="text-red-500 text-xs mt-1">{errors.confirmEmail.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Phone Number *</label>
                                    <input 
                                        type="tel"
                                        {...register("phone")} 
                                        disabled={isProcessing}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-savanna focus:ring-2 focus:ring-savanna/20 transition-all shadow-sm disabled:opacity-60"
                                        placeholder="+1 234 567 8900"
                                    />
                                    <p className="text-[10px] text-warm-gray mt-1">Include country code if international</p>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Nationality / Country</label>
                                    <input 
                                        {...register("nationality")} 
                                        disabled={isProcessing}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-savanna focus:ring-2 focus:ring-savanna/20 transition-all shadow-sm disabled:opacity-60"
                                        placeholder="United States"
                                    />
                                    {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>}
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Trip Notes */}
                        <section className="relative">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'rgba(44, 26, 14, 0.15)' }}>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold font-accent text-sm shadow-md" style={{ background: 'linear-gradient(135deg, var(--color-savanna), var(--color-sunset))' }}>2</div>
                                <h2 className="font-display text-2xl font-bold text-dark-deep">Trip Notes</h2>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Special Requests / Dietary Requirements</label>
                                    <textarea 
                                        {...register("specialRequests")} 
                                        rows={4}
                                        disabled={isProcessing}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-savanna focus:ring-2 focus:ring-savanna/20 transition-all shadow-sm resize-none disabled:opacity-60"
                                        placeholder="Any allergies, mobility issues, or special celebrations?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">How did you hear about us?</label>
                                    <select 
                                        {...register("hearAboutUs")}
                                        disabled={isProcessing}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-savanna focus:ring-2 focus:ring-savanna/20 transition-all shadow-sm appearance-none cursor-pointer disabled:opacity-60"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="Google">Google / Search Engine</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Facebook">Facebook</option>
                                        <option value="Referral">Friend / Family Referral</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Booking Terms */}
                        <section className="relative">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'rgba(44, 26, 14, 0.15)' }}>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold font-accent text-sm shadow-md" style={{ background: 'linear-gradient(135deg, var(--color-savanna), var(--color-sunset))' }}>3</div>
                                <h2 className="font-display text-2xl font-bold text-dark-deep">Booking Terms</h2>
                            </div>
                            <div className="space-y-4">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="mt-1">
                                        <input type="checkbox" {...register("termsAccepted")} disabled={isProcessing} className="w-5 h-5 accent-accent rounded" />
                                    </div>
                                    <span className="text-sm text-warm-gray leading-relaxed group-hover:text-dark-deep transition-colors">
                                        I understand that my booking request will be reviewed by the team, and I will be contacted regarding payment details to secure the booking.
                                    </span>
                                </label>
                                {errors.termsAccepted && <p className="text-red-500 text-xs ml-8">{errors.termsAccepted.message}</p>}

                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="mt-1">
                                        <input type="checkbox" {...register("policyAccepted")} disabled={isProcessing} className="w-5 h-5 accent-accent rounded" />
                                    </div>
                                    <span className="text-sm text-warm-gray leading-relaxed group-hover:text-dark-deep transition-colors">
                                        I agree to the <a href="/about#terms" target="_blank" className="text-accent hover:underline">cancellation policy</a> and terms of service.
                                    </span>
                                </label>
                                {errors.policyAccepted && <p className="text-red-500 text-xs ml-8">{errors.policyAccepted.message}</p>}
                            </div>
                        </section>

                        <Button 
                            type="submit" 
                            disabled={isProcessing}
                            className="w-full h-14 text-lg tracking-wide uppercase font-bold mt-4"
                        >
                            {isProcessing ? (
                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                            ) : (
                                <><ShieldCheck className="w-5 h-5 mr-2" /> Submit Booking Request</>
                            )}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Right: Order Summary Desktop */}
            <div className="hidden lg:block">
                <OrderSummary />
            </div>
        </div>
    );
}
