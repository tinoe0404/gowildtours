export type PackageCategory =
    | "Wildlife Safari"
    | "Cultural Tour"
    | "Adventure"
    | "Photography"
    | "Honeymoon"
    | "Family"
    | "Solo"
    | "History"
    | "Education"
    | "Budget"
    | "Luxury"
    | "Group";

export type DifficultyLevel = "Easy" | "Moderate" | "Challenging";

export interface Package {
    id: string;
    slug: string;
    title: string;
    category: PackageCategory[] | string;
    destinations?: string[];
    shortDescription?: string;
    longDescription?: string;
    description?: string;
    duration: {
        days: number;
        nights: number;
    } | string;
    groupSize?: {
        min: number;
        max: number;
        type: "Private" | "Small Group" | "Large Group";
    };
    difficulty?: DifficultyLevel | string;
    price: number;
    featured?: boolean;
    isFeatured?: boolean;
    bestSeller?: boolean;
    newPackage?: boolean;
    isPublished?: boolean;
    image?: string;
    images: string[];
    inclusions: string[];
    highlights: string[];
}

export const packages: Package[] = [
    {
        id: "1",
        slug: "victoria-falls-express",
        title: "Victoria Falls Express",
        category: ["Adventure", "Family"],
        destinations: ["Victoria Falls"],
        shortDescription:
            "A quick but immersive 3-day getaway to the majestic Victoria Falls. Includes a sunset cruise and guided tour of the Falls.",
        longDescription:
            "Experience the power of the Smoke that Thunders on this packed 3-day adventure. Perfect for those with limited time who want to see the best of Victoria Falls. You'll enjoy a guided tour of the falls, a relaxing sunset cruise on the Zambezi River, and plenty of free time to explore the town or add optional activities like helicopter flights or white water rafting.",
        duration: { days: 3, nights: 2 },
        groupSize: { min: 2, max: 12, type: "Small Group" },
        difficulty: "Easy",
        price: 450,
        featured: false,
        bestSeller: true,
        newPackage: false,
        image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1920&q=80",
            "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1920&q=80",
            "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80",
        ],
        inclusions: [
            "2 Nights Accommodation",
            "Daily Breakfast",
            "Airport Transfers",
            "Guided Tour of Falls",
            "Sunset Cruise",
        ],
        highlights: [
            "Witness the grandeur of Victoria Falls",
            "Sunset cruise on the Zambezi",
            "Local market visit",
        ],
    },
    {
        id: "2",
        slug: "hwange-safari-adventure",
        title: "Hwange Safari Adventure",
        category: ["Wildlife Safari", "Family"],
        destinations: ["Hwange National Park"],
        shortDescription:
            "Dive deep into Zimbabwe's largest game reserve. 5 days of thrilling game drives and luxury camping.",
        longDescription:
            "Discover the incredible biodiversity of Hwange National Park on this 5-day safari. Known for its massive elephant herds, Hwange offers some of the best game viewing in Africa. Stay in a comfortable bush camp, enjoy morning and afternoon game drives with expert guides, and spend your evenings around the campfire under the stars.",
        duration: { days: 5, nights: 4 },
        groupSize: { min: 2, max: 8, type: "Small Group" },
        difficulty: "Moderate",
        price: 1850,
        featured: true,
        bestSeller: true,
        newPackage: false,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
        ],
        inclusions: [
            "4 Nights Luxury Tented Camp",
            "All Meals and Drinks",
            "2 Game Drives Daily",
            "Park Fees",
            "Return Transfers from Victoria Falls",
        ],
        highlights: [
            "Huge elephant herds",
            "Walking safaris",
            "Sundowners at waterholes",
        ],
    },
    {
        id: "3",
        slug: "mana-pools-walking-safari",
        title: "Mana Pools Walking Safari",
        category: ["Wildlife Safari", "Adventure", "Photography"],
        destinations: ["Mana Pools"],
        shortDescription:
            "A premium 7-day walking safari in the UNESCO World Heritage site of Mana Pools. Get close to nature on foot.",
        longDescription:
            "For the true adventurer, nothing beats a walking safari in Mana Pools. This 7-day expedition takes you deep into the heart of the Zambezi Valley. Led by top professional guides, you'll track wildlife on foot, canoe past hippos, and sleep in fly camps on the riverbanks. It's an intimate, adrenaline-filled way to experience the bush.",
        duration: { days: 7, nights: 6 },
        groupSize: { min: 2, max: 6, type: "Small Group" },
        difficulty: "Challenging",
        price: 3200,
        featured: true,
        bestSeller: false,
        newPackage: false,
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80",
            "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=1920&q=80",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
        ],
        inclusions: [
            "6 Nights Fly Camp / Lodge",
            "All Meals",
            "Professional Walking Guide",
            "Canoe Safari Included",
            "Charter Flights from Harare",
        ],
        highlights: [
            "Walking with wild dogs",
            "Canoeing the Zambezi",
            "Sleeping under the stars",
        ],
    },
    {
        id: "4",
        slug: "zimbabwe-grand-tour",
        title: "Zimbabwe Grand Tour",
        category: ["Wildlife Safari", "Cultural Tour", "Honeymoon"],
        destinations: ["Victoria Falls", "Hwange", "Matobo Hills", "Mana Pools"],
        shortDescription:
            "The ultimate 14-day journey across Zimbabwe's top destinations. The complete safari experience.",
        longDescription:
            "Experience the very best of Zimbabwe in this comprehensive 14-day tour. From the thundering Victoria Falls to the granite domes of Matobo Hills, the vast plains of Hwange, and the riverine forests of Mana Pools. This tour combines luxury lodges, diverse landscapes, and incredible wildlife viewing for the trip of a lifetime.",
        duration: { days: 14, nights: 13 },
        groupSize: { min: 2, max: 8, type: "Private" },
        difficulty: "Moderate",
        price: 6800,
        featured: false,
        bestSeller: false,
        newPackage: true,
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1920&q=80",
            "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=1920&q=80",
            "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80",
        ],
        inclusions: [
            "13 Nights Premium Accommodation",
            "All Domestic Flights & Transfers",
            "Private Vehicle & Guide",
            "All Activities & Park Fees",
            "All Meals & Selected Drinks",
        ],
        highlights: [
            "Rhino tracking in Matobos",
            "Big Five in Hwange",
            "Scenic flight over Mana Pools",
        ],
    },
    {
        id: "5",
        slug: "honeymoon-safari-package",
        title: "Honeymoon Safari Deluxe",
        category: ["Honeymoon", "Wildlife Safari"],
        destinations: ["Victoria Falls", "Hwange"],
        shortDescription:
            "Romantic 10-day escape featuring majestic falls and intimate bush camps. Perfectly curated for couples.",
        longDescription:
            "Celebrate your love with a romantic 10-day safari. Start with luxury at Victoria Falls, then move to an exclusive camp in Hwange. Enjoy private dinners under the stars, couple's spa treatments, and sunset boat cruises. We handle every detail so you can focus on each other and the magic of Africa.",
        duration: { days: 10, nights: 9 },
        groupSize: { min: 2, max: 2, type: "Private" },
        difficulty: "Easy",
        price: 5500,
        featured: true,
        bestSeller: false,
        newPackage: false,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80",
            "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e099945?w=1920&q=80",
        ],
        inclusions: [
            "9 Nights Luxury Honeymoon Suites",
            "Private Dinners",
            "Spa Treatments",
            "Helicopter Flight over Falls",
            "All Transfers & Flights",
        ],
        highlights: [
            "Private plunge pools",
            "Candlelit bush dinners",
            "Exclusive vehicle use",
        ],
    },
    {
        id: "6",
        slug: "family-safari-adventure",
        title: "Family Safari Adventure",
        category: ["Family", "Wildlife Safari"],
        destinations: ["Victoria Falls", "Hwange"],
        shortDescription:
            "A 6-day fun-filled itinerary designed for families. Kid-friendly activities and safe, comfortable lodges.",
        longDescription:
            "Bring the whole family! This 6-day package is tailored for all ages. We choose lodges with family suites and pools, and activities that engage kids like junior ranger programs and visits to animal sanctuaries. It's the perfect mix of relaxation for parents and excitement for the children.",
        duration: { days: 6, nights: 5 },
        groupSize: { min: 3, max: 10, type: "Private" },
        difficulty: "Easy",
        price: 2100,
        featured: false,
        bestSeller: true,
        newPackage: false,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
            "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1920&q=80",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
        ],
        inclusions: [
            "5 Nights Family Accommodation",
            "Junior Ranger Activities",
            "Private Vehicle",
            "All Meals",
            "Babysitting Services Available",
        ],
        highlights: [
            "Elephant encounters",
            "Vulture feeding viewing",
            "Family-friendly lodges",
        ],
    },
    {
        id: "7",
        slug: "photography-safari-special",
        title: "Photography Safari Special",
        category: ["Photography", "Wildlife Safari"],
        destinations: ["Mana Pools", "Hwange"],
        shortDescription:
            "8 days dedicated to capturing the perfect shot. Specialized vehicles and expert photographic guides.",
        longDescription:
            "Join renowned wildlife photographers on this 8-day specialist tour. You'll visit photogenic hides in Hwange and the magical light of Mana Pools. Our vehicles are modified for photography with beanbag mounts and 360-degree swivel seats. Includes image review sessions and post-processing workshops.",
        duration: { days: 8, nights: 7 },
        groupSize: { min: 2, max: 6, type: "Small Group" },
        difficulty: "Moderate",
        price: 4200,
        featured: false,
        bestSeller: false,
        newPackage: true,
        image: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=1920&q=80",
            "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
        ],
        inclusions: [
            "7 Nights Lodge/Camp",
            "Photography Tuition",
            "Specialized Vehicle",
            "Extra Luggage Allowance",
            "All Meals",
        ],
        highlights: [
            "Golden hour shoots",
            "Underground hides",
            "Editing workshops",
        ],
    },
    {
        id: "8",
        slug: "cultural-heritage-tour",
        title: "Cultural Heritage Tour",
        category: ["Cultural Tour", "History"],
        destinations: ["Great Zimbabwe", "Matobo Hills"],
        shortDescription:
            "Discover the ancient soul of Zimbabwe. 5 days exploring Great Zimbabwe ruins and Matobo's rock art.",
        longDescription:
            "Step back in time on this 5-day cultural journey. Explore the Great Zimbabwe Ruins, the largest ancient structure in sub-Saharan Africa. Then travel to Matobo Hills to see thousands-year-old San rock art and Cecil John Rhodes' grave. A profound journey into the history and spirit of the land.",
        duration: { days: 5, nights: 4 },
        groupSize: { min: 4, max: 12, type: "Small Group" },
        difficulty: "Easy",
        price: 1350,
        featured: false,
        bestSeller: false,
        newPackage: false,
        image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
            "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1920&q=80",
        ],
        inclusions: [
            "4 Nights Hotel/Lodge",
            "Expert Historical Guide",
            "Museum Entry Fees",
            "Transport in Minibus",
            "Selected Meals",
        ],
        highlights: [
            "Great Zimbabwe Ruins",
            "San Rock Art",
            "Traditional village visits",
        ],
    },
    {
        id: "9",
        slug: "big-five-safari",
        title: "Big Five Safari",
        category: ["Wildlife Safari", "Adventure"],
        destinations: ["Hwange", "Matobo Hills"],
        shortDescription:
            "4 intense days tracking the Big Five. Rhino in Matobos and Lions/Elephants in Hwange.",
        longDescription:
            "Short on time but want to see it all? This 4-day express safari focuses on finding the Big Five (Lion, Leopard, Elephant, Buffalo, Rhino). You'll track Rhino on foot in Matobos and spend days with the massive herds of Hwange. High energy and high reward.",
        duration: { days: 4, nights: 3 },
        groupSize: { min: 2, max: 8, type: "Small Group" },
        difficulty: "Moderate",
        price: 1600,
        featured: false,
        bestSeller: true,
        newPackage: false,
        image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1920&q=80",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
            "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80",
        ],
        inclusions: [
            "3 Nights Lodge",
            "Rhino Tracking Permit",
            "Game Drives",
            "All Meals",
            "Transfer between parks",
        ],
        highlights: [
            "Foot tracking Rhinos",
            "Night game drives",
            "Checking off the Big Five",
        ],
    },
    {
        id: "10",
        slug: "zambezi-river-experience",
        title: "Zambezi River Experience",
        category: ["Adventure", "Budget"],
        destinations: ["Victoria Falls", "Zambezi River"],
        shortDescription:
            "3 days of water-based adventures. Rafting, canoeing, and sunset cruising on the mighty river.",
        longDescription:
            "Get wet and wild on the Zambezi! This 3-day package focuses on the river. Brave the white water rapids below the falls, take a calm canoe trip above them, and finish every day with a drink in hand watching the sunset reflection. Ideal for thrill-seekers on a budget.",
        duration: { days: 3, nights: 2 },
        groupSize: { min: 2, max: 10, type: "Small Group" },
        difficulty: "Challenging",
        price: 650,
        featured: false,
        bestSeller: false,
        newPackage: false,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
            "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1920&q=80",
            "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=1920&q=80",
        ],
        inclusions: [
            "2 Nights Lodge",
            "White Water Rafting",
            "Canoe Trip",
            "Sunset Cruise",
            "Breakfasts",
        ],
        highlights: [
            "Grade 5 Rapids",
            "Hippo watching",
            "Camping options available",
        ],
    },
    {
        id: "11",
        slug: "luxury-tented-camp-safari",
        title: "Luxury Tented Camp Safari",
        category: ["Luxury", "Wildlife Safari", "Honeymoon"],
        destinations: ["Hwange", "Mana Pools"],
        shortDescription:
            "7 days of pure indulgence. Stay in Zimbabwe's most exclusive tented camps with gourmet dining.",
        longDescription:
            "Experience the golden age of safari with a modern luxury twist. This 7-day tour stays at premier tented camps where canvas walls are the only thing separating you from the wild (along with 5-star service). Expect copper bathtubs, private plunge pools, and dining that rivals top city restaurants, all in the middle of nowhere.",
        duration: { days: 7, nights: 6 },
        groupSize: { min: 2, max: 6, type: "Private" },
        difficulty: "Easy",
        price: 4900,
        featured: false,
        bestSeller: false,
        newPackage: true,
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1920&q=80",
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=80",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80",
        ],
        inclusions: [
            "6 Nights Premium Tents",
            "All-Inclusive (Drinks & Laundry)",
            "Private Guide options",
            "Charter Flights",
            "Spa Credits",
        ],
        highlights: [
            "Sleeping under canvas in luxury",
            "Gourmet bush dinners",
            "Total seclusion",
        ],
    },
    {
        id: "12",
        slug: "solo-traveler-safari",
        title: "Solo Traveler Safari",
        category: ["Solo", "Wildlife Safari", "Group"],
        destinations: ["Victoria Falls", "Hwange"],
        shortDescription:
            "5 days designed for solo travelers. No single supplement dates available. Meet like-minded explorers.",
        longDescription:
            "Traveling alone doesn't mean you have to be lonely. This 5-day small group tour brings together solo adventurers. We've negotiated special rates with no single supplement on select dates. Enjoy communal dining, group game drives, and the chance to make new friends from around the world while exploring Zimbabwe.",
        duration: { days: 5, nights: 4 },
        groupSize: { min: 1, max: 8, type: "Small Group" },
        difficulty: "Moderate",
        price: 1550,
        featured: false,
        bestSeller: false,
        newPackage: false,
        image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80",
            "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1920&q=80",
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1920&q=80",
        ],
        inclusions: [
            "4 Nights Accommodation",
            "No Single Supplement",
            "Group Activities",
            "Welcome Dinner",
            "Transfers",
        ],
        highlights: [
            "Meeting new friends",
            "Safe group environment",
            "Shared adventures",
        ],
    },
    {
        id: "13",
        slug: "adventure-activities-package",
        title: "Adrenaline Junkie Package",
        category: ["Adventure", "Solo"],
        destinations: ["Victoria Falls"],
        shortDescription:
            "4 days of heart-pumping action: Bungee, rafting, zip-lining, and gorge swinging.",
        longDescription:
            "Victoria Falls is the adventure capital of Africa, and this package packs it all in. magnificent 4 days including the terrifying Gorge Swing, the 111m Bungee Jump, White Water Rafting, and a Helicopter flight. Not for the faint-hearted! Includes accommodation in town close to the nightlife.",
        duration: { days: 4, nights: 3 },
        groupSize: { min: 1, max: 20, type: "Large Group" },
        difficulty: "Challenging",
        price: 850,
        featured: false,
        bestSeller: false,
        newPackage: false,
        image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&q=80",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
            "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=1920&q=80",
        ],
        inclusions: [
            "3 Nights Hotel",
            "Activity Pass (Bungee, Raft, Swing)",
            "Helicopter Flight",
            "Sunset Cruise",
            "Breakfasts",
        ],
        highlights: [
            "111m Bungee Jump",
            "Flight of Angels",
            "Party boat cruise",
        ],
    },
    {
        id: "14",
        slug: "conservation-safari",
        title: "Conservation Safari",
        category: ["Wildlife Safari", "Cultural Tour", "Education"],
        destinations: ["Hwange", "Victoria Falls"],
        shortDescription:
            "10 days engaged in wildlife protection. Visit anti-poaching units and wild dog research centers.",
        longDescription:
            "Go beyond the typical tourist experience and contribute to saving Africa's wildlife. This 10-day tour takes you behind the scenes. You'll visit the Painted Dog Conservation center, go out with anti-poaching units (safe areas), and learn from researchers. A portion of this trip cost goes directly to conservation efforts.",
        duration: { days: 10, nights: 9 },
        groupSize: { min: 2, max: 8, type: "Small Group" },
        difficulty: "Moderate",
        price: 3600,
        featured: false,
        bestSeller: false,
        newPackage: true,
        image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=1920&q=80",
            "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1920&q=80",
            "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80",
        ],
        inclusions: [
            "9 Nights Accommodation",
            "Donation to Conservation",
            "Talks by researchers",
            "Visit to Conservation Centers",
            "All Meals",
        ],
        highlights: [
            "Collaring demonstration",
            "Anti-poaching unit meet & greet",
            "Making a real difference",
        ],
    },
    {
        id: "15",
        slug: "birding-safari-specialist",
        title: "Birding Specialist Tour",
        category: ["Wildlife Safari", "Photography", "Education"],
        destinations: ["Eastern Highlands", "Mana Pools"],
        shortDescription:
            "6 days searching for regional endemics. From the mountains to the valley with an expert birder.",
        longDescription:
            "Zimbabwe is a birder's paradise with over 600 species. This 6-day tour splits time between the mountainous Eastern Highlands (forest species) and the Zambezi Valley (water & raptors). Led by a specialist birding guide who knows the calls and habits of the rarest lifers.",
        duration: { days: 6, nights: 5 },
        groupSize: { min: 2, max: 6, type: "Small Group" },
        difficulty: "Moderate",
        price: 2400,
        featured: false,
        bestSeller: false,
        newPackage: false,
        image: "https://images.unsplash.com/photo-1551893478-d726eaf0442c?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1551893478-d726eaf0442c?w=1920&q=80",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
            "https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=1920&q=80",
        ],
        inclusions: [
            "5 Nights Specialist Lodges",
            "Top Birding Guide",
            "Checklists provided",
            "Boat & Walking options",
            "All Meals",
        ],
        highlights: [
            "Searching for Pels Fishing Owl",
            "Swynnerton's Robin in forests",
            "Carmine Bee-eater colonies",
        ],
    },
];
