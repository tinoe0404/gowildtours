import { Metadata } from "next";

export const dynamic = "force-static";
import { notFound } from "next/navigation";
import { packages } from "@/lib/packages-data";
import PackageDetailClient from "./PackageDetailClient";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const pkg = packages.find(p => p.slug === slug);

    if (!pkg) {
        return {
            title: "Package Not Found | Go Wild Tours",
        };
    }

    return {
        title: `${pkg.title} | Our Safaris`,
        description: (pkg.description || pkg.shortDescription || pkg.longDescription || "").substring(0, 160),
        alternates: {
            canonical: `/safaris/${pkg.slug}`,
        },
    };
}

export async function generateStaticParams() {
    return packages.map((pkg) => ({
        slug: pkg.slug,
    }));
}

export default async function PackageDetailPage({ params }: Props) {
    const { slug } = await params;
    const pkg = packages.find(p => p.slug === slug);

    if (!pkg) {
        notFound();
    }

    // Convert Decimal to number and coerce nulls for the client component
    const formattedPkg = {
        ...pkg,
        price: Number(pkg.price),
        category: pkg.category || "Safari",
        itinerary: pkg.itinerary,
        difficulty: pkg.difficulty || "Moderate",
        minGuests: pkg.minGuests ?? undefined,
        maxGuests: pkg.maxGuests ?? undefined,
    };

    return <PackageDetailClient pkg={formattedPkg} />;
}
