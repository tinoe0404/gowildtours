"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cart";
import Button from "@/components/ui/Button";
import OrderSummary from "./OrderSummary";
import { createBooking } from "@/app/actions/createBooking";

const checkoutSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone number is required"),
    nationality: z.string().min(2, "Nationality/Country is required"),
    specialRequests: z.string().optional(),
    hearAboutUs: z.string().optional(),
    termsAccepted: z.literal(true, {
        errorMap: () => ({ message: "You must accept the booking terms" })
    }),
    policyAccepted: z.literal(true, {
        errorMap: () => ({ message: "You must agree to the cancellation policy" })
    })
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
    const router = useRouter();
    const { items, subtotal, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema)
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Redirect if cart is empty on mount
    useEffect(() => {
        if (mounted && items.length === 0) {
            toast.error("Your cart is empty", { description: "Please select a safari first." });
            router.push("/safaris");
        }
    }, [mounted, items.length, router]);

    if (!mounted || items.length === 0) return null;

    const onSubmit = async (data: CheckoutFormData) => {
        setIsSubmitting(true);
        try {
            const result = await createBooking({
                customerName: data.name,
                customerEmail: data.email,
                customerPhone: data.phone,
                nationality: data.nationality,
                specialRequests: data.specialRequests,
                hearAboutUs: data.hearAboutUs,
                items: items,
                subtotal: subtotal()
            });

            if (result.success && result.reference) {
                clearCart();
                router.push(`/booking/${result.reference}`);
            } else {
                toast.error("Booking failed", { 
                    description: result.error || "Something went wrong. Please try again."
                });
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Booking failed", { description: "An unexpected error occurred." });
            setIsSubmitting(false);
        }
    };

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
                        <span className="text-accent">${subtotal().toLocaleString()}</span>
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
            <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-8 rounded-[var(--radius-card)] shadow-lg border border-border">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* Section 1: Your Details */}
                    <section>
                        <h2 className="font-display text-2xl font-bold text-dark-deep mb-6 pb-2 border-b border-border">1. Your Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Full Name *</label>
                                <input 
                                    {...register("name")} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors"
                                    placeholder="Jane Doe"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Email Address *</label>
                                <input 
                                    type="email"
                                    {...register("email")} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors"
                                    placeholder="jane@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Phone Number *</label>
                                <input 
                                    type="tel"
                                    {...register("phone")} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors"
                                    placeholder="+1 234 567 8900"
                                />
                                <p className="text-[10px] text-warm-gray mt-1">Include country code if international</p>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Nationality / Country</label>
                                <input 
                                    {...register("nationality")} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors"
                                    placeholder="United States"
                                />
                                {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>}
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Trip Notes */}
                    <section>
                        <h2 className="font-display text-2xl font-bold text-dark-deep mb-6 pb-2 border-b border-border">2. Trip Notes</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Special Requests / Dietary Requirements</label>
                                <textarea 
                                    {...register("specialRequests")} 
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors resize-none"
                                    placeholder="Any allergies, mobility issues, or special celebrations?"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">How did you hear about us?</label>
                                <select 
                                    {...register("hearAboutUs")}
                                    className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
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
                    <section>
                        <h2 className="font-display text-2xl font-bold text-dark-deep mb-6 pb-2 border-b border-border">3. Booking Terms</h2>
                        <div className="space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="mt-1">
                                    <input type="checkbox" {...register("termsAccepted")} className="w-5 h-5 accent-accent rounded" />
                                </div>
                                <span className="text-sm text-warm-gray leading-relaxed group-hover:text-dark-deep transition-colors">
                                    I understand this is a booking inquiry. A 30% deposit will be required to confirm my reservation after Go Wild Tours confirms availability.
                                </span>
                            </label>
                            {errors.termsAccepted && <p className="text-red-500 text-xs ml-8">{errors.termsAccepted.message}</p>}

                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="mt-1">
                                    <input type="checkbox" {...register("policyAccepted")} className="w-5 h-5 accent-accent rounded" />
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
                        disabled={isSubmitting} 
                        className="w-full h-14 text-lg tracking-wide uppercase font-bold mt-4"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing Request...
                            </>
                        ) : (
                            "Request Booking"
                        )}
                    </Button>
                </form>
            </div>

            {/* Right: Order Summary Desktop */}
            <div className="hidden lg:block">
                <OrderSummary />
            </div>
        </div>
    );
}
