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
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ minHeight: '100dvh' }}>
                {/* Background Image with Parallax Drift */}
                <motion.div
                    initial={{ scale: 1.03 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={images.hero}
                        alt="African savanna at sunset"
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="100vw"
                    />
                </motion.div>

                {/* Dark Gradient Overlay with Radial Vignette for contrast */}
                <div
                    className="absolute inset-0 z-[1]"
                    style={{
                        background:
                            "radial-gradient(circle at center bottom, rgba(0,0,0,0.3) 0%, transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.8) 100%)",
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
                            className="inline-flex whitespace-nowrap border border-[#C8832A]/50 px-5 py-1.5 rounded-full tracking-wider md:tracking-[0.15em] text-[10px] md:text-xs text-[#C8832A] font-accent font-semibold uppercase bg-transparent text-center"
                            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                        >
                            Premium African Safari Experiences
                        </motion.span>

                        {/* Main Heading */}
                        <motion.h1
                            variants={fadeInUp}
                            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                            style={{ color: "#87CEEB", textShadow: "0 2px 24px rgba(0,0,0,0.6), 0 4px 48px rgba(0,0,0,0.4)" }}
                        >
                            Unexplored Paradise
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
                                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white/90 border border-white/50 bg-transparent transition-all duration-300 hover:bg-white/10 hover:scale-105"
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
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
                >
                    <span className="text-white/80 text-xs font-accent tracking-[0.2em] uppercase">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-[1px] h-8 bg-gradient-to-b from-white/80 to-transparent mb-1" />
                        <ChevronDown className="h-4 w-4 text-white/80" />
                    </motion.div>
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
                            <span className="inline-block border border-accent/50 px-4 py-1 rounded-full tracking-[0.2em] text-xs text-accent font-accent font-semibold uppercase bg-transparent mb-6">
                                About Us
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark-deep leading-tight mb-6">
                                Crafting Extraordinary{" "}
                                <span className="text-primary">Safari Adventures</span>
                            </h2>
                            <div className="space-y-4 text-warm-gray leading-relaxed">
                                <p>
                                    Started in 2018, our founders have been in the tourism industry since 2001. We have travelled and guided in 15 countries across Southern and East Africa.
                                </p>
                                <p>
                                    We offer a comprehensive range of safari experiences in Africa, from budget and middle-range to luxury and high-end upmarket tours.
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
                        title="Top Iconic Destinations"
                        subtitle="From the thundering Victoria Falls to the vast plains of Hwange — each destination reveals a different face of Africa."
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
                                    className="group relative p-6 rounded-[var(--radius-feature)] border border-cream/10 hover:border-accent/40 bg-cream/[0.03] hover:bg-cream/[0.07] transition-all duration-500 text-center overflow-hidden"
                                >
                                    {/* Terracotta to Sky Blue accent bar */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: 'linear-gradient(90deg, #C8832A, #87CEEB, #C8832A)' }}
                                    />
                                    <div
                                        className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-accent transition-all duration-500 group-hover:scale-110"
                                        style={{ background: 'linear-gradient(135deg, rgba(200,135,58,0.12), rgba(229,169,90,0.08))' }}
                                    >
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
                                <div
                                    className="relative p-8 bg-white rounded-[var(--radius-feature)] h-full flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1"
                                    style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}
                                >
                                    {/* Terracotta accent bar */}
                                    <div className="absolute top-0 left-0 right-0" style={{ height: '3px', background: 'linear-gradient(90deg, #C8832A, #E5A95A, #C8832A)' }} />
                                    <Quote style={{ width: '32px', height: '32px', color: 'var(--color-savanna)', opacity: 0.2 }} className="mb-4" />
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star key={i} style={{ width: '16px', height: '16px', fill: 'var(--color-savanna)', color: 'var(--color-savanna)' }} />
                                        ))}
                                    </div>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.7, fontStyle: 'italic' }} className="flex-1 truncate-3-lines">
                                        &ldquo;{testimonial.reviewText}&rdquo;
                                    </p>
                                    <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                                        <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-earth)' }}>{testimonial.reviewerName}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-savanna)', marginTop: '2px' }}>{testimonial.reviewerCountry}</p>
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
                        <span className="inline-block border border-accent/50 px-4 py-1 rounded-full tracking-[0.2em] text-xs text-accent font-accent font-semibold uppercase bg-transparent mb-6">
                            Start Your Journey
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: "#87CEEB" }}>
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
