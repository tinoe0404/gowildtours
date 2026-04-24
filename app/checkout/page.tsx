import type { Metadata } from "next";

export const dynamic = "force-static";
import Container from "@/components/ui/Container";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
    title: "Checkout | Go Wild Tours",
    description: "Complete your safari booking request.",
    robots: {
        index: false,
        follow: false,
    }
};

export default function CheckoutPage() {
    return (
        <div className="bg-mist min-h-screen pt-32 pb-24">
            <Container>
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-dark-deep mb-4">
                        Secure Your Safari
                    </h1>
                    <p className="text-warm-gray text-lg max-w-2xl mx-auto">
                        You're just a few steps away from the adventure of a lifetime. Complete the form below to request your booking.
                    </p>
                </div>
                
                {/* Form area */}
                <CheckoutForm />
            </Container>
        </div>
    );
}
