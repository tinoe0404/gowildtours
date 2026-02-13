import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import prisma from "@/lib/db";

export default async function SafariGalleryPreview() {
    const dbImages = await prisma.galleryImage.findMany({
        take: 8,
        orderBy: { sortOrder: "asc" }
    });

    // Map Prisma models to the type expected by GalleryGrid
    const featuredImages = dbImages.map((img, idx) => ({
        id: idx + 1, // GalleryGrid expects number IDs
        src: img.url,
        alt: img.alt,
        categories: [img.category || "General"] as any,
        caption: img.caption || "",
        location: img.location || undefined,
        featured: true,
        aspectRatio: (img.aspectRatio as any) || "landscape",
    }));

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
