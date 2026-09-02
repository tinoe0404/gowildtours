import { notFound } from "next/navigation";
import { packages } from "@/lib/packages-data";

export const dynamic = "force-static";

export async function generateStaticParams() {
    return packages.map((pkg) => ({ slug: pkg.slug }));
}
import { Metadata } from "next";
import Image from "next/image";
import { MapPin, Clock, Users, Check, X } from "lucide-react";
import ClientPrint from "./ClientPrint";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const pkg = packages.find(p => p.slug === slug);

    if (!pkg) {
        return {
            title: "Brochure Not Found",
        };
    }

    return {
        title: `${pkg.title} - Brochure | Go Wild Tours`,
    };
}

export default async function BrochurePage({ params }: Props) {
    const { slug } = await params;
    const pkg = packages.find(p => p.slug === slug);

    if (!pkg) {
        notFound();
    }

    // Extract values safely
    const durationDays = typeof pkg.duration === "string"
        ? (parseInt(pkg.duration.match(/(\d+)/)?.[1] || "0"))
        : (pkg.duration as any)?.days;

    const categories = typeof pkg.category === "string" ? [pkg.category] : (pkg.category as any) || [];
    const highlights = (pkg as any).highlights || [];
    const inclusions = (pkg as any).inclusions || [];
    const mainImage = (pkg as any).image || (pkg.images && pkg.images.length > 0 ? pkg.images[0] : "/images/safari/lioness-rain.jpg");
    const longDescription = pkg.description || (pkg as any).longDescription || "";

    return (
        <div className="bg-white min-h-screen text-dark-deep print:bg-white">
            <ClientPrint />

            {/* Header / Cover */}
            <div className="relative h-[400px] w-full print:h-[500px]">
                <Image
                    src={mainImage}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 print:bg-transparent" />
                <div className="absolute bottom-12 left-12 right-12 text-white print:text-dark-deep print:bottom-auto print:top-12 print:left-12">
                    <div className="hidden print:block mb-4">
                        <h1 className="text-4xl font-bold text-accent uppercase tracking-widest">Go Wild Tours</h1>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-4">
                        {categories.map((cat: string) => (
                            <span key={cat} className="px-3 py-1 bg-accent text-dark-deep text-xs font-bold uppercase rounded-full print:border print:border-dark-deep print:bg-transparent">
                                {cat}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-5xl font-display font-bold mb-4 print:text-6xl">{pkg.title}</h1>
                    <div className="flex gap-6 text-lg font-medium print:text-xl">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-accent print:text-dark-deep" />
                            <span>{durationDays} Days</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-accent print:text-dark-deep" />
                            <span>1-12 Guests</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[210mm] mx-auto p-12 space-y-12">
                {/* Overview */}
                <section>
                    <h2 className="text-3xl font-display font-bold mb-4 text-accent">Overview</h2>
                    <p className="text-lg leading-relaxed text-warm-gray whitespace-pre-line">
                        {longDescription}
                    </p>
                </section>

                {/* Highlights */}
                <section className="bg-beige/10 p-8 rounded-xl print:border print:border-beige">
                    <h2 className="text-2xl font-display font-bold mb-4 text-accent">Highlights</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {highlights.map((h: string, i: number) => (
                            <div key={i} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-accent shrink-0 mt-1" />
                                <span>{h}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Itinerary */}
                <section>
                    <h2 className="text-3xl font-display font-bold mb-6 text-accent">Itinerary</h2>
                    <div className="border-l-2 border-accent/20 ml-3 space-y-8">
                        {Array.from({ length: durationDays || 1 }).map((_, i) => (
                            <div key={i} className="relative pl-8">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
                                <h3 className="text-xl font-bold mb-2">Day {i + 1}: {i === 0 ? "Arrival" : i === (durationDays || 1) - 1 ? "Departure" : "Exploration"}</h3>
                                <p className="text-warm-gray">
                                    {i === 0
                                        ? "Arrive and settle in to your accommodation. Welcome dinner."
                                        : i === (durationDays || 1) - 1
                                            ? "Morning breakfast and transfer to airport."
                                            : "Full day of scheduled activities and wildlife viewing."}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inclusions / Exclusions */}
                <section className="grid grid-cols-2 gap-12 pt-8 border-t border-gray-200">
                    <div>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-600" /> Included
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {inclusions.map((item: string, i: number) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <X className="w-5 h-5 text-red-500" /> Not Included
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>International Flights</li>
                            <li>Visas</li>
                            <li>Travel Insurance</li>
                            <li>Personal Expenses</li>
                        </ul>
                    </div>
                </section>

                {/* Footer / Contact */}
                <div className="mt-16 pt-8 border-t-2 border-accent text-center">
                    <h3 className="text-2xl font-display font-bold mb-2">Ready to Book?</h3>
                    <p className="text-warm-gray mb-4">Contact us to secure your spot or customize this trip.</p>
                    <div className="text-xl font-bold text-accent">
                        www.gowildtours.com
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                        info@gowildtourszim.com | +263 71 670 7132
                    </p>
                </div>
            </div>
        </div>
    );
}
