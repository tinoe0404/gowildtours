import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default async function SafariGalleryPreview() {
    const featuredImages = [
        {
            id: 1,
            src: "/images/safari/lioness-rain.jpg",
            alt: "Lioness in the rain",
            categories: ["Wildlife"] as any,
            caption: "A majestic lioness braving the afternoon showers in Hwange.",
            location: "Hwange National Park",
            featured: true,
            aspectRatio: "landscape" as any,
        },
        {
            id: 2,
            src: "/images/safari/elephants-waterhole.jpg",
            alt: "Elephants at a waterhole",
            categories: ["Wildlife"] as any,
            caption: "A family of elephants taking a refreshing drink.",
            location: "Mana Pools",
            featured: true,
            aspectRatio: "portrait" as any,
        },
        {
            id: 3,
            src: "/images/safari/victoria-falls-wide.jpg",
            alt: "Victoria Falls",
            categories: ["Landscape"] as any,
            caption: "The majestic Smoke that Thunders.",
            location: "Victoria Falls",
            featured: true,
            aspectRatio: "landscape" as any,
        }
    ];

    return (
        <Section id="gallery" spacing="lg" className="bg-cream">
            <Container>
                <SectionHeading
                    title="Safari Gallery"
                    subtitle="Glimpses of Africa's untamed beauty — captured by our guides and guests across Zimbabwe's most iconic destinations."
                />

                {featuredImages.length > 0 ? (
                    <GalleryGrid images={featuredImages} columns={3} />
                ) : (
                    <div className="text-center py-12 text-gray-400">
                        <p>Our gallery is currently being updated. Check back soon!</p>
                    </div>
                )}

                <div className="mt-12 md:mt-16 text-center">
                    <Link href="/gallery">
                        <Button variant="outline" size="lg">
                            View Full Gallery
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </Container>
        </Section>
    );
}
