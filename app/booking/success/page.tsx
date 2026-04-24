import Link from "next/link";
import { CheckCircle, Calendar, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const dynamic = "force-static";

export default function BookingSuccessPage() {
    return (
        <main className="min-h-screen bg-[var(--color-mist)] py-32">
            <Container className="max-w-2xl">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    
                    <h1 className="text-3xl font-display font-bold text-dark-deep mb-4">
                        Booking Request Received!
                    </h1>
                    
                    <p className="text-lg text-warm-gray mb-8">
                        Thank you for choosing Go Wild Tours. We have received your booking request and our team will be in touch with you shortly via email with your complete itinerary and next steps.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/safaris" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full">
                                <Calendar className="w-5 h-5 mr-2" />
                                Browse More Safaris
                            </Button>
                        </Link>
                        <Link href="/" className="w-full sm:w-auto">
                            <Button className="w-full">
                                Return Home
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </main>
    );
}
