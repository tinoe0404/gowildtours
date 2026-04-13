import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import PageHero from "@/components/ui/PageHero";
import { Star, MapPin } from "lucide-react";

export default async function HotelsPage() {
    const hotels = await prisma.hotel.findMany({
        where: { isPublished: true },
        orderBy: { starRating: "desc" },
    });

    return (
        <main className="bg-[var(--color-mist)] min-h-screen">
            <PageHero 
                title="Our Curated Hotels"
                subtitle="We've handpicked the finest accommodations across Zimbabwe to ensure your safari stay is as comfortable as it is unforgettable."
                image="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1200"
            />
            
            <Section spacing="lg">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {hotels.map((hotel) => (
                            <Card key={hotel.id} className="group overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300">
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={hotel.images?.[0] || "/images/placeholder-hotel.jpg"}
                                        alt={hotel.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-[var(--color-savanna)] shadow-sm">
                                        {Array.from({ length: hotel.starRating }).map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-[var(--color-savanna)]" />
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-1.5 text-[var(--color-savanna)] text-xs font-semibold tracking-wider uppercase mb-2">
                                        <MapPin className="w-3 h-3" />
                                        {hotel.location}
                                    </div>
                                    <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--color-earth)] mb-3 group-hover:text-[var(--color-savanna)] transition-colors">
                                        {hotel.name}
                                    </h3>
                                    <p className="text-[var(--color-dusk)] text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                        {hotel.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {hotel.amenities.slice(0, 3).map((amenity) => (
                                            <span key={amenity} className="text-[10px] uppercase tracking-widest text-[var(--color-dusk)] px-2 py-1 bg-[var(--color-sand)] rounded-md">
                                                {amenity}
                                            </span>
                                        ))}
                                        {hotel.amenities.length > 3 && (
                                            <span className="text-[10px] uppercase tracking-widest text-[var(--color-dusk)]/60 px-2 py-1">
                                                +{hotel.amenities.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-5 border-t border-[var(--color-sand)] mt-auto">
                                        <div>
                                            <span className="text-xs text-[var(--color-dusk)] uppercase tracking-wider block">From</span>
                                            <span className="text-lg font-bold text-[var(--color-savanna)]">${Number(hotel.priceFrom).toLocaleString()}</span>
                                        </div>
                                        <Link href={`/contact?subject=Inquiry for ${hotel.name}`}>
                                            <button className="btn btn--outline btn--sm">
                                                Inquire Now
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
