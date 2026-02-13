"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface BookingFormProps {
    packageTitle?: string;
    className?: string;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    travelers: number;
    date: string;
    message: string;
}

export default function BookingForm({ packageTitle, className }: BookingFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Form Data:", { ...data, package: packageTitle });
        setIsSubmitting(false);
        setIsSuccess(true);
        reset();
    };

    if (isSuccess) {
        return (
            <div className={cn("bg-white p-8 rounded-[var(--radius-card)] text-center shadow-lg", className)}>
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-dark-deep mb-2">Inquiry Sent!</h3>
                <p className="text-warm-gray mb-6">
                    Thank you for your interest in {packageTitle ? `"${packageTitle}"` : "our safaris"}.
                    Our team will be in touch within 24 hours to plan your adventure.
                </p>
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                    Send Another Inquiry
                </Button>
            </div>
        );
    }

    return (
        <div className={cn("bg-white p-6 md:p-8 rounded-[var(--radius-card)] shadow-lg border border-beige/50", className)}>
            <h3 className="font-display text-xl font-bold text-dark-deep mb-1">
                Start Your Journey
            </h3>
            <p className="text-sm text-warm-gray mb-6">
                {packageTitle
                    ? `Inquire about availability for ${packageTitle}`
                    : "Tell us about your dream safari"}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-sm"
                        />
                    </div>
                    {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            type="email"
                            placeholder="john@example.com"
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-sm"
                        />
                    </div>
                    {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
                </div>

                {/* Group Size & Date Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">
                            Travelers
                        </label>
                        <input
                            {...register("travelers", { min: { value: 1, message: "Min 1" } })}
                            type="number"
                            defaultValue={2}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">
                            Preferred Date
                        </label>
                        <input
                            {...register("date")}
                            type="date"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label className="block text-xs font-accent font-semibold text-dark-deep mb-1.5 uppercase">
                        Message/Questions
                    </label>
                    <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-warm-gray" />
                        <textarea
                            {...register("message")}
                            rows={4}
                            placeholder="Tell us about your interests, budget, or any special requirements..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all text-sm resize-none"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Request Booking Info"
                    )}
                </Button>

                <p className="text-xs text-center text-warm-gray mt-3">
                    No credit card required. This is a non-binding inquiry.
                </p>
            </form>
        </div>
    );
}
