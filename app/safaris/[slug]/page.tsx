import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import PackageDetailClient from "./PackageDetailClient";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const pkg = await prisma.package.findUnique({
        where: { slug },
    });

    if (!pkg) {
        return {
            title: "Package Not Found | Go Wild Tours",
        };
    }

    return {
        title: `${pkg.title} | Our Safaris`,
        description: pkg.description.substring(0, 160),
        alternates: {
            canonical: `/safaris/${pkg.slug}`,
        },
    };
}

export async function generateStaticParams() {
    try {
        const pkgs = await prisma.package.findMany({
            select: { slug: true },
        });
        return pkgs.map((pkg) => ({
            slug: pkg.slug,
        }));
    } catch (error) {
        console.error("Failed to generate static params for safaris:", (error as Error).message);
        return [];
    }
}

export default async function PackageDetailPage({ params }: Props) {
    const { slug } = await params;
    const pkg = await prisma.package.findUnique({
        where: { slug },
    });

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
