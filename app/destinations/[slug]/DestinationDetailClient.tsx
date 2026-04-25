"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/data/destinations";
import { Package } from "@/lib/packages-data";
import PackageCard from "@/components/ui/PackageCard";

import { packages } from "@/lib/packages-data";

interface DestinationDetailClientProps {
  destination: Destination;
}

export default function DestinationDetailClient({
  destination,
}: DestinationDetailClientProps) {
  const [destinationPackages, setDestinationPackages] = useState<Package[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);

  // Filter packages from local static data
  useEffect(() => {
    setIsLoadingPackages(true);
    const filtered = packages.filter((pkg) => {
      if (!pkg.destinations) return false;
      // Check if any package destination is in the country's knownPlaces list,
      // or matches the country name directly.
      return pkg.destinations.some(
        (d) =>
          destination.knownPlaces?.includes(d) ||
          d === destination.name ||
          d.includes(destination.name)
      );
    });
    setDestinationPackages(filtered);
    setIsLoadingPackages(false);
  }, [destination.name, destination.knownPlaces]);

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
