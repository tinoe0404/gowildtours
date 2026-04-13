import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import { Clock, MapPin } from "lucide-react";

export default async function ActivitiesPage() {
    const activities = await prisma.activity.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="bg-[var(--color-mist)] min-h-screen">
            <PageHero 
                title="Adventure Activities"
                subtitle="From thundering falls to high-speed river runs, Zimbabwe offers adrenaline-pumping experiences for every kind of adventurer."
                image="https://images.unsplash.com/photo-1549480017-d76466a4b7e8?auto=format&fit=crop&q=80&w=1200"
            />
            
            <Section spacing="lg">
                <Container>
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
                                    <div className="absolute bottom-4 left-4 flex gap-1 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full text-[var(--color-earth)] font-bold text-[10px] uppercase tracking-wider shadow-sm">
                                        {activity.difficulty || "All Levels"}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-7 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-1.5 text-[var(--color-savanna)] text-xs font-semibold tracking-wider uppercase">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {activity.location}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[var(--color-dusk)] text-xs">
                                            <Clock className="w-3.5 h-3.5" />
                                            {activity.duration}
                                        </div>
                                    </div>

                                    <h3 className="font-display text-2xl font-bold text-[var(--color-earth)] mb-3 group-hover:text-[var(--color-savanna)] transition-colors">
                                        {activity.name}
                                    </h3>
                                    <p className="text-[var(--color-dusk)] text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                        {activity.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-[var(--color-sand)] mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-[var(--color-dusk)] uppercase tracking-wider">Per Person</span>
                                            <span className="text-xl font-bold text-[var(--color-earth)]">${Number(activity.price).toLocaleString()}</span>
                                        </div>
                                        <Link href={`/contact?subject=Inquiry for ${activity.name}`}>
                                            <button className="btn btn--primary">
                                                Book Now
                                            </button>
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
