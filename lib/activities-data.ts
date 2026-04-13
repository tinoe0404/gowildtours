export type ActivityCategory =
    | "Wildlife"
    | "Adventure"
    | "Water"
    | "Cultural"
    | "Air"
    | "Day Trips"
    | "Seasonal";

export type DifficultyLevel = "Easy" | "Moderate" | "Challenging";

export interface Activity {
    id: string;
    slug: string;
    title: string;
    category: ActivityCategory;
    shortDescription: string;
    longDescription: string;
    duration: {
        value: number;
        unit: "Hours" | "Days";
        display: string; // e.g., "Half Day (4 Hours)"
    };
    groupSize: {
        min: number;
        max: number;
    };
    difficulty: DifficultyLevel;
    price: {
        amount: number;
        currency: string;
        per: "Person" | "Group" | "Flight";
    };
    location: string;
    featured: boolean;
    popular: boolean;
    seasonal: boolean;
    image: string;
    images: string[];
    inclusions: string[];
    whatToBring: string[];
    highlights: string[];
}

export const activities: Activity[] = [
    // ── Wildlife ─────────────────────────────────────────────────────────
    {
        id: "1",
        slug: "morning-game-drive-hwange",
        title: "Morning Game Drive - Hwange",
        category: "Wildlife",
        shortDescription:
            "Explre Hwange National Park at dawn when predators are most active. A 4-hour guided safari experience.",
        longDescription:
            "Set out before sunrise in an open 4x4 vehicle to witness the bush coming alive. Morning is the prime time to see big cats on the move before the heat of the day sets in. Your expert guide will track lions, leopards, and wild dogs, while also pointing out the diverse birdlife and smaller creatures that make the ecosystem tick. Coffee and rusks are served at a scenic stop.",
        duration: { value: 4, unit: "Hours", display: "Half Day (4 Hours)" },
        groupSize: { min: 2, max: 10 },
        difficulty: "Easy",
        price: { amount: 80, currency: "USD", per: "Person" },
        location: "Hwange National Park",
        featured: true,
        popular: true,
        seasonal: false,
        image: "/images/safari/elephants-fighting.jpg",
        images: [
            "/images/safari/leopard-tree.jpg",
            "/images/safari/hippos-mud.jpg",
            "/images/safari/buffalo-grazing.jpg",
        ],
        inclusions: ["Professional Guide", "4x4 Vehicle", "Morning Coffee/Tea", "Park Fees"],
        whatToBring: ["Camera", "Binoculars", "Warm Jacket (Winter)", "Sunscreen"],
        highlights: ["Active predators", "Morning light for photography", "Coffee stop in the bush"],
    },
    {
        id: "2",
        slug: "night-safari-experience",
        title: "Night Safari Experience",
        category: "Wildlife",
        shortDescription:
            "Discover the secrets of the African night. Spot nocturnal species like genets, civets, and maybe a leopard.",
        longDescription:
            "The bush changes completely after dark. Using a powerful spotlight, your guide will help you spot distinctive nocturnal wildlife that remains hidden during the day. Look out for springhares, porcupines, genets, and civets. Watching a lion hunt under the cover of darkness is a spine-tingling experience you'll never forget.",
        duration: { value: 3, unit: "Hours", display: "Evening (3 Hours)" },
        groupSize: { min: 2, max: 8 },
        difficulty: "Easy",
        price: { amount: 120, currency: "USD", per: "Person" },
        location: "Victoria Falls Private Reserve",
        featured: false,
        popular: true,
        seasonal: false,
        image: "/images/safari/elephants-waterhole.jpg",
        images: [
            "/images/safari/elephants-swimming.jpg",
            "/images/safari/river-aerial.jpg",
        ],
        inclusions: ["Spotlight", "Professional Guide", "Blankets", "Beverages"],
        whatToBring: ["Warm Clothing", "Camera (Low Light Capable)"],
        highlights: ["Nocturnal species", "Star gazing", "Sounds of the night"],
    },
    {
        id: "3",
        slug: "walking-safari-tracker",
        title: "Walking Safari with Tracker",
        category: "Wildlife",
        shortDescription:
            "Step out of the vehicle and into the wild. Track animals on foot for an intimate perspective.",
        longDescription:
            "Led by a fully armed Professional Guide, a walking safari focuses on the small details you miss in a car—tracks, dung, insects, and plants. It’s also an adrenaline rush when you approach large game like elephants or buffalo on foot, maintaining safe and respectful distances. This is safari at its most primal.",
        duration: { value: 3, unit: "Hours", display: "Morning (3 Hours)" },
        groupSize: { min: 2, max: 6 },
        difficulty: "Moderate",
        price: { amount: 100, currency: "USD", per: "Person" },
        location: "Hwange National Park",
        featured: true,
        popular: false,
        seasonal: true,
        image: "/images/safari/hippos-mud.jpg",
        images: [
            "/images/safari/elephants-swimming.jpg",
            "/images/safari/river-aerial.jpg",
        ],
        inclusions: ["Armed Pro Guide", "Water", "Snacks"],
        whatToBring: ["Walking Shoes (Neutral Color)", "Hat", "Sunscreen", "No bright colors"],
        highlights: ["Tracking skills", "Up-close encounters", "Focus on little 5"],
    },
    {
        id: "4",
        slug: "big-five-photography-tour",
        title: "Big Five Photography Tour",
        category: "Wildlife",
        shortDescription:
            "A full-day safari dedicated to capturing the perfect shot. Customized vehicle and guide.",
        longDescription:
            "Designed for serious photographers, this tour allows you to stay as long as needed at sightings to get the perfect light and angle. Your vehicle has bean bag mounts and swivel seats. Your guide understands positioning for lighting and anticipating animal behavior.",
        duration: { value: 8, unit: "Hours", display: "Full Day" },
        groupSize: { min: 1, max: 4 },
        difficulty: "Easy",
        price: { amount: 200, currency: "USD", per: "Person" },
        location: "Hwange National Park",
        featured: false,
        popular: false,
        seasonal: false,
        image: "/images/safari/hippos-mud.jpg",
        images: [
            "/images/safari/leopard-tree.jpg",
            "/images/safari/lioness-rain.jpg",
        ],
        inclusions: ["Private Vehicle", "Photographic Guide", "Lunch", "All Drinks"],
        whatToBring: ["Camera Gear", "Extra Batteries", "Memory Cards", "Hat"],
        highlights: ["Golden hour shoots", "Patience at sightings", "Expert advice"],
    },

    // ── Adventure ────────────────────────────────────────────────────────
    {
        id: "5",
        slug: "white-water-rafting",
        title: "White Water Rafting",
        category: "Adventure",
        shortDescription:
            "Conquer the mighty Zambezi. Grade 5 rapids make this one of the best one-day rafting trips in the world.",
        longDescription:
            "Rafting the Zambezi below Victoria Falls is legendary. You'll navigate over 20 rapids, including the famous 'Stairway to Heaven' and 'The Mother'. Between the adrenaline-pumping rapids, float through the stunning Batoka Gorge. No experience necessary, but a reasonable fitness level is required.",
        duration: { value: 7, unit: "Hours", display: "Full Day" },
        groupSize: { min: 4, max: 50 },
        difficulty: "Challenging",
        price: { amount: 145, currency: "USD", per: "Person" },
        location: "Victoria Falls (Batoka Gorge)",
        featured: true,
        popular: true,
        seasonal: true,
        image: "/images/safari/leopard-tree.jpg",
        images: [
            "/images/safari/elephant-tusker.jpg",
            "/images/safari/elephants-fighting.jpg",
        ],
        inclusions: ["Gear (Helmet, Life Jacket)", "Lunch", "Transfers", "Guides"],
        whatToBring: ["Swimwear", "Sunscreen", "GoPro (with strap)"],
        highlights: ["Grade 5 Rapids", "Batoka Gorge Scenery", "Swimming in calm sections"],
    },
    {
        id: "6",
        slug: "bungee-jump-victoria-falls",
        title: "Bungee Jump - Victoria Falls",
        category: "Adventure",
        shortDescription:
            "111 meters of pure adrenaline. Jump from the Victoria Falls Bridge towards the Zambezi River.",
        longDescription:
            "One of the most scenic bungee jumps in the world. Launch yourself off the historic Victoria Falls Bridge with the falls thundering behind you. You’ll free-fall for 4 seconds before the cord catches you just above the boiling rapids of the Zambezi.",
        duration: { value: 2, unit: "Hours", display: "2 Hours" },
        groupSize: { min: 1, max: 20 },
        difficulty: "Challenging",
        price: { amount: 160, currency: "USD", per: "Person" },
        location: "Victoria Falls Bridge",
        featured: true,
        popular: true,
        seasonal: false,
        image: "/images/safari/elephant-front.jpg",
        images: ["/images/safari/wildebeest.jpg"],
        inclusions: ["Safety Briefing", "Jump", "Transfers"],
        whatToBring: ["Courage", "Closed shoes"],
        highlights: ["111m Drop", "Bridge views", "Personal achievement"],
    },
    {
        id: "7",
        slug: "gorge-swing-adventure",
        title: "Gorge Swing Adventure",
        category: "Adventure",
        shortDescription:
            "Freefall 70 meters before swinging out across the devastatingly beautiful Batoka Gorge.",
        longDescription:
            "If bungee isn't your thing, try the Gorge Swing. You step off the edge and freefall for 70 meters before the rope swings you in a massive 95-meter arc. It’s a giant swing for adults, set in one of the most dramatic landscapes on earth.",
        duration: { value: 2, unit: "Hours", display: "2 Hours" },
        groupSize: { min: 1, max: 10 },
        difficulty: "Moderate",
        price: { amount: 120, currency: "USD", per: "Person" },
        location: "Victoria Falls",
        featured: false,
        popular: false,
        seasonal: false,
        image: "/images/safari/lioness-rain.jpg",
        images: ["/images/safari/river-aerial.jpg"],
        inclusions: ["Harness", "Briefing", "Transfers"],
        whatToBring: ["Comfortable clothes", "Closed shoes"],
        highlights: ["Zero gravity feeling", "Gorge views", "Tandem options available"],
    },
    {
        id: "8",
        slug: "zip-line-canopy-tour",
        title: "Zip-line Canopy Tour",
        category: "Adventure",
        shortDescription:
            "Glide through the forest canopy and across the gorge on a series of zip lines and slides.",
        longDescription:
            "A fun activity for the whole family. The canopy tour consists of 9 slides and 1 cable bridge walk within the Batoka Gorge. You'll zigzag across the gorge, offering bird’s eye views of the river and falls below.",
        duration: { value: 3, unit: "Hours", display: "Half Day (3 Hours)" },
        groupSize: { min: 2, max: 10 },
        difficulty: "Easy",
        price: { amount: 95, currency: "USD", per: "Person" },
        location: "Victoria Falls",
        featured: false,
        popular: true,
        seasonal: false,
        image: "/images/safari/hippos-mud.jpg",
        images: ["/images/safari/river-aerial.jpg"],
        inclusions: ["Harness", "Guide", "Water"],
        whatToBring: ["Sunscreen", "Small backpack"],
        highlights: ["Gorge views", "Family friendly", "Canopy birds"],
    },

    // ── Water ────────────────────────────────────────────────────────────
    {
        id: "9",
        slug: "sunset-zambezi-cruise",
        title: "Sunset Zambezi Cruise",
        category: "Water",
        shortDescription:
            "Relax with a drink in hand as you watch the African sun set over the Zambezi River.",
        longDescription:
            "The classic Victoria Falls experience. Board a luxury pontoon and cruise the upper Zambezi. Spot hippos, crocodiles, and elephants coming to drink. As the sun dips below the horizon, the sky turns a brilliant orange—perfect for photography.",
        duration: { value: 2.5, unit: "Hours", display: "Evening (2.5 Hours)" },
        groupSize: { min: 2, max: 40 },
        difficulty: "Easy",
        price: { amount: 65, currency: "USD", per: "Person" },
        location: "Zambezi River (Victoria Falls)",
        featured: true,
        popular: true,
        seasonal: false,
        image: "/images/safari/elephant-tusker.jpg",
        images: [
            "/images/safari/elephants-swimming.jpg",
            "/images/safari/elephant-front.jpg",
        ],
        inclusions: ["Unlimited Drinks", "Canapés", "Transfers"],
        whatToBring: ["Camera", "Light jacket", "Sunglasses"],
        highlights: ["Sunset views", "Hippo sightings", "Relaxed atmosphere"],
    },
    {
        id: "10",
        slug: "canoeing-safari-upper-zambezi",
        title: "Canoeing Safari - Upper Zambezi",
        category: "Water",
        shortDescription:
            "Paddle your own canoe through the calm channels of the Zambezi. A perfect mix of activity and wildlife.",
        longDescription:
            "Take the helm of a stable two-man canoe. Guided by professional river guides, you'll drift past pods of hippos and observe wildlife on the banks from a unique water-level perspective. The route follows the specialized channels of the Kandahar Island area.",
        duration: { value: 4, unit: "Hours", display: "Half Day (4 Hours)" },
        groupSize: { min: 2, max: 12 },
        difficulty: "Moderate",
        price: { amount: 110, currency: "USD", per: "Person" },
        location: "Zambezi National Park",
        featured: false,
        popular: false,
        seasonal: false,
        image: "/images/safari/buffalo-grazing.jpg",
        images: ["/images/safari/river-aerial.jpg"],
        inclusions: ["Canoe & Paddle", "Guide", "Snacks/Drinks", "Transfers"],
        whatToBring: ["Hat", "Sunscreen", "Quick-dry clothes", "Sandals"],
        highlights: ["Birdwatching", "Silent approach to wildlife", "Scenic beauty"],
    },
    {
        id: "11",
        slug: "devils-pool-swim",
        title: "Devil's Pool Swim",
        category: "Water",
        shortDescription:
            "The ultimate infinity pool. Swim to the edge of the Victoria Falls during low water season.",
        longDescription:
            "A bucket-list experience. Take a boat to Livingstone Island, then swim across to Devil's Pool—a natural rock pool right on the lip of the falls. You can peer over the edge into the abyss 100m below. Only available during the dry season (usually Aug - Jan).",
        duration: { value: 3, unit: "Hours", display: "Morning/Afternoon" },
        groupSize: { min: 1, max: 12 },
        difficulty: "Moderate",
        price: { amount: 120, currency: "USD", per: "Person" },
        location: "Livingstone Island (Zambia side)",
        featured: true,
        popular: true,
        seasonal: true,
        image: "/images/safari/leopard-tree.jpg",
        images: ["/images/safari/elephants-fighting.jpg"],
        inclusions: ["Boat Transfer", "Island Tour", "Meal", "Guide"],
        whatToBring: ["Swimwear", "Towel", "Passport (if crossing border)"],
        highlights: ["Sitting on the edge of the falls", "Livingstone Island", "Adrenaline"],
    },
    {
        id: "12",
        slug: "fishing-trip-zambezi",
        title: "Fishing Trip - Full Day",
        category: "Water",
        shortDescription:
            "Cast a line for the ferocious Tiger Fish. Full day catch-and-release fishing on the Zambezi.",
        longDescription:
            "The Upper Zambezi offers some of the best freshwater fishing in Africa. Target the fighting Tiger Fish or Bream. Our boats are fully equipped with tackle and experienced skippers who know the best spots. Enjoy a picnic lunch on an island.",
        duration: { value: 8, unit: "Hours", display: "Full Day" },
        groupSize: { min: 1, max: 4 },
        difficulty: "Easy",
        price: { amount: 180, currency: "USD", per: "Person" },
        location: "Zambezi River",
        featured: false,
        popular: false,
        seasonal: false,
        image: "/images/safari/buffalo-grazing.jpg",
        images: ["/images/safari/river-aerial.jpg"],
        inclusions: ["Boat & Fuel", "All Tackle & Bait", "Lunch & Drinks", "Guide"],
        whatToBring: ["Hat", "Polarized Sunglasses", "Sunscreen"],
        highlights: ["Fighting Tiger Fish", "River tranquility", "Bird spotting"],
    },

    // ── Cultural ─────────────────────────────────────────────────────────
    {
        id: "13",
        slug: "village-cultural-tour",
        title: "Village Cultural Tour",
        category: "Cultural",
        shortDescription:
            "Visit a local homestead and learn about rural Zimbabwean life, traditions, and customs.",
        longDescription:
            "Move away from the tourist centers and visit a real rural village. You'll meet the headman, see how daily tasks are performed, visit the local school, and gain a genuine understanding of local culture. This is a respectful, educational tour that benefits the community.",
        duration: { value: 4, unit: "Hours", display: "Half Day" },
        groupSize: { min: 2, max: 20 },
        difficulty: "Easy",
        price: { amount: 60, currency: "USD", per: "Person" },
        location: "Monde Village (near Vic Falls)",
        featured: false,
        popular: true,
        seasonal: false,
        image: "/images/safari/dunes-panorama.jpg",
        images: ["/images/safari/elephants-fighting.jpg"],
        inclusions: ["Transfers", "Guide", "Donation to village", "Water"],
        whatToBring: ["Camera (ask permission)", "Small denominations for crafts"],
        highlights: ["Meeting local people", "School visit", "Authentic lifestyle"],
    },
    {
        id: "14",
        slug: "traditional-dance-boma-dinner",
        title: "Traditional Dance & Boma Dinner",
        category: "Cultural",
        shortDescription:
            "A feast of African cuisine accompanied by energetic traditional drumming and dancing.",
        longDescription:
            "A legendary dining experience. Enjoy a four-course buffet focusing on local game meats and traditional dishes. During dinner, you'll be entertained by Amakwezi dancers, singers, and the famous drum show. Be prepared to join in the drumming!",
        duration: { value: 3, unit: "Hours", display: "Evening (3 Hours)" },
        groupSize: { min: 1, max: 100 },
        difficulty: "Easy",
        price: { amount: 45, currency: "USD", per: "Person" },
        location: "Victoria Falls",
        featured: true,
        popular: true,
        seasonal: false,
        image: "/images/safari/river-aerial.jpg",
        images: ["/images/safari/elephants-fighting.jpg"],
        inclusions: ["Buffet Dinner", "Entertainment", "Transfers"],
        whatToBring: ["Appetite", "Jacket for evening"],
        highlights: ["Interactive drumming", "Mopane worms tasting", "Vibrant energy"],
    },
    {
        id: "15",
        slug: "craft-workshop-experience",
        title: "Craft Workshop Experience",
        category: "Cultural",
        shortDescription: "Learn the art of stone carving or basket weaving from local artisans.",
        longDescription:
            "Zimbabwe is famous for its Shona stone sculpture. in this workshop, you'll spend a few hours with a master sculptor learning the basics of selecting stone and carving tools. Alternatively, try your hand at weaving intricate ilala palm baskets.",
        duration: { value: 3, unit: "Hours", display: "3 Hours" },
        groupSize: { min: 2, max: 10 },
        difficulty: "Easy",
        price: { amount: 55, currency: "USD", per: "Person" },
        location: "Victoria Falls craft center",
        featured: false,
        popular: false,
        seasonal: false,
        image: "/images/safari/elephants-swimming.jpg",
        images: ["/images/safari/hippos-mud.jpg"],
        inclusions: ["Instructor", "Materials", "Keep your creation"],
        whatToBring: ["Clothes you don't mind getting dusty"],
        highlights: ["Hands-on creativity", "Taking home a souvenir you made"],
    },
    {
        id: "16",
        slug: "local-market-tour",
        title: "Local Market Tour",
        category: "Cultural",
        shortDescription:
            "Shop like a local. Visit the bustling markets to buy fabrics, fresh produce, and curio.",
        longDescription:
            "A guided walk through the town's markets. See where locals shop for vegetables and chitenge (fabric). Visit the curio market to bargain for souvenirs. Your guide will help you with translations and understanding the art of negotiation.",
        duration: { value: 2, unit: "Hours", display: "2 Hours" },
        groupSize: { min: 2, max: 15 },
        difficulty: "Easy",
        price: { amount: 30, currency: "USD", per: "Person" },
        location: "Victoria Falls Town",
        featured: false,
        popular: false,
        seasonal: false,
        image: "/images/safari/lioness-rain.jpg",
        images: ["/images/safari/elephants-fighting.jpg"],
        inclusions: ["Guide", "Transfers"],
        whatToBring: ["Cash (USD/local)", "Walking shoes"],
        highlights: ["Curio shopping", "Local interactions", "Bargaining"],
    },

    // ── Air ──────────────────────────────────────────────────────────────
    {
        id: "17",
        slug: "helicopter-flight-falls",
        title: "Helicopter Flight of Angels",
        category: "Air",
        shortDescription:
            "The only way to see the full scale of Victoria Falls. A 15-minute flight over the falls and gorges.",
        longDescription:
            "David Livingston wrote 'scenes so lovely must have been gazed upon by angels in their flight.' See what he meant. This flight circles the falls in both directions, giving you the ultimate photo opportunity and perspective of the zig-zagging Batoka gorge.",
        duration: { value: 0.25, unit: "Hours", display: "15 Minutes" },
        groupSize: { min: 1, max: 6 },
        difficulty: "Easy",
        price: { amount: 180, currency: "USD", per: "Person" },
        location: "Victoria Falls Helipad",
        featured: true,
        popular: true,
        seasonal: false,
        image: "/images/safari/elephants-swimming.jpg",
        images: ["/images/safari/leopard-tree.jpg"],
        inclusions: ["Transfers", "Flight", "Park Fees"],
        whatToBring: ["Camera", "Sunglasses"],
        highlights: ["Aerial views", "Photo opportunities", "Seeing the spray"],
    },
    {
        id: "18",
        slug: "microlight-flight",
        title: "Microlight Flight",
        category: "Air",
        shortDescription:
            "Wind in your hair, completely open cockpit. The rawest way to fly over the falls.",
        longDescription:
            "Fly over the falls in a motorized hang-glider. You are completely exposed to the elements for a thrilling, unobscured 30-minute view. The pilot can fly lower than helicopters, spotting game in the park before banking over the falls. Note: No loose items/cameras allowed (wing mounted cam available).",
        duration: { value: 0.5, unit: "Hours", display: "30 Minutes" },
        groupSize: { min: 1, max: 1 },
        difficulty: "Moderate",
        price: { amount: 200, currency: "USD", per: "Person" },
        location: "Livingstone (Zambia side)",
        featured: false,
        popular: true,
        seasonal: false,
        image: "/images/safari/elephants-swimming.jpg",
        images: ["/images/safari/dunes-panorama.jpg"],
        inclusions: ["Transfers", "Flight", "Digital Photos"],
        whatToBring: ["Warm jacket", "Closed shoes"],
        highlights: ["Wind in face", "Unrestricted views", "Pilot interaction"],
    },

    // ── Day Trips ────────────────────────────────────────────────────────
    {
        id: "20",
        slug: "tour-of-the-falls",
        title: "Guided Tour of Victoria Falls",
        category: "Day Trips",
        shortDescription:
            "A guided walking tour of the rainforest, visiting all the key viewpoints of the falls.",
        longDescription:
            "You can walk it alone, but a guide brings the forest to life. Learn about the geology, history, and flora of the Victoria Falls 'Rainforest'. Visit the Devil's Cataract, Main Falls, Horseshoe Falls, and Rainbow Falls. Your guide knows exactly where to stand for the best photos without getting soaked (or soaking only when you want to!).",
        duration: { value: 2.5, unit: "Hours", display: "2.5 Hours" },
        groupSize: { min: 2, max: 20 },
        difficulty: "Easy",
        price: { amount: 70, currency: "USD", per: "Person" },
        location: "Victoria Falls Rainforest",
        featured: true,
        popular: true,
        seasonal: false,
        image: "/images/safari/elephant-tusker.jpg",
        images: ["/images/safari/elephants-waterhole.jpg"],
        inclusions: ["Entrance Fees", "Guide", "Raincoats", "Water"],
        whatToBring: ["Camera (waterproof bag)", "Comfortable shoes"],
        highlights: ["Main Falls view", "Rainforest ecology", "Rainbows"],
    },
    {
        id: "21",
        slug: "chobe-day-trip",
        title: "Chobe Day Trip (Botswana)",
        category: "Day Trips",
        shortDescription:
            "Cross the border for a full day safari in Chobe National Park. Cruise and game drive.",
        longDescription:
            "Chobe is famous for having the highest concentration of elephants in Africa. This full-day trip includes a morning boat cruise on the Chobe River (incredible game viewing) and an afternoon 4x4 game drive. It’s a long day with border crossings, but absolutely worth it to see two countries in one trip.",
        duration: { value: 10, unit: "Hours", display: "Full Day" },
        groupSize: { min: 2, max: 12 },
        difficulty: "Moderate",
        price: { amount: 180, currency: "USD", per: "Person" },
        location: "Chobe NP, Botswana",
        featured: true,
        popular: true,
        seasonal: false,
        image: "/images/safari/elephant-tusker.jpg",
        images: ["/images/safari/river-aerial.jpg"],
        inclusions: [
            "Transfers",
            "Border Help",
            "Boat Cruise",
            "Game Drive",
            "Buffet Lunch",
            "Park Fees",
        ],
        whatToBring: ["Passport", "Visa fees (if applicable)", "Sunscreen"],
        highlights: ["Elephants swimming", "Buffet lunch", "Two safaris in one"],
    },
    {
        id: "22",
        slug: "livingstone-island-breezer",
        title: "Livingstone Island Breezer",
        category: "Day Trips",
        shortDescription: "Visit the island where David Livingstone first viewed the falls.",
        longDescription:
            "A thrilling boat ride through the channels takes you to Livingstone Island, perched on the edge of the falls. Take a guided tour of the island, learn its history, and enjoy a high tea (morning) or lunch with the roar of the water as your soundtrack. Does NOT include swimming in Devil's Pool.",
        duration: { value: 3, unit: "Hours", display: "Morning" },
        groupSize: { min: 2, max: 16 },
        difficulty: "Easy",
        price: { amount: 110, currency: "USD", per: "Person" },
        location: "Livingstone Island",
        featured: false,
        popular: false,
        seasonal: true,
        image: "/images/safari/dunes-moody.jpg",
        images: ["/images/safari/hippos-mud.jpg"],
        inclusions: ["Boat Transfer", "Guided Tour", "refreshments"],
        whatToBring: ["Camera", "Sun hat"],
        highlights: ["History", "Views from the edge", "Exclusive access"],
    },
];
