export type PropertyType = 'lodge' | 'camp' | 'hotel' | 'guesthouse' | 'eco-lodge' | 'houseboat';

export type MealPlan = 'Fully Inclusive' | 'Full Board' | 'Half Board' | 'Bed & Breakfast' | 'Room Only' | 'Self-Catering';

export interface Location {
    destination: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    distanceToVictoriaFalls?: number;
    distanceToAirport?: number;
}

export interface RoomType {
    id: string;
    name: string;
    description: string;
    size?: number; // sqm
    maxOccupancy: number;
    bedConfiguration: string;
    amenities: string[];
    images: string[];
    price: number;
    available: boolean;
}

export interface Review {
    id: string;
    userName: string;
    country: string;
    rating: number;
    date: string;
    title: string;
    comment: string;
    travelerType: 'couple' | 'family' | 'solo' | 'business' | 'group';
}

export interface Hotel {
    id: string;
    slug: string;
    name: string;
    propertyType: PropertyType;
    starRating: number;
    location: Location;
    shortDescription: string;
    longDescription: string;
    highlights: string[];
    images: {
        thumbnail: string;
        gallery: string[];
        roomImages?: Record<string, string[]>;
    };
    pricing: {
        currency: string;
        pricePerNightFrom: number;
        includedInRate: string[];
    };
    roomTypes: RoomType[];
    amenities: {
        general: string[];
        room: string[];
        dining: string[];
        activities: string[];
        services: string[];
    };
    mealPlans: MealPlan[];
    policies: {
        checkIn: string;
        checkOut: string;
        cancellation: string;
        children: string;
        pets: string;
    };
    sustainability?: {
        certified: boolean;
        practices: string[];
    };
    reviews: {
        averageRating: number;
        totalReviews: number;
        ratingBreakdown: {
            cleanliness: number;
            service: number;
            location: number;
            value: number;
            facilities: number;
        };
        recentReviews: Review[];
    };
    features: {
        featured?: boolean;
        popular?: boolean;
        adultsOnly?: boolean;
        familyFriendly?: boolean;
        ecoFriendly?: boolean;
    };
    tags: string[];
    relatedPackages?: string[];
}
