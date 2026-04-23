"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ChevronDown, ChevronUp, ShieldCheck, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCartStore } from "@/lib/store/cart";
import Button from "@/components/ui/Button";
import OrderSummary from "./OrderSummary";

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

/** Deposit percentage — matches server-side constant */
const DEPOSIT_PERCENTAGE = 0.30;

export default function CheckoutForm() {
    const router = useRouter();
    const { items, subtotal, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

    // Two-step flow: form validation → PayPal payment
    const [formValidated, setFormValidated] = useState(false);
    const [formData, setFormData] = useState<CheckoutFormData | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const { register, handleSubmit, formState: { errors }, trigger } = useForm<CheckoutFormData>({
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

    /**
     * Step 1: Validate the form. If valid, show PayPal buttons.
     */
    const onValidateForm = useCallback((data: CheckoutFormData) => {
        setFormData(data);
        setFormValidated(true);
        toast.success("Details confirmed! Please complete payment below.");
    }, []);

    /**
     * Step 2a: Create the PayPal order (called when PayPal buttons are clicked).
     * Sends cart items to our server, which recalculates the deposit and creates the order.
     */
    const createOrder = useCallback(async (): Promise<string> => {
        const response = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    pricePerPerson: item.pricePerPerson,
                    travelers: item.travelers,
                })),
                customerName: formData!.name,
                customerEmail: formData!.email,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to create order");
        }

        return data.orderId;
    }, [items, formData]);

    /**
     * Step 2b: Capture the payment after user approves in PayPal popup.
     * Sends all booking details + PayPal order ID to our server for processing.
     */
    const onApprove = useCallback(
        async (data: { orderID: string }) => {
            setIsProcessing(true);

            try {
                const response = await fetch("/api/paypal/capture-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        orderId: data.orderID,
                        customerName: formData!.name,
                        customerEmail: formData!.email,
                        customerPhone: formData!.phone,
                        nationality: formData!.nationality,
                        specialRequests: formData!.specialRequests,
                        hearAboutUs: formData!.hearAboutUs,
                        items: items,
                    }),
                });

                const result = await response.json();

                if (result.success) {
                    clearCart();
                    toast.success("Payment successful!", {
                        description: `Deposit of $${result.depositPaid.toLocaleString()} has been received.`,
                    });
                    router.push(`/booking/${result.bookingReference}`);
                } else {
                    toast.error("Payment processing failed", {
                        description: result.error || "Please try again or contact support.",
                    });
                    setIsProcessing(false);
                }
            } catch (error) {
                console.error("Payment capture error:", error);
                toast.error("Payment failed", {
                    description: "An unexpected error occurred. Please try again.",
                });
                setIsProcessing(false);
            }
        },
        [formData, items, clearCart, router]
    );

    // ── Early return AFTER all hooks ──
    if (!mounted || items.length === 0) return null;

    const total = subtotal();
    const depositAmount = Math.round(total * DEPOSIT_PERCENTAGE * 100) / 100;

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

            {/* Left: Form + PayPal */}
            <div className="lg:col-span-2 space-y-8">

                {/* Customer Details Form */}
                <div className="bg-white p-6 md:p-8 rounded-[var(--radius-card)] shadow-lg border border-border">
                    <form onSubmit={handleSubmit(onValidateForm)} className="space-y-8">
                    
                        {/* Section 1: Your Details */}
                        <section>
                            <h2 className="font-display text-2xl font-bold text-dark-deep mb-6 pb-2 border-b border-border">1. Your Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Full Name *</label>
                                    <input 
                                        {...register("name")} 
                                        disabled={formValidated}
                                        className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors disabled:opacity-60"
                                        placeholder="Jane Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Email Address *</label>
                                    <input 
                                        type="email"
                                        {...register("email")} 
                                        disabled={formValidated}
                                        className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors disabled:opacity-60"
                                        placeholder="jane@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Phone Number *</label>
                                    <input 
                                        type="tel"
                                        {...register("phone")} 
                                        disabled={formValidated}
                                        className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors disabled:opacity-60"
                                        placeholder="+1 234 567 8900"
                                    />
                                    <p className="text-[10px] text-warm-gray mt-1">Include country code if international</p>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">Nationality / Country</label>
                                    <input 
                                        {...register("nationality")} 
                                        disabled={formValidated}
                                        className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors disabled:opacity-60"
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
                                        disabled={formValidated}
                                        className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors resize-none disabled:opacity-60"
                                        placeholder="Any allergies, mobility issues, or special celebrations?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">How did you hear about us?</label>
                                    <select 
                                        {...register("hearAboutUs")}
                                        disabled={formValidated}
                                        className="w-full px-4 py-3 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors appearance-none cursor-pointer disabled:opacity-60"
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
                                        <input type="checkbox" {...register("termsAccepted")} disabled={formValidated} className="w-5 h-5 accent-accent rounded" />
                                    </div>
                                    <span className="text-sm text-warm-gray leading-relaxed group-hover:text-dark-deep transition-colors">
                                        I understand that a <strong>30% deposit</strong> (${depositAmount.toLocaleString()}) will be charged now via PayPal to secure my booking. The remaining balance is due before the trip.
                                    </span>
                                </label>
                                {errors.termsAccepted && <p className="text-red-500 text-xs ml-8">{errors.termsAccepted.message}</p>}

                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="mt-1">
                                        <input type="checkbox" {...register("policyAccepted")} disabled={formValidated} className="w-5 h-5 accent-accent rounded" />
                                    </div>
                                    <span className="text-sm text-warm-gray leading-relaxed group-hover:text-dark-deep transition-colors">
                                        I agree to the <a href="/about#terms" target="_blank" className="text-accent hover:underline">cancellation policy</a> and terms of service.
                                    </span>
                                </label>
                                {errors.policyAccepted && <p className="text-red-500 text-xs ml-8">{errors.policyAccepted.message}</p>}
                            </div>
                        </section>

                        {/* Confirm Details Button (shown before PayPal) */}
                        {!formValidated && (
                            <Button 
                                type="submit" 
                                className="w-full h-14 text-lg tracking-wide uppercase font-bold mt-4"
                            >
                                <CreditCard className="w-5 h-5 mr-2" />
                                Continue to Payment
                            </Button>
                        )}

                        {/* Edit Details Button (shown after validation) */}
                        {formValidated && (
                            <button
                                type="button"
                                onClick={() => setFormValidated(false)}
                                className="text-sm text-accent hover:underline font-medium"
                            >
                                ← Edit my details
                            </button>
                        )}
                    </form>
                </div>

                {/* PayPal Payment Section (shown after form validation) */}
                {formValidated && (
                    <div className="bg-white p-6 md:p-8 rounded-[var(--radius-card)] shadow-lg border border-border">
                        <h2 className="font-display text-2xl font-bold text-dark-deep mb-2 pb-2 border-b border-border flex items-center gap-2">
                            <CreditCard className="w-6 h-6 text-accent" />
                            4. Pay Deposit
                        </h2>
                        <p className="text-warm-gray text-sm mb-6">
                            You will be charged <strong className="text-dark-deep">${depositAmount.toLocaleString()}</strong> (30% deposit). 
                            The remaining <strong className="text-dark-deep">${(total - depositAmount).toLocaleString()}</strong> is due before your trip.
                        </p>

                        {isProcessing ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                <Loader2 className="w-10 h-10 animate-spin text-accent" />
                                <p className="text-warm-gray font-medium">Processing your payment...</p>
                                <p className="text-xs text-warm-gray">Please do not close this page.</p>
                            </div>
                        ) : (
                            <PayPalScriptProvider
                                options={{
                                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
                                    currency: "USD",
                                    intent: "capture",
                                }}
                            >
                                <PayPalButtons
                                    style={{
                                        layout: "vertical",
                                        color: "gold",
                                        shape: "rect",
                                        label: "pay",
                                        tagline: false,
                                    }}
                                    createOrder={async () => {
                                        try {
                                            return await createOrder();
                                        } catch (error) {
                                            toast.error("Failed to initiate payment. Please try again.");
                                            throw error;
                                        }
                                    }}
                                    onApprove={async (data) => {
                                        await onApprove(data);
                                    }}
                                    onError={(err) => {
                                        console.error("PayPal error:", err);
                                        toast.error("PayPal encountered an error. Please try again.");
                                    }}
                                    onCancel={() => {
                                        toast.info("Payment cancelled. You can try again when ready.");
                                    }}
                                />
                            </PayPalScriptProvider>
                        )}

                        {/* Security Notice */}
                        <div className="mt-6 flex items-center gap-3 bg-green-50 text-green-800 p-4 rounded-lg border border-green-200">
                            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                            <p className="text-xs leading-relaxed">
                                Your payment is securely processed by PayPal. We never store your card details. 
                                All transactions are encrypted and protected by PayPal&apos;s buyer protection program.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Right: Order Summary Desktop */}
            <div className="hidden lg:block">
                <OrderSummary />
            </div>
        </div>
    );
}
