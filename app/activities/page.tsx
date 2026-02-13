import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Clock, MapPin, ArrowRight, Zap } from "lucide-react";

export default async function ActivitiesPage() {
    const activities = await prisma.activity.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="pt-24 min-h-screen bg-light">
            <Section spacing="lg">
                <Container>
                    <SectionHeading
                        title="Adventure Activities"
                        subtitle="From thundering falls to high-speed river runs, Zimbabwe offers adrenaline-pumping experiences for every kind of adventurer."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {activities.map((activity) => (
                            <Card key={activity.id} className="group overflow-hidden flex flex-col h-full bg-white shadow-sm hover:shadow-md transition-all duration-500 rounded-2xl">
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={activity.images?.[0] || "/images/placeholder-activity.jpg"}
                                        alt={activity.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-4 left-4 flex gap-1 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full text-dark-deep font-accent text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                        {activity.difficulty || "All Levels"}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-7 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-1.5 text-primary font-accent text-xs font-semibold tracking-wider uppercase">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {activity.location}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-warm-gray font-accent text-xs">
                                            <Clock className="w-3.5 h-3.5" />
                                            {activity.duration}
                                        </div>
                                    </div>

                                    <h3 className="font-display text-2xl font-bold text-dark-deep mb-3 group-hover:text-primary transition-colors">
                                        {activity.name}
                                    </h3>
                                    <p className="text-warm-gray text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                        {activity.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-beige mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-warm-gray uppercase tracking-wider">Per Person</span>
                                            <span className="text-xl font-accent font-bold text-dark-deep">${Number(activity.price).toLocaleString()}</span>
                                        </div>
                                        <Link href={`/contact?subject=Inquiry for ${activity.name}`}>
                                            <Button variant="primary" size="sm" className="shadow-sm">
                                                Book Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Section>
        </main>
    );
}
