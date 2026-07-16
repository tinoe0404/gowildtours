import { Metadata } from "next";

export const dynamic = "force-static";
import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/DestinationCard";

export const metadata: Metadata = {
  title: "Explore Our Destinations | Go Wild Tours",
  description:
    "Extraordinary wilderness areas across Southern Africa — Zimbabwe, Botswana, Namibia, and Zambia. Each with its own character, wildlife, and magic.",
};

const seasons = [
  {
    months: "May – October",
    label: "Dry Season",
    badge: "⭐ Peak Safari",
    color: "var(--color-savanna)",
    description:
      "Best game viewing as wildlife concentrates at waterholes. Clear skies, cool mornings. Perfect for all destinations.",
    destinations: ["Zimbabwe", "Botswana", "Zambia", "Namibia"],
  },
  {
    months: "November – April",
    label: "Green Season",
    badge: "🌿 Lush & Affordable",
    color: "#4CAF50",
    description:
      "Dramatic skies, lush vegetation, and newborn wildlife. Migratory birds arrive. Lower rates, fewer crowds.",
    destinations: ["Victoria Falls (full flood March–May)", "Kalahari / Makgadikgadi (zebra migration)"],
  },
];

export default function DestinationsPage() {
  return (
    <main>
      <section className="pt-40 pb-16 bg-mist relative overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(200,135,58,0.05) 0%, rgba(255,255,255,1) 100%)' }}>
        <div className="absolute top-0 left-0 w-full h-[4px]" style={{ background: 'linear-gradient(90deg, #C8873A, #E5A95A, #C8873A)' }} />
        <div className="container relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider mb-4 border border-accent/20">Southern Africa</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-dark-deep mb-6">Explore Our Destinations</h1>
          <p className="text-xl text-warm-gray max-w-2xl mx-auto leading-relaxed">Extraordinary countries, each with its own character, landscapes, and wildlife magic.</p>
        </div>
      </section>

      {/* ── Intro Section ── */}
      <section className="section destinations-intro">
        <div className="container">
          <div className="destinations-intro__layout">
            <div className="destinations-intro__text">
              <span className="text-label">The Experience</span>
              <h2 className="text-h2">Africa&apos;s Best-Kept Safari Secrets</h2>
              <p className="text-body-lg">
                Southern Africa is home to some of the continent&apos;s most extraordinary safari destinations —
                renowned for vast and uncrowded wilderness areas, the finest professional guides, and wildlife encounters that feel
                genuinely wild.
              </p>
              <p
                className="text-body"
                style={{ color: "var(--color-text-muted)", marginTop: "1rem" }}
              >
                From the towering spray of Victoria Falls and the lush waterways of the Okavango Delta,
                to the towering red dunes of Sossusvlei and the raw wilderness of South Luangwa, every destination
                offers a different dimension of the African experience.
              </p>
              <div className="destinations-intro__stats">
                <div className="stat-item">
                  <span className="stat-item__number">4</span>
                  <span className="stat-item__label">Iconic Countries</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__number">100k+</span>
                  <span className="stat-item__label">Elephants</span>
                </div>
                <div className="stat-item">
                  <span className="stat-item__number">Unlimited</span>
                  <span className="stat-item__label">Memories</span>
                </div>
              </div>
            </div>

            <div className="destinations-intro__image">
              <Image
                src="/images/safari/elephants-impala-waterhole.jpg"
                alt="Elephants at a waterhole"
                fill
                className="destinations-intro__img"
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <div className="destinations-intro__image-badge">
                <span>🏆 Unforgettable Journeys</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Destinations Grid ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="text-label">Southern Africa</span>
            <h2 className="text-h2">Our Iconic Destinations</h2>
            <p className="section-header__subtitle">
              Each destination offers a completely different dimension of the
              African safari experience. Many of our itineraries seamlessly cross borders.
            </p>
          </div>

          {destinations.length > 0 ? (
            <div className="destinations-grid">
              {/* Large featured card */}
              {destinations[0] && (
                <div className="destinations-grid__featured">
                  <DestinationCard destination={destinations[0]} />
                </div>
              )}
              {/* Second card */}
              {destinations[1] && (
                <div className="destinations-grid__main">
                  <DestinationCard destination={destinations[1]} />
                </div>
              )}
              {/* Remaining cards */}
              {destinations.slice(2).map((dest) => (
                <div key={dest.slug} className="destinations-grid__secondary">
                  <DestinationCard destination={dest} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-body-lg text-[var(--color-text-muted)]">
                Our destinations are being updated. Check back soon!
              </p>
            </div>
          )}
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-[40px] p-12 md:p-24 overflow-hidden shadow-2xl text-center" style={{ background: 'linear-gradient(135deg, var(--color-savanna), var(--color-emerald))' }}>
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-wider mb-6 border border-white/30 backdrop-blur-sm">Ready?</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                Start Planning Your Safari
              </h2>
              <p className="text-white/90 text-lg mb-12 font-medium leading-relaxed">
                Let our team craft a bespoke itinerary combining your favourite destinations.
              </p>
              <Link href="/contact" className="inline-block bg-white text-dark-deep px-10 py-4 rounded-2xl font-black text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-1">
                Book a Safari
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
