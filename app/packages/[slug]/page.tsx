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
        title: `${pkg.title} | Safari Packages`,
        description: pkg.description.substring(0, 160),
        alternates: {
            canonical: `/packages/${pkg.slug}`,
        },
    };
}

export async function generateStaticParams() {
    const pkgs = await prisma.package.findMany({
        select: { slug: true },
    });
    return pkgs.map((pkg) => ({
        slug: pkg.slug,
    }));
}

export default async function PackageDetailPage({ params }: Props) {
    const { slug } = await params;
    const pkg = await prisma.package.findUnique({
        where: { slug },
    });

    if (!pkg) {
        notFound();
    }

    // Convert Decimal to number for the client component
    const formattedPkg = {
        ...pkg,
        price: Number(pkg.price),
        ...(pkg.itinerary as any),
    };

    return <PackageDetailClient pkg={formattedPkg} />;
}
