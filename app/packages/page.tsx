import { Metadata } from "next";
import Container from "@/components/ui/Container";
import PackagesClient from "./PackagesClient";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
    title: "Safari Packages | Go Wild Tours",
    description:
        "Explore our wide range of safari packages in Zimbabwe. From budget adventures to luxury honeymoons, find your perfect African experience.",
};

export default function PackagesPage() {
    return (
        <main>
            <PageHero 
                title="Safari Packages"
                subtitle="Curated adventures across Zimbabwe's most spectacular landscapes. Find the perfect journey for your style and budget."
                image="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80"
            />

            {/* ── Content ── */}
            <section className="section bg-[var(--color-mist)] min-h-screen">
                <Container>
                    <PackagesClient />
                </Container>
            </section>
        </main>
    );
}
