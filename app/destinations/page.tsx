import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/DestinationCard";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Explore Our Destinations | Go Wild Tours",
  description:
    "Five extraordinary wilderness areas across Zimbabwe — Victoria Falls, Hwange, Mana Pools, Matobo Hills, and Lake Kariba. Each with its own character, wildlife, and magic.",
};

const seasons = [
  {
    months: "May – October",
    label: "Dry Season",
    badge: "⭐ Peak Safari",
    color: "var(--color-savanna)",
    description:
      "Best game viewing as wildlife concentrates at waterholes. Clear skies, cool mornings. Perfect for all destinations.",
    destinations: ["Hwange", "Mana Pools", "Matobo", "Victoria Falls"],
  },
  {
    months: "November – April",
    label: "Green Season",
    badge: "🌿 Lush & Affordable",
    color: "#4CAF50",
    description:
      "Dramatic skies, lush vegetation, and newborn wildlife. Migratory birds arrive. Lower rates, fewer crowds.",
    destinations: ["Victoria Falls (full flood March–May)", "Lake Kariba"],
  },
];

export default function DestinationsPage() {
  return (
    <main>
      <PageHero
        image="/images/safari/victoria-falls-panorama.jpg"
        label="Zimbabwe"
        title="Explore Our Destinations"
        subtitle="Five extraordinary wilderness areas, each with its own character, wildlife, and magic."
      />

      {/* ── Intro Section ── */}
      <section className="section destinations-intro">
        <div className="container">
          <div className="destinations-intro__layout">
            <div className="destinations-intro__text">
              <span className="text-label">The Destination</span>
              <h2 className="text-h2">Africa&apos;s Best-Kept Safari Secret</h2>
              <p className="text-body-lg">
                Zimbabwe is one of Africa&apos;s most extraordinary safari destinations —
                renowned for the finest professional guides on the continent, vast
                and uncrowded wilderness areas, and wildlife encounters that feel
                genuinely wild.
              </p>
              <p
                className="text-body"
                style={{ color: "var(--color-text-muted)", marginTop: "1rem" }}
              >
                From the towering spray of Victoria Falls to the remote walking trails
                of Mana Pools — a UNESCO World Heritage Site — every corner of Zimbabwe
                offers a different dimension of the African experience.
              </p>
              <div className="destinations-intro__stats">
                <div className="stat-item">
                  <span className="stat-item__number">5</span>
                  <span className="stat-item__label">UNESCO Heritage Sites</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__number">50,000+</span>
                  <span className="stat-item__label">Elephants</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__number">500+</span>
                  <span className="stat-item__label">Bird Species</span>
                </div>
              </div>
            </div>

            <div className="destinations-intro__image">
              <Image
                src="/images/safari/elephants-impala-waterhole.jpg"
                alt="Elephants at a Zimbabwe waterhole"
                fill
                className="destinations-intro__img"
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <div className="destinations-intro__image-badge">
                <span>🏆 World&apos;s Best Safari Guides</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Destinations Grid ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="text-label">Zimbabwe</span>
            <h2 className="text-h2">Five Iconic Destinations</h2>
            <p className="section-header__subtitle">
              Each destination offers a completely different dimension of the
              Zimbabwean safari experience. Many of our itineraries combine two
              or three.
            </p>
          </div>

          <div className="destinations-grid">
            {/* Large featured card — Victoria Falls */}
            <div className="destinations-grid__featured">
              <DestinationCard destination={destinations[0]} />
            </div>
            {/* Hwange */}
            <div className="destinations-grid__main">
              <DestinationCard destination={destinations[1]} />
            </div>
            {/* Mana Pools, Matobo, Kariba — 3 equal */}
            {destinations.slice(2).map((dest) => (
              <div key={dest.slug} className="destinations-grid__secondary">
                <DestinationCard destination={dest} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Time To Visit ── */}
      <section className="section best-time">
        <div className="container">
          <div className="section-header">
            <span className="text-label">Planning</span>
            <h2 className="text-h2">Best Time to Visit Zimbabwe</h2>
          </div>
          <div className="best-time__grid">
            {seasons.map((s, i) => (
              <div key={i} className="season-card">
                <div className="season-card__header">
                  <span
                    className="season-card__badge"
                    style={{ background: s.color }}
                  >
                    {s.badge}
                  </span>
                  <span className="season-card__months">{s.months}</span>
                  <h3 className="season-card__label">{s.label}</h3>
                </div>
                <p className="season-card__desc">{s.description}</p>
                <div className="season-card__dests">
                  <span className="season-card__dests-label">
                    Recommended for:
                  </span>
                  <div className="season-card__dests-list">
                    {s.destinations.map((d, j) => (
                      <span key={j} className="season-card__dest-tag">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="container">
          <span className="text-label">Ready?</span>
          <h2 className="text-h2" style={{ marginBottom: "var(--space-4)" }}>
            Start Planning Your Safari
          </h2>
          <p
            className="section-header__subtitle"
            style={{ marginBottom: "var(--space-8)" }}
          >
            Let our team craft a bespoke itinerary combining your favourite
            destinations.
          </p>
          <Link href="/contact" className="btn btn--primary btn--lg">
            Book a Safari
          </Link>
        </div>
      </section>
    </main>
  );
}
