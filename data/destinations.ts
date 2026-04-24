export interface Activity {
  name: string;
  icon: string;
  description: string;
}

export interface AccommodationHighlight {
  name: string;
  type: string;
  description: string;
  image: string;
}

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  region: string;
  image: string;
  heroImage: string;
  highlights: string[];
  bestFor: string[];
  bestTime: string;
  duration: string;
  description: string;
  longDescription: string;
  activities: Activity[];
  accommodation: AccommodationHighlight[];
  wildlife: string[];
  coordinates: { lat: number; lng: number };
}

export const destinations: Destination[] = [];
