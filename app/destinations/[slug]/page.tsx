import { Metadata } from "next";

export const dynamic = "force-static";
import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";
import DestinationDetailClient from "./DestinationDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return {
      title: "Destination Not Found | Go Wild Tours",
    };
  }

  return {
    title: `${destination.name} — ${destination.tagline} | Go Wild Tours`,
    description: destination.description,
    alternates: {
      canonical: `/destinations/${destination.slug}`,
    },
  };
}

export function generateStaticParams() {
  return destinations.map((d) => ({
    slug: d.slug,
  }));
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  return <DestinationDetailClient destination={destination} />;
}
