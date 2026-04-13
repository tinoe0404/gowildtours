import Image from 'next/image';
import Link from 'next/link';
import { Destination } from '@/data/destinations';

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="dest-card">
      <Link href={`/destinations/${destination.slug}`} className="dest-card__link">
        
        <div className="dest-card__image-wrap">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="dest-card__image"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="dest-card__overlay" />
          <div className="dest-card__content">
            <span className="dest-card__region">{destination.region}</span>
            <h3 className="dest-card__name">{destination.name}</h3>
            <p className="dest-card__tagline">{destination.tagline}</p>
            <div className="dest-card__highlights">
              {destination.highlights.slice(0, 2).map((h, i) => (
                <span key={i} className="dest-card__highlight">
                  ✓ {h}
                </span>
              ))}
            </div>
            <span className="dest-card__cta">
              Explore Destination →
            </span>
          </div>
        </div>

      </Link>
    </article>
  );
}
