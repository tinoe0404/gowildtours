import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-static";
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
import HomeClient from "@/components/home/HomeClient";
import { packages } from "@/lib/packages-data";

/* ── Icon Map ── */
const iconMap: Record<string, React.ElementType> = {
  Compass,
  Tent,
  Map,
  TreePine,
};

/* ── Image URLs (Local) ── */
const images = {
  hero: "/images/safari/hero-sunset-elephants.png",
  about: "/images/safari/elephants-waterhole.jpg",
  ctaBg: "/images/safari/victoria-falls-wide.jpg",
};

export default async function HomePage() {
  // Fetch Featured Packages
  const rawPackages = packages.filter(pkg => pkg.featured).slice(0, 3);

  // Serialize fields for Client Components
  const featuredPackages = rawPackages.map((pkg) => ({
    ...pkg,
    price: Number(pkg.price),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  // Hardcoded Approved Reviews as Testimonials
  const reviews = [
    {
      id: "1",
      reviewerName: "Sarah Jenkins",
      reviewerCountry: "United Kingdom",
      rating: 5,
      reviewText: "An absolutely incredible experience. The guides were so knowledgeable and the accommodations were top-notch. Seeing the elephants at the waterhole right from our tent was magical.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      reviewerName: "Mark & Lisa Thompson",
      reviewerCountry: "United States",
      rating: 5,
      reviewText: "GoWild Tours organized our honeymoon flawlessly. Victoria Falls was breathtaking, and the private dinners under the stars in Hwange were perfectly romantic. Highly recommend!",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      reviewerName: "David Chen",
      reviewerCountry: "Australia",
      rating: 4,
      reviewText: "Great photography safari. The modified vehicles made a huge difference and the guide knew exactly where to position us for the best light. Will definitely book again.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

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
