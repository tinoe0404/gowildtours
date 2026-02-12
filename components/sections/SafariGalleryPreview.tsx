"use client";

import Link from "next/link";
import { galleryImages } from "@/lib/gallery-data";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const featuredImages = galleryImages.filter((img) => img.featured).slice(0, 8);

export default function SafariGalleryPreview() {
    return (
        <Section id="gallery" spacing="lg" className="bg-cream">
            <Container>
                <SectionHeading
                    title="Safari Gallery"
                    subtitle="Glimpses of Africa's untamed beauty — captured by our guides and guests across Zimbabwe's most iconic destinations."
                />

                <GalleryGrid images={featuredImages} columns={3} />

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
