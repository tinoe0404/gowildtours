import { Metadata } from "next";
import { notFound } from "next/navigation";
import { packages } from "@/lib/packages-data";
import PackageDetailClient from "./PackageDetailClient";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const pkg = packages.find((p) => p.slug === slug);

    if (!pkg) {
        return {
            title: "Package Not Found | Go Wild Tours",
        };
    }

    return {
        title: `${pkg.title} | Safari Packages`,
        description: pkg.shortDescription,
        alternates: {
            canonical: `/packages/${pkg.slug}`,
        },
        openGraph: {
            title: `${pkg.title} | Go Wild Tours`,
            description: pkg.shortDescription,
            url: `/packages/${pkg.slug}`,
            type: "website",
            images: [
                {
                    url: `/packages/${pkg.slug}/opengraph-image`, // Explicitly pointing to the generated image if needed, though Next.js auto-discovery works too.
                    width: 1200,
                    height: 630,
                    alt: pkg.title,
                },
            ],
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
    const pkg = packages.find((p) => p.slug === slug);

    if (!pkg) {
        notFound();
    }

    return <PackageDetailClient pkg={pkg} />;
}
