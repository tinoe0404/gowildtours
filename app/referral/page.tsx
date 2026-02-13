import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ReferralShare from "@/components/features/ReferralShare";
import { Gift, Users, ArrowRight, Wallet } from "lucide-react";
import Image from "next/image";

export const metadata = {
    title: "Refer a Friend | Go Wild Tours",
    description: "Give $50, Get $50. Invite your friends to Go Wild Tours and earn travel credits for your next adventure.",
};

export default function ReferralPage() {
    // Mock user data - in a real app this would come from auth context
    const user = {
        name: "Alex",
        referralCode: "ALEXWILD24",
        referralLink: "https://gowildtours.com/refer/ALEXWILD24",
        credits: 0,
    };

    return (
        <div className="bg-light min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-dark-deep text-white py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/referral-bg.jpg"
                        alt="Friends on safari"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <Container className="relative z-10 text-center max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1 text-accent text-sm font-bold mb-6 uppercase tracking-wider backdrop-blur-sm">
                        <Gift className="w-4 h-4" /> Referral Program
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
                        Give $50, <span className="text-accent">Get $50</span>
                    </h1>
                    <p className="text-lg text-white/80 mb-8 leading-relaxed">
                        Share the magic of Africa with your friends. They get $50 off their first safari, and you get $50 in travel credits when they book.
                    </p>
                </Container>
            </section>

            {/* How it Works */}
            <section className="py-16 -mt-8">
                <Container>
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-beige/50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Step
                                icon={Users}
                                step="1"
                                title="Invite Friends"
                                description="Share your unique referral link with friends and family via email or social media."
                            />
                            <Step
                                icon={Gift}
                                step="2"
                                title="They Get $50"
                                description="Your friends get a $50 discount code to use on their first booking of 3+ days."
                            />
                            <Step
                                icon={Wallet}
                                step="3"
                                title="You Earn $50"
                                description="Once they complete their trip, $50 is added to your travel wallet automatically."
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Share Section */}
            <section className="pb-20">
                <Container className="max-w-2xl">
                    <ReferralShare referralLink={user.referralLink} />
                </Container>
            </section>
        </div>
    );
}

function Step({ icon: Icon, step, title, description }: { icon: any, step: string, title: string, description: string }) {
    return (
        <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6 relative group">
                <Icon className="w-6 h-6 text-dark-deep" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-dark-deep text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {step}
                </span>
            </div>
            <h3 className="text-xl font-bold text-dark-deep mb-3">{title}</h3>
            <p className="text-warm-gray text-sm leading-relaxed">{description}</p>
        </div>
    );
}
