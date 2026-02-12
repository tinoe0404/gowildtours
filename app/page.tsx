"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import {
  featuredSafaris,
  testimonials,
  whyChooseUs,
} from "@/lib/constants";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import {
  Compass,
  Tent,
  Map,
  TreePine,
  Star,
  ChevronDown,
  ArrowRight,
  Quote,
} from "lucide-react";

/* ── Icon Map ── */
const iconMap: Record<string, React.ElementType> = {
  Compass,
  Tent,
  Map,
  TreePine,
};

/* ── Image URLs (Unsplash) ── */
const images = {
  hero: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
  about: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
  safari1: "https://images.unsplash.com/photo-1534177616064-84d7bf31fea3?w=600&q=80",
  safari2: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80",
  safari3: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80",
  ctaBg: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80",
};

const safariImages = [images.safari1, images.safari2, images.safari3];

export default function HomePage() {
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src={images.hero}
          alt="African savanna at sunset"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-deep/50 via-dark-deep/40 to-dark-deep/70" />

        {/* Content */}
        <Container className="relative z-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.span
              variants={fadeIn}
              className="font-accent text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-accent-light"
            >
              Premium African Safari Experiences
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight max-w-4xl"
            >
              Discover the{" "}
              <span className="text-gradient-gold">Wild Heart</span>{" "}
              of Africa
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-base md:text-lg text-cream/80 leading-relaxed"
            >
              Embark on unforgettable safari adventures through Africa&apos;s
              most breathtaking landscapes. Expert guides, luxury camps, and
              encounters with the world&apos;s most magnificent wildlife.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center gap-4 mt-2"
            >
              <Button variant="primary" size="lg">
                Explore Safaris
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Our Story
              </Button>
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-cream/50 text-xs font-accent tracking-wider uppercase">
            Scroll
          </span>
          <ChevronDown
            className="h-5 w-5 text-cream/50"
            style={{ animation: "scrollDown 2s ease-in-out infinite" }}
          />
        </motion.div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <Section spacing="lg" className="bg-cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
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
                  beauty and untamed spirit of Africa. Based in the heart of
                  Victoria Falls, Zimbabwe, we bring unrivalled expertise and
                  genuine passion to every journey.
                </p>
                <p>
                  Our carefully designed itineraries combine luxury
                  accommodations with authentic wilderness immersion,
                  ensuring every moment is filled with wonder, comfort, and
                  discovery.
                </p>
              </div>
              <div className="mt-8">
                <Button variant="secondary">
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Image */}
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
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 glass-dark rounded-[var(--radius-card)] p-5 text-cream hidden md:block">
                <div className="font-display text-3xl font-bold text-accent-light">
                  10+
                </div>
                <div className="text-xs font-accent tracking-wider text-cream/60 uppercase mt-1">
                  Years of Excellence
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════ FEATURED SAFARIS ═══════════════ */}
      <Section spacing="lg" className="bg-light">
        <Container>
          <SectionHeading
            title="Featured Safari Packages"
            subtitle="Handpicked adventures designed to immerse you in Africa's most spectacular wildlife and landscapes."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredSafaris.map((safari, index) => (
              <motion.div key={safari.id} variants={staggerItem}>
                <Card className="group h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={safariImages[index]}
                      alt={safari.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/60 to-transparent" />
                    <span className="absolute top-4 left-4 font-accent text-xs font-semibold tracking-wider uppercase bg-accent/90 text-dark-deep px-3 py-1 rounded-full">
                      {safari.duration}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="font-accent text-xs text-accent font-semibold tracking-wider uppercase mb-1">
                      {safari.location}
                    </p>
                    <h3 className="font-display text-xl font-bold text-dark-deep mb-2">
                      {safari.title}
                    </h3>
                    <p className="text-sm text-warm-gray leading-relaxed flex-1">
                      {safari.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-beige flex items-center justify-between">
                      <span className="font-accent font-bold text-primary text-lg">
                        {safari.price}
                      </span>
                      <button className="font-accent text-sm font-semibold text-accent hover:text-accent-light transition-colors flex items-center gap-1 cursor-pointer">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
      <Section spacing="lg" className="bg-dark-deep">
        <Container>
          <SectionHeading
            title="Why Choose Go Wild Tours"
            subtitle="Experience Africa the way it was meant to be — with passion, expertise, and a commitment to excellence."
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
                  <h3 className="font-display text-lg font-bold text-cream mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-cream/60 leading-relaxed">
                    {item.description}
                  </p>
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
            subtitle="Hear from travellers who have experienced the magic of Africa with Go Wild Tours."
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
                  {/* Quote icon */}
                  <Quote className="h-8 w-8 text-accent/20 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-warm-gray text-sm leading-relaxed flex-1 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-6 pt-4 border-t border-beige">
                    <p className="font-accent font-semibold text-dark-deep text-sm">
                      {testimonial.name}
                    </p>
                    <p className="font-accent text-xs text-warm-gray mt-0.5">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <Image
          src={images.ctaBg}
          alt="African wildlife"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-deep/85 via-dark-deep/75 to-dark-deep/85" />

        {/* Content */}
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
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream leading-tight mb-6">
              Ready to Plan Your
              <br />
              <span className="text-gradient-gold">African Adventure?</span>
            </h2>
            <p className="text-cream/70 text-base md:text-lg leading-relaxed mb-8">
              Let our expert team craft a bespoke safari itinerary just for
              you. From luxury camp selections to thrilling game drives, we
              handle every detail.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg">
                Book Your Adventure
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="lg">
                Contact Our Team
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
