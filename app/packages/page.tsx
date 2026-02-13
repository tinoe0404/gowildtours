import { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PackagesClient from "./PackagesClient";

export const metadata: Metadata = {
    title: "Safari Packages | Go Wild Tours",
    description:
        "Explore our wide range of safari packages in Zimbabwe. From budget adventures to luxury honeymoons, find your perfect African experience.",
};

export default function PackagesPage() {
    return (
        <>
            {/* ── Hero ── */}
            <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80"
                    alt="Safari Jeep in Savannah"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-dark-deep/50" />
                <Container className="relative z-10 text-center">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-4">
                        Safari Packages
                    </h1>
                    <p className="text-cream/90 text-lg max-w-2xl mx-auto">
                        Curated adventures across Zimbabwe&apos;s most spectacular landscapes.
                        Find the perfect journey for your style and budget.
                    </p>
                </Container>
            </section>

            {/* ── Content ── */}
            <section className="bg-light py-12 md:py-20 min-h-screen">
                <Container>
                    <PackagesClient />
                </Container>
            </section>
        </>
    );
}
