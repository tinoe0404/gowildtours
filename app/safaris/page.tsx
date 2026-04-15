import { Metadata } from "next";
import Container from "@/components/ui/Container";
import PackagesClient from "./PackagesClient";

export const metadata: Metadata = {
    title: "Our Safaris | Go Wild Tours",
    description:
        "Handcrafted wilderness experiences across Zimbabwe's most iconic landscapes — from Hwange's elephant herds to the thundering Victoria Falls.",
};

export default function SafarisPage() {
    return (
        <main>
            <section className="pt-36 pb-8 bg-[var(--color-mist)]">
                <Container>
                    <span className="text-label block mb-3">Explore</span>
                    <h1 className="text-h1 font-display font-bold text-[var(--color-earth)]">Our Safaris</h1>
                    <p className="text-body-lg text-[var(--color-text-muted)] max-w-2xl mt-3">Handcrafted wilderness experiences across Zimbabwe&apos;s most iconic landscapes — from Hwange&apos;s elephant herds to the thundering Victoria Falls.</p>
                </Container>
            </section>

            {/* ── Content ── */}
            <section className="section bg-[var(--color-mist)] min-h-screen">
                <Container>
                    <PackagesClient />
                </Container>
            </section>
        </main>
    );
}
