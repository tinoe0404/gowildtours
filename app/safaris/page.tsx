import { Metadata } from "next";
import Container from "@/components/ui/Container";
import PackagesClient from "./PackagesClient";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
    title: "Our Safaris | Go Wild Tours",
    description:
        "Handcrafted wilderness experiences across Zimbabwe's most iconic landscapes — from Hwange's elephant herds to the thundering Victoria Falls.",
};

export default function SafarisPage() {
    return (
        <main>
            <PageHero 
                title="Our Safaris"
                subtitle="Handcrafted wilderness experiences across Zimbabwe's most iconic landscapes — from Hwange's elephant herds to the thundering Victoria Falls."
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
