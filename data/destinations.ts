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
  knownPlaces: string[]; // Added to match against package destinations
}

export const destinations: Destination[] = [
  {
    slug: "zimbabwe",
    name: "Zimbabwe",
    tagline: "The Authentic Safari Experience",
    region: "Southern Africa",
    image: "/images/safari/victoria-falls-panorama.jpg",
    heroImage: "/images/safari/victoria-falls-panorama.jpg",
    highlights: ["Victoria Falls", "Hwange National Park", "Matobo National Park", "Great Zimbabwe Ruins"],
    bestFor: ["Wildlife Safari", "Walking Safaris", "Culture & History", "Adventure"],
    bestTime: "May – October",
    duration: "5–14 days",
    description: "Experience the thunder of Victoria Falls, vast uncrowded parks, and some of the best professional guides in Africa.",
    longDescription: "Zimbabwe is a spectacular safari and cultural destination offering diverse attractions. Discover the breathtaking Victoria Falls, abundant wildlife in Hwange National Park, ancient rock art and balancing rocks in Matopos National Park, canoe and walking safaris in Mana Pools National Park, lakeside wildlife in Matusadona National Park, and the historic stone ruins of Great Zimbabwe, showcasing the country's rich natural and cultural heritage.",
    activities: [],
    accommodation: [],
    wildlife: ["Elephant", "Lion", "Wild Dog", "Leopard", "Rhino"],
    coordinates: { lat: -19.0154, lng: 29.1549 },
    knownPlaces: ["Zimbabwe", "Victoria Falls", "Hwange National Park", "Bulawayo", "Matobo National Park", "Great Zimbabwe", "Harare", "Lake Kariba", "Matopos"]
  },
  {
    slug: "botswana",
    name: "Botswana",
    tagline: "The Jewel of the Kalahari",
    region: "Southern Africa",
    image: "/images/safari/delta-aerial.jpg",
    heroImage: "/images/safari/river-aerial.jpg",
    highlights: ["Okavango Delta", "Chobe National Park", "Makgadikgadi Pans", "Moremi Game Reserve"],
    bestFor: ["Water Safaris", "Elephant Viewing", "Luxury Safaris", "Bird Watching"],
    bestTime: "May – September",
    duration: "7–12 days",
    description: "Explore the lush waterways of the Okavango Delta and witness massive elephant herds along the Chobe River.",
    longDescription: "Botswana is one of Africa's premier safari destinations, renowned for its pristine wilderness and exceptional wildlife. Explore Chobe National Park for huge elephant herds, the Okavango Delta for mokoro canoe safaris, Moremi Game Reserve for outstanding game viewing, the Makgadikgadi Salt Pans for dramatic landscapes and meerkats, and the Central Kalahari Desert for remote wilderness, unique desert wildlife, and unforgettable stargazing experiences.",
    activities: [],
    accommodation: [],
    wildlife: ["Elephant", "Hippo", "Lion", "Leopard", "Cheetah"],
    coordinates: { lat: -22.3285, lng: 24.6849 },
    knownPlaces: ["Botswana", "Chobe National Park", "Makgadikgadi Pans", "Okavango Delta", "Elephant Sands", "Maun", "Kasane", "Nata", "Moremi Game Reserve"]
  },
  {
    slug: "namibia",
    name: "Namibia",
    tagline: "Land of Striking Contrasts",
    region: "Southern Africa",
    image: "/images/safari/dead-tree-deadvlei.jpg",
    heroImage: "/images/safari/dunes-panorama.jpg",
    highlights: ["Sossusvlei Dunes", "Etosha National Park", "Swakopmund", "Skeleton Coast"],
    bestFor: ["Desert Landscapes", "Photography", "Self-Drive Safaris", "Adventure"],
    bestTime: "June – October",
    duration: "7–14 days",
    description: "Climb the world's highest red dunes, discover desert-adapted wildlife, and explore the rugged Atlantic coast.",
    longDescription: "Namibia is a land of striking landscapes and unforgettable wildlife. Experience the towering red dunes of Sossusvlei in the Namib Desert, enjoy exceptional game viewing in Etosha National Park, discover ancient rock art and desert-adapted elephants in Damaraland, and explore the remote wilderness of Kaokoland, home to the Himba people, dramatic scenery, and unique desert wildlife.",
    activities: [],
    accommodation: [],
    wildlife: ["Oryx", "Desert Rhino", "Cheetah", "Elephant", "Lion"],
    coordinates: { lat: -22.9576, lng: 18.4904 },
    knownPlaces: ["Namibia", "Windhoek", "Etosha National Park", "Swakopmund", "Sossusvlei", "Namib Desert", "Walvis Bay", "Sesriem", "Twyfelfontein", "Naukluft National Park"]
  },
  {
    slug: "zambia",
    name: "Zambia",
    tagline: "The Real Africa",
    region: "Southern Africa",
    image: "/images/safari/leopard-tree.jpg",
    heroImage: "/images/safari/victoria-falls-aerial.jpg",
    highlights: ["Victoria Falls (Zambian Side)", "South Luangwa", "Lower Zambezi", "Kafue National Park"],
    bestFor: ["Walking Safaris", "Adventure", "Night Drives", "Leopard Sightings"],
    bestTime: "May – October",
    duration: "5–10 days",
    description: "The birthplace of the walking safari, offering raw wilderness, the mighty Zambezi River, and Devil's Pool.",
    longDescription: "Zambia is a remarkable safari and adventure destination. Explore South Luangwa National Park for exceptional walking safaris, Lower Zambezi National Park for canoeing and wildlife, Kafue National Park for vast wilderness and diverse game, Siavonga for relaxing on Lake Kariba, and Livingstone for the majestic Victoria Falls and thrilling outdoor adventures.",
    activities: [],
    accommodation: [],
    wildlife: ["Leopard", "Lion", "Elephant", "Hippo", "Wild Dog"],
    coordinates: { lat: -13.1339, lng: 27.8493 },
    knownPlaces: ["Zambia", "Livingstone", "Devil's Pool", "South Luangwa", "Lower Zambezi", "Kafue National Park"]
  },
  {
    slug: "malawi",
    name: "Malawi",
    tagline: "The Warm Heart of Africa",
    region: "Southern Africa",
    image: "/images/safari/hippos-mud.jpg",
    heroImage: "/images/safari/hippos-mud.jpg",
    highlights: ["Lake Malawi", "Liwonde National Park", "Majete Wildlife Reserve", "Mount Mulanje"],
    bestFor: ["Beaches & Lakes", "Cultural Encounters", "Snorkeling", "Scenic Drives"],
    bestTime: "May – October",
    duration: "5–10 days",
    description: "Relax on the sandy beaches of Lake Malawi and experience the warm hospitality of friendly communities.",
    longDescription: "Malawi, the \"Warm Heart of Africa,\" offers stunning natural beauty and rich culture. Relax on the sandy beaches of Lake Malawi, explore vibrant local markets for fresh fish, crafts, and clothing, visit scenic tea plantations in the highlands, enjoy wildlife in national parks, and experience the warm hospitality of friendly communities throughout this beautiful country.",
    activities: [],
    accommodation: [],
    wildlife: ["Hippo", "Crocodile", "Cichlids", "Elephant", "Black Rhino"],
    coordinates: { lat: -13.2543, lng: 34.3015 },
    knownPlaces: ["Malawi", "Lake Malawi", "Lilongwe", "Blantyre", "Liwonde", "Majete"]
  }
];
