import { Metadata } from "next";

export const dynamic = "force-static";
import Container from "@/components/ui/Container";
import PackagesClient from "./PackagesClient";
import { packages } from "@/lib/packages-data";

export const metadata: Metadata = {
    title: "Our Safaris | Go Wild Tours",
    description:
        "Handcrafted wilderness experiences across the iconic landscapes of Zimbabwe, Botswana, Namibia, and Zambia.",
};

export default function SafarisPage() {
    return (
        <main>
            <section className="pt-40 pb-16 bg-mist relative overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(200,135,58,0.05) 0%, rgba(255,255,255,1) 100%)' }}>
                <div className="absolute top-0 left-0 w-full h-[4px]" style={{ background: 'linear-gradient(90deg, #C8873A, #E5A95A, #C8873A)' }} />
                <Container className="relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider mb-4 border border-accent/20">Explore</span>
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-dark-deep mb-6">Our Safaris</h1>
                    <p className="text-xl text-warm-gray max-w-2xl mx-auto leading-relaxed">Handcrafted wilderness experiences across the iconic landscapes of Zimbabwe, Botswana, Namibia, and Zambia.</p>
                </Container>
            </section>

            {/* ── Content ── */}
            <section className="section bg-[var(--color-mist)] min-h-screen">
                <Container>
                    <PackagesClient initialPackages={packages} />
                </Container>
            </section>
        </main>
    );
}
