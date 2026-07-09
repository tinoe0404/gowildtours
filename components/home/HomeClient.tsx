"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
import { destinations } from "@/data/destinations";

const iconMap: Record<string, React.ElementType> = {
    Compass,
    Tent,
    Map,
    TreePine,
};

import { type Package } from "@/lib/packages-data";

export interface Testimonial {
    id: string;
    reviewerName: string;
    reviewerCountry: string;
    rating: number;
    reviewText: string;
    createdAt: string;
    updatedAt: string;
}

export interface WhyChooseUsItem {
    title: string;
    description: string;
    icon: string;
}

interface HomeClientProps {
    images: { hero: string; about: string; ctaBg: string };
    featuredPackages: Package[];
    testimonials: Testimonial[];
    whyChooseUs: WhyChooseUsItem[];
    children?: React.ReactNode;
}

export default function HomeClient({ images, featuredPackages, testimonials, whyChooseUs, children }: HomeClientProps) {
    return (
        <>
            {/* ═══════════════ HERO ═══════════════ */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <Image
                    src={images.hero}
                    alt="African savanna at sunset"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />

                {/* Dark Gradient Overlay */}
                <div
                    className="absolute inset-0 z-[1]"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.8) 100%)",
                    }}
                />

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-3xl mx-auto px-4 text-center flex flex-col items-center justify-center">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center gap-6"
                    >
                        {/* Eyebrow Badge */}
                        <motion.span
                            variants={fadeIn}
                            className="inline-block bg-black/30 px-4 py-1 rounded-full tracking-widest text-xs text-white/90 font-accent font-semibold uppercase"
                            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
                        >
                            Premium African Safari Experiences
                        </motion.span>

                        {/* Main Heading */}
                        <motion.h1
                            variants={fadeInUp}
                            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gradient-gold"
                        >
                            Discover the Wild Heart
                            <br />
                            of Africa
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeInUp}
                            className="max-w-2xl text-base md:text-lg text-white leading-relaxed"
                            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
                        >
                            Embark on unforgettable safari adventures through Africa&apos;s
                            most breathtaking landscapes. Expert guides, luxury camps, and
                            encounters with the world&apos;s most magnificent wildlife.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
                        >
                            <Link
                                href="/safaris"
                                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:brightness-110 hover:scale-105"
                                style={{ backgroundColor: "#C8832A" }}
                            >
                                Explore Safaris
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                            <Link
                                href="/gallery"
                                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white border-2 border-white bg-transparent transition-all duration-300 hover:bg-white/10 hover:scale-105"
                            >
                                Watch Our Story
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                >
                    <span className="text-white/50 text-xs font-accent tracking-wider uppercase">
                        Scroll
                    </span>
                    <ChevronDown
                        className="h-5 w-5 text-white/50 animate-bounce"
                    />
                </motion.div>
            </section>

            {/* ═══════════════ ABOUT ═══════════════ */}
            <Section spacing="lg" className="bg-cream">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            variants={slideInLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <span className="font-accent text-sm font-semibold tracking-[0.2em] uppercase text-accent block mb-3">
                                About Us
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark-deep leading-tight mb-6">
                                Crafting Extraordinary{" "}
                                <span className="text-primary">Safari Adventures</span>
                            </h2>
                            <div className="space-y-4 text-warm-gray leading-relaxed">
                                <p>
                                    For over a decade, Go Wild Tours has been curating premium
                                    safari experiences that connect travellers with the raw
                                    beauty and untamed spirit of Africa.
                                </p>
                                <p>
                                    Our carefully designed itineraries combine luxury
                                    accommodations with authentic wilderness immersion.
                                </p>
                            </div>
                            <div className="mt-8">
                                <Link href="/about">
                                    <Button variant="primary">
                                        Learn More About Us
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={slideInRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/3] rounded-[var(--radius-feature)] overflow-hidden shadow-2xl">
                                <Image
                                    src={images.about}
                                    alt="Luxury safari camp"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* ═══════════════ DESTINATIONS TEASER ═══════════════ */}
            <Section spacing="lg" className="bg-light">
                <Container>
                    <SectionHeading
                        title="Five Iconic Destinations"
                        subtitle="From the thundering Victoria Falls to the remote walking trails of Mana Pools — each destination reveals a different face of Zimbabwe."
                    />

                    <div className="home-dest-strip">
                        {destinations.map((dest) => (
                            <Link key={dest.slug} href={`/destinations/${dest.slug}`} className="home-dest-card">
                                <div className="home-dest-card__image-wrap">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="home-dest-card__image"
                                        sizes="(max-width: 768px) 220px, (max-width: 1024px) 33vw, 20vw"
                                    />
                                    <div className="home-dest-card__overlay" />
                                </div>
                                <div className="home-dest-card__body">
                                    <h3 className="home-dest-card__name">{dest.name}</h3>
                                    <span className="home-dest-card__link">Explore →</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
                        <Link href="/destinations" className="btn btn--outline">View All Destinations</Link>
                    </div>
                </Container>
            </Section>

            {/* ═══════════════ FEATURED SAFARIS ═══════════════ */}
            <Section spacing="lg" className="bg-light">
                <Container>
                    <SectionHeading
                        title="Featured Safaris"
                        subtitle="Handpicked adventures designed to immerse you in Africa's most spectacular wildlife."
                    />

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {featuredPackages.map((safari) => (
                            <motion.div key={safari.id} variants={staggerItem}>
                                <Card className="group h-full flex flex-col">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={safari.images?.[0] || "/images/safari/lioness-rain.jpg"}
                                            alt={safari.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/60 to-transparent" />
                                        <span className="absolute top-4 left-4 font-accent text-xs font-semibold tracking-wider uppercase bg-accent/90 text-dark-deep px-3 py-1 rounded-full">
                                            {typeof safari.duration === 'string' ? safari.duration : `${safari.duration?.days || 0} Days`}
                                        </span>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <p className="font-accent text-xs text-accent font-semibold tracking-wider uppercase mb-1">
                                            {safari.category || "Safari"}
                                        </p>
                                        <h3 className="font-display text-xl font-bold text-dark-deep mb-2">
                                            {safari.title}
                                        </h3>
                                        <p className="text-sm text-warm-gray leading-relaxed flex-1 line-clamp-3">
                                            {safari.description}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-beige flex items-center justify-between">
                                            <span className="font-accent font-bold text-primary text-lg">
                                                From ${Number(safari.price).toLocaleString()}
                                            </span>
                                            <Link href={`/safaris/${safari.slug}`} className="font-accent text-sm font-semibold text-accent hover:text-accent-light transition-colors flex items-center gap-1">
                                                View Details
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </Section>

            {children}

            {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
            <Section spacing="lg" className="bg-dark-deep">
                <Container>
                    <SectionHeading
                        title="Why Choose Go Wild Tours"
                        subtitle="Experience Africa the way it was meant to be."
                        light
                    />

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {whyChooseUs.map((item) => {
                            const Icon = iconMap[item.icon] || Compass;
                            return (
                                <motion.div
                                    key={item.title}
                                    variants={staggerItem}
                                    className="group relative p-6 rounded-[var(--radius-feature)] border border-cream/10 hover:border-accent/30 bg-cream/[0.03] hover:bg-cream/[0.06] transition-all duration-300 text-center"
                                >
                                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-display text-lg font-bold text-cream mb-2">{item.title}</h3>
                                    <p className="text-sm text-cream/60 leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </Container>
            </Section>

            {/* ═══════════════ TESTIMONIALS ═══════════════ */}
            <Section spacing="lg" className="bg-cream">
                <Container>
                    <SectionHeading
                        title="What Our Guests Say"
                        subtitle="Hear from travellers who have experienced the magic."
                    />

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {testimonials.map((testimonial) => (
                            <motion.div key={testimonial.id} variants={staggerItem}>
                                <div className="relative p-8 bg-white rounded-[var(--radius-feature)] shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                                    <Quote className="h-8 w-8 text-accent/20 mb-4" />
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                                        ))}
                                    </div>
                                    <p className="text-warm-gray text-sm leading-relaxed flex-1 italic truncate-3-lines">
                                        &ldquo;{testimonial.reviewText}&rdquo;
                                    </p>
                                    <div className="mt-6 pt-4 border-t border-beige">
                                        <p className="font-accent font-semibold text-dark-deep text-sm">{testimonial.reviewerName}</p>
                                        <p className="font-accent text-xs text-warm-gray mt-0.5">{testimonial.reviewerCountry}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </Section>

            <InstagramFeed />

            {/* ═══════════════ CTA BANNER ═══════════════ */}
            <section
                className="relative py-16 md:py-20 overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #1A1410 0%, #2C1A0E 40%, #1A1410 100%)",
                }}
            >

                <Container className="relative z-10">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="font-accent text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-accent-light block mb-4">
                            Start Your Journey
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-gradient-gold">
                            Ready to Plan Your
                            <br />
                            African Adventure?
                        </h2>
                        <p className="text-cream/70 text-base md:text-lg leading-relaxed mb-8">
                            Let our expert team craft a bespoke safari itinerary just for you.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/safaris">
                                <Button variant="primary" size="lg">
                                    Book Your Adventure
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="ghost" size="lg">
                                    Contact Our Team
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
