import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Calendar, Users, MapPin, Tent } from "lucide-react";
import prisma from "@/lib/db";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface BookingPageProps {
    params: Promise<{
        reference: string;
    }>;
}

export default async function BookingConfirmationPage({ params }: BookingPageProps) {
    const { reference } = await params;

    const booking = await prisma.booking.findUnique({
        where: { bookingReference: reference }
    });

    if (!booking) {
        notFound();
    }

    const items = (booking as any).items ? ((booking as any).items as Array<any>) : [];

    return (
        <div className="bg-mist min-h-screen pt-32 pb-24">
            <Container className="max-w-3xl">
                <div className="bg-white rounded-[var(--radius-card)] shadow-xl p-8 md:p-12 text-center relative overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-accent-light"></div>
                    
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>

                    <h1 className="font-display text-3xl md:text-4xl font-bold text-dark-deep mb-4">
                        Booking Request Received!
                    </h1>
                    
                    <p className="text-warm-gray text-lg mb-8 max-w-lg mx-auto">
                        Thank you, {booking.customerName}. Your safari booking request has been sent to our team.
                    </p>

                    <div className="inline-block bg-gray-50 border border-border px-6 py-3 rounded-lg mb-10">
                        <p className="text-xs font-accent font-semibold text-warm-gray uppercase mb-1">Booking Reference</p>
                        <p className="font-mono text-2xl font-bold text-dark-deep tracking-wider">{booking.bookingReference}</p>
                    </div>

                    <div className="text-left bg-mist p-6 rounded-lg mb-10">
                        <h2 className="font-display font-bold text-xl text-dark-deep mb-4 line-clamp-1 gap-2 flex items-center">
                            <Tent className="w-5 h-5 text-accent" />
                            Your Itinerary
                        </h2>
                        
                        <div className="space-y-4">
                            {items.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg flex items-start gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-dark-deep">{item.name}</h3>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <div className="flex items-center gap-2 text-sm text-warm-gray">
                                                <Users className="w-4 h-4 text-accent" />
                                                {item.travelers} Travelers
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-warm-gray">
                                                <Calendar className="w-4 h-4 text-accent" />
                                                {new Date(item.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-left mb-10">
                        <h2 className="font-display font-bold text-xl text-dark-deep mb-6">What happens next?</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-dark-deep">Availability Check</h4>
                                    <p className="text-warm-gray text-sm mt-1">Our team is reviewing your request and checking availability for your dates.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-gray-200 text-warm-gray flex items-center justify-center font-bold flex-shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-dark-deep">Invoice & Deposit</h4>
                                    <p className="text-warm-gray text-sm mt-1">Once confirmed, you'll receive a secure link to pay your 30% deposit.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-gray-200 text-warm-gray flex items-center justify-center font-bold flex-shrink-0">3</div>
                                <div>
                                    <h4 className="font-bold text-dark-deep">Confirmation</h4>
                                    <p className="text-warm-gray text-sm mt-1">After deposit, your safari is locked in. We'll send your detailed itinerary and prep guide!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/safaris" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full">
                                Explore More Safaris
                            </Button>
                        </Link>
                        <Link href="/" className="w-full sm:w-auto">
                            <Button className="w-full">
                                Return to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}
