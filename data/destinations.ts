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
    image: "/images/safari/victoria-falls-close.jpg",
    heroImage: "/images/safari/victoria-falls-wide.jpg",
    highlights: ["Victoria Falls", "Hwange National Park", "Matobo National Park", "Great Zimbabwe Ruins"],
    bestFor: ["Wildlife Safari", "Walking Safaris", "Culture & History", "Adventure"],
    bestTime: "May – October",
    duration: "5–14 days",
    description: "Experience the thunder of Victoria Falls, vast uncrowded parks, and some of the best professional guides in Africa.",
    longDescription: "Zimbabwe is one of Africa's most extraordinary safari destinations. Renowned for the finest professional guides on the continent, vast and uncrowded wilderness areas, and wildlife encounters that feel genuinely wild. From the towering spray of Victoria Falls to the remote walking trails of Hwange, every corner of Zimbabwe offers a different dimension of the African experience. Please note: Zimbabwe is difficult to run with these roads.",
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
    longDescription: "Botswana offers an unparalleled wilderness experience characterized by stunning contrasts. From the crystal-clear waterways of the Okavango Delta, a lush oasis teeming with life, to the arid expanses of the Kalahari Desert and the vast salt flats of the Makgadikgadi Pans. Renowned for its strong conservation ethos, Botswana provides exclusive, low-impact safaris with incredible predator sightings and the largest elephant population in Africa.",
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
    longDescription: "Namibia is a land of otherworldly landscapes and stark beauty. Towering red sand dunes in Sossusvlei meet the vast, ancient Namib Desert. In the north, the salt pans of Etosha National Park draw incredible concentrations of wildlife, including the rare desert-adapted rhino and elephant. With a rich blend of African and German cultures, thrilling adventure in Swakopmund, and breathtaking scenery at every turn, Namibia is a photographer's dream.",
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
    longDescription: "Zambia is considered one of Africa's best-kept secrets and the undisputed home of the walking safari. It offers large, unspoiled national parks like South Luangwa and Lower Zambezi, where you can experience the thrill of tracking wildlife on foot. Sharing the mighty Victoria Falls with Zimbabwe, Zambia provides access to the legendary Devil's Pool. With exceptional leopard sightings and thrilling night drives, Zambia delivers an authentic, raw, and immersive safari adventure.",
    activities: [],
    accommodation: [],
    wildlife: ["Leopard", "Lion", "Elephant", "Hippo", "Wild Dog"],
    coordinates: { lat: -13.1339, lng: 27.8493 },
    knownPlaces: ["Zambia", "Livingstone", "Devil's Pool", "South Luangwa", "Lower Zambezi", "Kafue National Park"]
  }
];
