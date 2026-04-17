"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/data/destinations";
import { Package } from "@/lib/packages-data";
import PackageCard from "@/components/ui/PackageCard";

interface DestinationDetailClientProps {
  destination: Destination;
}

const tabs = ["Overview", "Tours", "Activities", "Accommodation", "When to Visit"];

export default function DestinationDetailClient({
  destination,
}: DestinationDetailClientProps) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [destinationPackages, setDestinationPackages] = useState<Package[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map((tab) =>
        document.getElementById(tab.toLowerCase().replace(/ /g, "-"))
      );

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveTab(tabs[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch packages
  useEffect(() => {
    async function fetchPackages() {
      try {
        setIsLoadingPackages(true);
        const res = await fetch("/api/packages");
        if (!res.ok) throw new Error("Failed to fetch packages");
        const data: Package[] = await res.json();
        
        const filtered = data.filter((pkg) => 
          pkg.destinations?.includes(destination.name)
        );
        setDestinationPackages(filtered);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      } finally {
        setIsLoadingPackages(false);
      }
    }
    fetchPackages();
  }, [destination.name]);

  return (
    <>
      {/* ── Page Header ── */}
      <div className="pt-36 pb-8 bg-[var(--color-mist)]">
        <div className="container">
          <span className="text-label" style={{ color: "var(--color-savanna)" }}>
            {destination.region}
          </span>
          <h1
            className="text-h1"
            style={{
              color: "var(--color-earth)",
              marginTop: "var(--space-2)",
              marginBottom: "var(--space-2)",
            }}
          >
            {destination.name}
          </h1>
          <p
            className="text-body-lg"
            style={{ color: "var(--color-text-muted)", maxWidth: "600px" }}
          >
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* ── Sticky Tab Bar ── */}
      <nav className="dest-tabs" aria-label="Destination sections">
        <div className="container">
          <div className="dest-tabs__inner">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`dest-tab ${activeTab === tab ? "dest-tab--active" : ""}`}
                onClick={() => {
                  setActiveTab(tab);
                  document
                    .getElementById(tab.toLowerCase().replace(/ /g, "-"))
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Overview ── */}
      <section id="overview" className="section">
        <div className="container">
          <div className="section-header" style={{ textAlign: "left" }}>
            <span className="text-label">Overview</span>
            <h2 className="text-h2">{destination.name}</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-8)",
            }}
          >
            <div>
              <p className="text-body-lg" style={{ marginBottom: "var(--space-6)" }}>
                {destination.description}
              </p>
              <div
                className="text-body"
                style={{
                  color: "var(--color-text-muted)",
                  whiteSpace: "pre-line",
                  lineHeight: 1.75,
                }}
              >
                {destination.longDescription}
              </div>
            </div>
            <div>
              {/* Highlights */}
              <div
                style={{
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-6)",
                  marginBottom: "var(--space-6)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: "var(--space-4)",
                  }}
                >
                  Highlights
                </h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {destination.highlights.map((h, i) => (
                    <li
                      key={i}
                      style={{
                        padding: "var(--space-2) 0",
                        borderBottom:
                          i < destination.highlights.length - 1
                            ? "1px solid var(--color-border)"
                            : "none",
                        fontSize: "0.95rem",
                        color: "var(--color-earth)",
                      }}
                    >
                      ✓ {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Facts */}
              <div
                style={{
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-6)",
                  marginBottom: "var(--space-6)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: "var(--space-4)",
                  }}
                >
                  Quick Facts
                </h3>
                <div style={{ fontSize: "0.9rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "var(--space-2) 0",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    <span style={{ color: "var(--color-text-muted)" }}>
                      Best Time
                    </span>
                    <span style={{ fontWeight: 600 }}>
                      {destination.bestTime}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "var(--space-2) 0",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    <span style={{ color: "var(--color-text-muted)" }}>
                      Recommended Stay
                    </span>
                    <span style={{ fontWeight: 600 }}>
                      {destination.duration}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "var(--space-2) 0",
                    }}
                  >
                    <span style={{ color: "var(--color-text-muted)" }}>
                      Best For
                    </span>
                    <span style={{ fontWeight: 600, textAlign: "right" }}>
                      {destination.bestFor.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Wildlife badges */}
              <div className="wildlife-strip">
                <span className="text-label">Wildlife</span>
                <div className="wildlife-tags">
                  {destination.wildlife.map((animal, i) => (
                    <span key={i} className="wildlife-tag">
                      {animal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tours ── */}
      <section id="tours" className="section bg-[var(--color-mist)]">
        <div className="container">
          <div className="section-header" style={{ textAlign: "left" }}>
            <span className="text-label">Safaris</span>
            <h2 className="text-h2">Tours in {destination.name}</h2>
          </div>
          
          {isLoadingPackages ? (
            <div className="packages-grid w-full">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="package-card-skeleton" aria-hidden="true" style={{ height: "400px", background: "var(--color-white)", borderRadius: "var(--radius-lg)" }} />
                ))}
            </div>
          ) : destinationPackages.length > 0 ? (
            <div className="packages-grid">
              {destinationPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg as any} />
              ))}
            </div>
          ) : (
            <p className="text-body text-[var(--color-text-muted)]">
              No tours are currently listed for {destination.name}. Please contact us for a custom itinerary.
            </p>
          )}
        </div>
      </section>

      {/* ── Activities ── */}
      <section id="activities" className="section dest-activities">
        <div className="container">
          <div className="section-header" style={{ textAlign: "left" }}>
            <span className="text-label">Experiences</span>
            <h2 className="text-h2">Activities &amp; Experiences</h2>
          </div>
          <div className="activities-grid">
            {destination.activities.map((activity, i) => (
              <div key={i} className="activity-card">
                <span className="activity-card__icon">{activity.icon}</span>
                <h3 className="activity-card__name">{activity.name}</h3>
                <p className="activity-card__desc">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accommodation ── */}
      <section id="accommodation" className="section">
        <div className="container">
          <div className="section-header" style={{ textAlign: "left" }}>
            <span className="text-label">Where to Stay</span>
            <h2 className="text-h2">Accommodation</h2>
            <p
              className="section-header__subtitle"
              style={{ margin: 0, textAlign: "left" }}
            >
              All Go Wild Tours safaris include handpicked accommodation that
              balances genuine wilderness immersion with quality and comfort.
            </p>
          </div>
          <div className="accom-list">
            {destination.accommodation.map((lodge, i) => (
              <div key={i} className="accom-card">
                <div className="accom-card__meta">
                  <span className="accom-card__type">{lodge.type}</span>
                  <h3 className="accom-card__name">{lodge.name}</h3>
                  <p className="accom-card__desc">{lodge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── When to Visit ── */}
      <section id="when-to-visit" className="section">
        <div className="container">
          <div className="section-header" style={{ textAlign: "left" }}>
            <span className="text-label">Planning</span>
            <h2 className="text-h2">When to Visit {destination.name}</h2>
          </div>
          <div
            style={{
              background: "var(--color-white)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-8)",
            }}
          >
            <p className="text-body-lg" style={{ marginBottom: "var(--space-4)" }}>
              <strong>Best Time:</strong> {destination.bestTime}
            </p>
            <p className="text-body-lg" style={{ marginBottom: "var(--space-4)" }}>
              <strong>Recommended Stay:</strong> {destination.duration}
            </p>
            <p
              className="text-body"
              style={{ color: "var(--color-text-muted)" }}
            >
              <strong>Best For:</strong> {destination.bestFor.join(", ")}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="container">
          <span className="text-label">Ready?</span>
          <h2 className="text-h2" style={{ marginBottom: "var(--space-4)" }}>
            Enquire About {destination.name}
          </h2>
          <p
            className="section-header__subtitle"
            style={{ marginBottom: "var(--space-8)" }}
          >
            Let our team craft a bespoke itinerary featuring{" "}
            {destination.name}.
          </p>
          <Link href="/contact" className="btn btn--primary btn--lg">
            Book a Safari
          </Link>
        </div>
      </section>
    </>
  );
}
