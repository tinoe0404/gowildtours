import Link from "next/link";
import Image from "next/image";
import {
  fadeInUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem
} from "@/lib/animations";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SafariGalleryPreview from "@/components/sections/SafariGalleryPreview";
import VideoGallery from "@/components/marketing/VideoGallery";
import InstagramFeed from "@/components/marketing/InstagramFeed";
import Card from "@/components/ui/Card";
import {
  Compass,
  Tent,
  Map,
  TreePine,
  Star,
  ChevronDown,
  Quote,
  ArrowRight
} from "lucide-react";
import prisma from "@/lib/db";
import HomeClient from "@/components/home/HomeClient";

/* ── Icon Map ── */
const iconMap: Record<string, React.ElementType> = {
  Compass,
  Tent,
  Map,
  TreePine,
};

/* ── Image URLs (Unsplash) ── */
const images = {
  hero: "/images/safari/wildebeest.jpg",
  about: "/images/safari/elephants-waterhole.jpg",
  ctaBg: "/images/safari/victoria-falls-wide.jpg",
};

export default async function HomePage() {
  // Fetch Featured Packages
  const rawPackages = await prisma.package.findMany({
    where: { isFeatured: true, isPublished: true },
    take: 3,
  });

  // Serialize Decimal fields to plain numbers for Client Components
  const featuredPackages = rawPackages.map((pkg) => ({
    ...pkg,
    price: Number(pkg.price),
    createdAt: pkg.createdAt.toISOString(),
    updatedAt: pkg.updatedAt.toISOString(),
  }));

  // Fetch Approved Reviews as Testimonials
  const rawReviews = await prisma.review.findMany({
    where: { status: "approved" },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  // Serialize Date fields for Client Components
  const reviews = rawReviews.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
    travelDate: r.travelDate?.toISOString() ?? null,
    approvedAt: r.approvedAt?.toISOString() ?? null,
  }));

  // Default "Why Choose Us" (could eventualy come from SiteSettings)
  const whyChooseUsData = [
    {
      title: "Expert Guides",
      description: "Our certified guides bring decades of experience and deep knowledge of African wildlife.",
      icon: "Compass",
    },
    {
      title: "Luxury Camps",
      description: "Handpicked luxury accommodations that blend comfort with authentic wilderness immersion.",
      icon: "Tent",
    },
    {
      title: "Tailored Itineraries",
      description: "Every safari is customised to your preferences, ensuring a unique and personal adventure.",
      icon: "Map",
    },
    {
      title: "Conservation First",
      description: "We actively support wildlife conservation and community development in every destination.",
      icon: "TreePine",
    },
  ];

  return (
    <HomeClient
      images={images}
      featuredPackages={featuredPackages}
      testimonials={reviews}
      whyChooseUs={whyChooseUsData}
    >
      <SafariGalleryPreview />
    </HomeClient>
  );
}
