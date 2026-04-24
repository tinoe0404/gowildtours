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
    minGuests?: number;
    maxGuests?: number;
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
    exclusions?: string[];
    highlights: string[];
    itinerary?: any;
}

export const packages: Package[] = [
    {
        id: "1",
        slug: "hwange-and-botswana-wildlife",
        title: "Hwange and Botswana Wildlife",
        category: ["Wildlife Safari", "Adventure"],
        destinations: ["Victoria Falls", "Hwange National Park", "Chobe National Park", "Makgadikgadi Pans", "Okavango Delta", "Elephant Sands"],
        shortDescription:
            "This 11-day safari begins at Victoria Falls Airport and heads to Hwange National Park for thrilling game drives, then crosses into Botswana for Chobe, the Makgadikgadi Pans, and the Okavango Delta.",
        longDescription:
            "This 11-day safari begins at Victoria Falls Airport and heads to Hwange National Park for thrilling game drives in one of Africa's top wildlife destinations. It then returns to Victoria Falls to experience the iconic Victoria Falls. Crossing into Botswana, the journey continues to Chobe National Park for river cruises and game viewing. The tour proceeds to the vast Makgadikgadi Pans, followed by travel to Maun, gateway to the Okavango Delta, where mokoro rides and nature walks offer a unique perspective. A stop at Elephant Sands provides close-up elephant encounters. The safari concludes back in Victoria Falls, completing a diverse and memorable Southern African adventure.",
        duration: { days: 11, nights: 10 },
        groupSize: { min: 2, max: 12, type: "Small Group" },
        difficulty: "Moderate",
        price: 3500,
        featured: true,
        bestSeller: true,
        newPackage: false,
        image: "/images/safari/elephants-waterhole.jpg",
        images: [
            "/images/safari/elephants-waterhole.jpg",
            "/images/safari/victoria-falls-wide.jpg",
            "/images/safari/wild-dogs.jpg",
            "/images/safari/elephant-river.jpg",
        ],
        inclusions: [
            "10 nights accommodation at lodges/camps across Victoria Falls, Hwange National Park, Chobe National Park, Makgadikgadi Pans, Maun, Okavango Delta, and Elephant Sands",
            "All meals (breakfast, lunch, and dinner) throughout the tour",
            "All transfers and transport in comfortable safari vehicles",
            "Professional, experienced safari guides for the entire journey",
            "Airport transfer from Victoria Falls Airport",
            "Game drives in Hwange National Park",
            "Guided tour of the Victoria Falls",
            "Boat cruise and game viewing in Chobe National Park",
            "Sunset experience in Makgadikgadi Pans",
            "Mokoro rides and guided nature walks in the Okavango Delta",
            "Elephant viewing experience at Elephant Sands",
            "Park entry fees and conservation fees for all included activities",
        ],
        exclusions: [
            "International and domestic flights",
            "Visa fees for Zimbabwe and Botswana",
            "Travel insurance (medical, cancellation, and personal cover)",
            "Optional activities in Victoria Falls (e.g., helicopter flights, bungee jumping)",
            "Optional scenic flight over the Okavango Delta",
            "Alcoholic and non-alcoholic beverages not specified",
            "Personal expenses (laundry, souvenirs, tips, phone calls)",
            "Gratuities for guides, drivers, and lodge staff",
            "Meals not specified in the itinerary",
            "Early check-in and late check-out at lodges/camps",
            "Any additional excursions not listed in Hwange National Park, Chobe National Park, or Makgadikgadi Pans",
            "Government tax increases, park fee changes, or fuel surcharges (if applicable after booking)",
        ],
        highlights: [
            "Arrival at Victoria Falls Airport and transfer into the wilderness",
            "Exciting game drives in Hwange National Park, known for large elephant herds",
            "Guided tour of the spectacular Victoria Falls",
            "River safari and game viewing in Chobe National Park",
            "Scenic journey across the vast Makgadikgadi Pans with sunset experience",
            "Optional scenic flight over the Okavango Delta from Maun",
            "Mokoro canoe excursions and guided nature walks in the Okavango Delta",
            "Unique elephant encounters at Elephant Sands",
            "Diverse landscapes from rivers and wetlands to open savannah and salt pans",
            "Cross-border travel experience between Zimbabwe and Botswana",
        ],
        itinerary: [
            {
                day: 1,
                title: "Hwange National Park",
                description: "Hwange National Park is Zimbabwe's largest and most diverse wildlife reserve, known for its vast landscapes and abundant game. Located in the northwest of the country, it features open plains, teak forests, and waterholes that attract large concentrations of animals, especially during the dry season. Hwange is famous for its huge elephant population, one of the largest in Africa, as well as lions, buffalo, giraffes, zebras, and a variety of antelope species. The park is also a haven for birdlife and endangered species like African wild dogs. With fewer crowds than other parks, Hwange offers an authentic and peaceful safari experience rich in wildlife and natural beauty. The Painted Dog Conservation Project in Hwange National Park focuses on protecting Africa's endangered wild dogs. During a visit, guests learn about the species' behavior, social structure, and the challenges they face from habitat loss and human-wildlife conflict. The project offers an up-close experience with the dogs in a safe and controlled environment, observing their interactions, hunting instincts, and pack dynamics.",
                route: "Victoria Falls to Hwange — 4 hours — 200km",
                accommodation: "Miombo Safari Camp / Hwange Safari Lodge or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Painted Dog Conservation Project",
                optionalActivities: "Afternoon and night game drive in concession",
            },
            {
                day: 2,
                title: "Hwange National Park",
                description: "A full-day safari in Hwange National Park offers an immersive wildlife experience across one of Africa's most diverse ecosystems. Departing early, you spend the day exploring vast plains, woodlands, and waterholes that attract a wide range of animals. Expect to encounter large herds of elephants, buffalo, zebras, and giraffes, along with predators such as lions and possibly wild dogs. A packed lunch is enjoyed at a scenic rest spot, allowing time to relax while surrounded by nature. The extended game drive increases your chances of varied sightings and deeper exploration, making it ideal for photography and wildlife enthusiasts seeking a rich and rewarding safari experience.",
                accommodation: "Miombo Safari Camp / Hwange Safari Lodge or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Full day game drive",
            },
            {
                day: 3,
                title: "Victoria Falls",
                description: "A Zambezi dinner cruise on the Zambezi River offers a relaxing and scenic evening above Victoria Falls. Guests board a comfortable boat and glide along calm waters while enjoying stunning sunset views, often with silhouettes of wildlife such as elephants, hippos, and crocodiles along the riverbanks. As dusk settles, a freshly prepared multi-course dinner is served, featuring local and international cuisine, accompanied by drinks and attentive service. The peaceful atmosphere is enhanced by the sounds of nature and occasional bird calls. This experience combines fine dining with breathtaking scenery, making it a perfect way to unwind after a day of activities and one of the most memorable highlights of any Victoria Falls safari itinerary. From morning up to 4pm is set aside for optional activities in Victoria Falls, then around past 4pm you will be picked up for Zambezi River Sunset Dinner cruise which is the main highlight of the day, cruising in the Zambezi River and having drinks, alcohol and dinner included on the cruise. Likely back to the accommodation around past 8pm.",
                accommodation: "Victoria Falls Oasis Hotel / Telescope Boutique Lodge or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Dinner cruise",
                optionalActivities: "Morning game drive, Zipline, jetboat, city tour and many more",
            },
            {
                day: 4,
                title: "Victoria Falls",
                description: "It is a UNESCO World Heritage Site and is considered one of the largest and most famous waterfall system in the world. The area around Victoria Falls is known for various adrenaline pumping activities such as white-water rafting, bungee jumping and many more. After breakfast we go for guided tour of the Victoria Falls for 2-3 hours then lunch at Lookout Cafe — a stunning view of the Zambezi River, gorge and the Victoria Falls bridge — or at Baines restaurant overlooking the Zambezi River just the upper part of the Falls. Then the afternoon is free for optional activities and relaxing.",
                accommodation: "Victoria Falls Oasis Hotel / Telescope Boutique Lodge or similar",
                meals: "Lunch, Breakfast, Dinner",
                highlights: "Guided tour of the Falls",
                optionalActivities: "Afternoon game drive, helicopter flight, rafting, gorge swing and many more",
            },
            {
                day: 5,
                title: "Chobe National Park (Botswana)",
                description: "Chobe National Park is one of Africa's premier safari destinations, famous for its large elephant population and rich wildlife diversity. Located along the Chobe River, the park offers exceptional game viewing with frequent sightings of lions, buffalo, giraffes, zebras, and numerous bird species. A highlight of any visit is the afternoon to sunset boat cruise on the Chobe River. This relaxing experience provides a different perspective of the park, as animals gather along the riverbanks to drink and cool off. Elephants are often seen swimming, while hippos and crocodiles thrive in the water. As the sun sets, the sky reflects beautifully over the river, creating a peaceful and scenic end to the day, perfect for photography and unforgettable safari moments.",
                route: "Victoria Falls to Kasane — 2 hours — 90km",
                accommodation: "Tlou Safari Lodge / Two Rivers Hotel or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Afternoon boat cruise",
            },
            {
                day: 6,
                title: "Chobe National Park",
                description: "A safari in Chobe National Park offers unforgettable morning and afternoon game drives, each providing a unique wildlife experience. The early morning drive begins at sunrise, when temperatures are cool and animals are most active. Predators such as lions and leopards may still be on the move, while elephants, buffalo, and antelope gather near water sources to drink. After a midday rest, the afternoon game drive resumes as the heat eases. Wildlife becomes active again, and the golden light creates perfect conditions for photography. Herds of elephants — Chobe's signature attraction — are often seen in large numbers, alongside giraffes, zebras, and diverse birdlife. Both drives are led by experienced guides who track animals and share insights, ensuring a rich, educational, and thrilling safari experience in one of Africa's top wildlife destinations.",
                accommodation: "Tlou Safari Lodge / Two Rivers Hotel or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Morning and afternoon game drive",
            },
            {
                day: 7,
                title: "Makgadikgadi Salt Pans",
                description: "The Makgadikgadi Salt Pans are among the largest salt flats in the world, located in northeastern Botswana. These vast, shimmering plains are the remnants of an ancient super-lake that dried up thousands of years ago, leaving behind a surreal, lunar-like landscape of white salt crust stretching to the horizon. During the dry season, the pans appear barren and stark, offering dramatic scenery and incredible stargazing under clear skies. However, in the rainy season, parts of the pans fill with water, attracting thousands of flamingos and migratory birds, along with wildlife such as zebras and wildebeest during one of Africa's lesser-known migrations. Nearby areas like Nata Bird Sanctuary become vibrant with birdlife. Visitors can enjoy quad biking, guided walks with meerkats, and cultural experiences with local communities, making the Makgadikgadi a uniquely diverse and captivating destination.",
                route: "Kasane to Nata — 5 hours — 320km",
                accommodation: "Nata Lodge or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Pan drive — Makgadikgadi Salt Pans sunset pan drive",
            },
            {
                day: 8,
                title: "Okavango Delta",
                description: "An overnight excursion trip to the Okavango Delta offers a rewarding glimpse into one of Africa's most unique wetlands. The journey begins with a scenic road transfer to the delta's edge, where local guides welcome you. You then glide through narrow channels in a traditional mokoro, quietly navigating reed-lined waterways while spotting birds and aquatic life. Reaching a secluded island, you enjoy guided nature walks, learning about animal tracks, plants, and the delicate ecosystem. Wildlife such as antelope and smaller species may be seen. After a relaxing picnic and time to absorb the tranquil surroundings, you return by mokoro and transfer back to Maun the same day.",
                route: "Nata to Okavango Delta — 340km — 8 hours",
                accommodation: "Bush Camping",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Okavango day tour — Mokoro ride and nature walks",
            },
            {
                day: 9,
                title: "Maun",
                description: "It is the gateway into the Okavango Delta, Moremi and Kalahari for main tourists in Botswana. It is the tourism capital and administrative centre of Ngamiland district and the seat of power of the Batawana people. We drive passing between Nxai and Makgadikgadi national park enroute to Maun, high opportunity to see game. The afternoon is set aside to do optional scenic flight over the delta either small flight or helicopter.",
                route: "Okavango Delta to Maun — 40km — 3 hours",
                accommodation: "Sedia Hotel / Island Safari Lodge or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Nature walks and mokoro ride",
                optionalActivities: "Scenic flight over the Delta",
            },
            {
                day: 10,
                title: "Elephant Sands",
                description: "Elephant Sands is a conservancy in Botswana. Elephant Sands drills boreholes to provide supplemental water for the animals as they traverse the land escaping threats of human-wildlife conflict, poaching and drought. Elephants congregate at the natural waterhole right in front of the lodge.",
                route: "Maun to Nata — 6 hours — 370km",
                accommodation: "Elephant Sands Lodge or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Watching elephants drinking at the waterhole and afternoon game drive",
            },
            {
                day: 11,
                title: "Victoria Falls",
                description: "Victoria Falls serves as a natural border between Zambia and Zimbabwe approximately two-thirds of the falls located in Zimbabwe. The tour ends after lunch in Victoria Falls.",
                route: "Nata to Victoria Falls — 7 hours — 340km",
                accommodation: "Own arrangements",
                meals: "Lunch",
                highlights: "Tour concludes in Victoria Falls",
            },
        ],
    },
    {
        id: "2",
        slug: "7-days-etosha-and-desert",
        title: "7 Days Etosha and Desert",
        category: ["Wildlife Safari", "Adventure"],
        destinations: ["Windhoek", "Etosha National Park", "Swakopmund", "Sossusvlei", "Namib Desert"],
        shortDescription:
            "This 7-day Namibia tour offers a spectacular journey through the country's most iconic landscapes — from Etosha's wildlife to the towering red dunes of Sossusvlei.",
        longDescription:
            "This 7-day Namibia tour offers a spectacular journey through the country's most iconic landscapes. Starting in Windhoek, the capital, travelers explore its cultural sites before heading north to Etosha National Park for thrilling game drives, spotting elephants, lions, giraffes, and rare antelope against vast salt pans. The tour continues to visit Swakopmund on the Atlantic coast, offering adventure activities and a taste of German colonial architecture. The journey then moves to the iconic Sossusvlei in the Namib Desert, where towering red dunes and Deadvlei create surreal landscapes. The tour concludes with a scenic return to Windhoek, combining wildlife, history, culture, and desert vistas in one unforgettable Namibian adventure.",
        duration: { days: 7, nights: 8 },
        groupSize: { min: 2, max: 12, type: "Small Group" },
        difficulty: "Moderate",
        price: 2800,
        featured: true,
        bestSeller: true,
        newPackage: false,
        image: "/images/safari/dunes-moody.jpg",
        images: [
            "/images/safari/dunes-moody.jpg",
            "/images/safari/dead-tree-desert.jpg",
            "/images/safari/dunes-panorama.jpg",
            "/images/safari/oryx-dunes.jpg",
        ],
        inclusions: [
            "8 nights accommodation in carefully selected lodges, guesthouses, or camps",
            "All meals: Breakfast, lunch, and dinner as per itinerary",
            "Comfortable air-conditioned vehicles for transfers, road travel, and excursions",
            "Professional, experienced guides for game drives, cultural visits, and sightseeing",
            "Etosha National Park game drives — wildlife viewing of elephants, lions, rhinos, giraffes, zebras, and more",
            "Swakopmund exploration — adventure activities, coastal scenery, and German colonial architecture",
            "Sossusvlei and Deadvlei — climbing sand dunes, visiting salt pans, and desert photography",
        ],
        exclusions: [
            "International and regional flights to/from Windhoek or onward destinations",
            "Visas — Entry visas for Namibia $90 (if required)",
            "Travel insurance (medical, evacuation, or trip cancellation insurance)",
            "Optional activities not listed in the itinerary, such as skydiving, quad biking, or scenic flights over Sossusvlei",
            "Alcohol and soft drinks unless specifically included with meals",
            "Personal expenses (souvenirs, phone calls, laundry, tips, and gratuities)",
            "Medical requirements — vaccinations, malaria prophylaxis, or personal medications",
        ],
        highlights: [
            "Windhoek city tour: Explore Namibia's capital, cultural landmarks, and local markets",
            "Etosha National Park game drives: Spot elephants, lions, rhinos, giraffes, zebras, and diverse wildlife",
            "Swakopmund coastal town: Experience adventure activities, Atlantic coast scenery, and German colonial architecture",
            "Sossusvlei and Deadvlei: Climb iconic red sand dunes, explore salt pans, and photograph surreal desert landscapes",
            "Desert scenery and landscapes: Experience the Namib Desert, Damaraland, and rugged terrain",
            "Cultural and scenic stops: Learn about local communities and enjoy panoramic views across Namibia",
        ],
        itinerary: [
            {
                day: 1,
                title: "Etosha National Park",
                description: "Etosha National Park is one of Africa's premier wildlife destinations, covering over 22,000 square kilometers of diverse landscapes, including vast salt pans, savannahs, and woodlands. Renowned for its abundant wildlife, the park is home to elephants, lions, leopards, rhinos, giraffes, zebras, and numerous antelope species. Its unique waterholes attract animals year-round, making game viewing accessible even during the dry season. An afternoon game drive offers an excellent opportunity to observe wildlife as animals become more active in the cooler hours. Guided by experienced rangers, visitors track predators, watch herds gather at water sources, and capture stunning photographs, all while enjoying the park's dramatic sunsets and open landscapes.",
                route: "Windhoek to Etosha — 5 hours — 460km",
                accommodation: "Etosha Omusati Lodge / Eldorado Lodge or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Afternoon game drive",
            },
            {
                day: 2,
                title: "Etosha National Park",
                description: "Etosha National Park is a world-renowned safari destination, spanning over 22,000 square kilometers of salt pans, savannahs, and acacia woodlands. The park is home to a remarkable diversity of wildlife, including elephants, lions, leopards, rhinos, giraffes, zebras, and a variety of antelope species. Its permanent and seasonal waterholes provide excellent opportunities for observing animals in their natural habitats. A full-day game drive in Etosha allows travelers to explore deeper into the park with morning and afternoon excursions. Experienced guides track wildlife, explain animal behavior, and point out unique flora and fauna. Stops at waterholes offer close-up encounters, while the changing light throughout the day enhances photography and provides a complete safari experience across Etosha's striking landscapes.",
                accommodation: "Etosha Omusati Lodge / Eldorado Lodge or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Full day game drive",
            },
            {
                day: 3,
                title: "Swakopmund",
                description: "Swakopmund is a charming coastal town on Namibia's Atlantic coast, known for its blend of German colonial architecture, sandy beaches, and adventure activities. Often called the adventure capital of Namibia, it offers skydiving, quad biking, sandboarding, and scenic coastal tours, making it a hub for thrill-seekers and nature lovers alike. A Swakopmund city tour highlights its historic charm, including colonial-era buildings, the jetty, local markets, and museums that showcase the town's cultural heritage. Visitors can stroll along tree-lined streets, explore art galleries, and sample local cuisine. The tour combines history, culture, and seaside ambiance, offering a unique contrast to Namibia's desert and wildlife landscapes.",
                route: "Twyfelfontein to Swakopmund",
                accommodation: "Ocean House / Swakopmund Luxury Suites or similar",
                meals: "Breakfast",
                highlights: "City tour",
            },
            {
                day: 4,
                title: "Swakopmund",
                description: "A half-day Sandwich Harbour tour explores the dramatic meeting point of towering dunes and the Atlantic Ocean near Sandwich Harbour, within Namib-Naukluft National Park. Departing from Walvis Bay, you travel in a 4x4 along the beach and over golden dunes shaped by coastal winds. Along the way, spot flamingos, pelicans, and other birdlife in the lagoon. Guides share insights into the unique desert ecosystem and local history. The highlight is reaching Sandwich Harbour itself, where dunes plunge into the sea. The experience often includes scenic stops, photography opportunities, and light refreshments before returning.",
                accommodation: "Ocean House / Swakopmund Luxury Suites or similar",
                meals: "Breakfast",
                highlights: "Half day Sandwich Harbour tour",
                optionalActivities: "Skydiving, quad bikes, catamaran, dolphin cruise and many more",
            },
            {
                day: 5,
                title: "Sesriem / Namib Desert / Naukluft National Park",
                description: "The drive from Swakopmund to Sesriem is an epic journey through Namibia's diverse landscapes. Leaving Walvis Bay, the route crosses open plains dotted with wildlife and desert-adapted flora. Travelers pass the dramatic Moon Landscape, a barren expanse of eroded rock formations resembling a lunar surface. The road then traverses the Tropic of Capricorn, marked by a scenic stop for photographs. A highlight along the route is Solitaire, a tiny settlement famous for its rustic charm and delicious apple pie, offering a perfect break before continuing into the Namib Desert. This drive showcases Namibia's stark contrasts — from coastal plains to rugged desert vistas — providing memorable scenery and photographic opportunities en route to Sesriem.",
                route: "Swakopmund to Sesriem",
                accommodation: "Wekebi Safari Lodge / Desert Camp or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Flamingos at Walvis Bay, Moon landscape, Tropic of Capricorn and Sesriem Canyon",
                optionalActivities: "Scenic flights over the sand dunes and afternoon game drive",
            },
            {
                day: 6,
                title: "Sossusvlei / Namib Desert / Naukluft National Park",
                description: "Visiting the Namib Desert is a breathtaking experience, offering some of the world's most iconic desert landscapes. The journey begins at Dune 45, a perfectly shaped red sand dune ideal for climbing and capturing sunrise or sunset photographs. Nearby, Big Daddy rises as one of the tallest dunes in the area, providing panoramic views over the surrounding desert and salt pans. The tour continues to Sossusvlei, a vast salt and clay pan framed by towering dunes, followed by Deadvlei, where stark white clay pans are dotted with ancient, blackened camelthorn trees, creating a surreal, photogenic contrast against the red sands. Finally, a visit to Sesriem Canyon reveals a narrow, winding gorge carved by the Tsauchab River, offering insight into the desert's geological history and a perfect spot for exploration and photography.",
                route: "Sesriem to Sossusvlei",
                accommodation: "Wekebi Safari Lodge / Desert Camp or similar",
                meals: "Lunch, Dinner, Breakfast",
                highlights: "Dune 45, Deadvlei, Sossusvlei and Big Daddy",
                optionalActivities: "Scenic flights or hot air balloon over the dunes",
            },
            {
                day: 7,
                title: "Windhoek / Flying Out",
                description: "After breakfast we drive back to Windhoek Hosea Kutako International Airport to mark the end of the safari.",
                route: "Sesriem to Windhoek",
                meals: "Breakfast",
                highlights: "Tour concludes — transfer to Windhoek Airport",
            },
        ],
    },
];
