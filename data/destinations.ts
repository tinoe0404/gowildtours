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

export const destinations: Destination[] = [
  {
    slug: "victoria-falls",
    name: "Victoria Falls",
    tagline: "The Smoke That Thunders",
    region: "Western Zimbabwe",
    image: "/images/safari/victoria-falls-close.jpg",
    heroImage: "/images/safari/victoria-falls-wide.jpg",
    highlights: ["UNESCO World Heritage Site", "World's Largest Waterfall", "Adventure Capital of Africa"],
    bestFor: ["Honeymoons", "Adventure seekers", "First-time Africa visitors"],
    bestTime: "March – May (full flood) / Aug – Dec (lower water, Devil's Pool)",
    duration: "2–3 nights recommended",
    description: "One of the Seven Natural Wonders of the World — 1.7km wide, 108m high, and visible from 50km away.",
    longDescription: `Known to locals as "Mosi-oa-Tunya" — The Smoke That Thunders — Victoria Falls is one of the most arresting natural spectacles on Earth. The mighty Zambezi River plunges over a kilometre-wide cliff, sending spray into the sky visible from miles away.

Beyond the falls themselves, Victoria Falls town is Africa's adventure capital: white-water rafting on the Zambezi, bungee jumping from the Victoria Falls Bridge, microlight flights at sunrise, and sunset cruises on the upper river all await.

Go Wild Tours includes Victoria Falls as the gateway to our Zimbabwe itineraries — perfectly positioned between Hwange National Park (2 hours by road) and Chobe in Botswana.`,
    activities: [
      { name: "Devil's Pool Swim", icon: "🌊", description: "Swim at the edge of the falls in the natural infinity pool (Aug–Dec)" },
      { name: "Sunset River Cruise", icon: "🛶", description: "Sundowner cruise on the upper Zambezi with wildlife sightings" },
      { name: "White-Water Rafting", icon: "🚣", description: "World-class Grade 5 rapids below the falls" },
      { name: "Microlight Flight", icon: "✈️", description: "Aerial perspective of the falls and Zambezi at sunrise" },
      { name: "Walking Tour of Falls", icon: "🚶", description: "Rain-forest walkway with 16 viewpoints of the falls" },
      { name: "Bungee Jump", icon: "🎯", description: "111m jump from the iconic Victoria Falls Bridge" },
    ],
    accommodation: [
      { name: "The Victoria Falls Hotel", type: "Heritage Hotel", description: "Colonial-era grandeur overlooking the spray of the falls", image: "" },
      { name: "Wilderness Safaris Vic Falls", type: "Luxury Lodge", description: "Intimate lodge steps from the national park boundary", image: "" },
    ],
    wildlife: ["Hippos", "Crocodiles", "Elephants", "Buffalo", "Bushbuck", "Waterbuck"],
    coordinates: { lat: -17.9243, lng: 25.8572 },
  },
  {
    slug: "hwange-national-park",
    name: "Hwange National Park",
    tagline: "Zimbabwe's Big Five Kingdom",
    region: "Western Zimbabwe",
    image: "/images/safari/wild-dogs.jpg",
    heroImage: "/images/safari/elephants-waterhole.jpg",
    highlights: ["40,000+ Elephants", "Africa's Best Wild Dog Sightings", "300+ Mammal Species"],
    bestFor: ["Wildlife photography", "Big Five seekers", "First-time safari visitors"],
    bestTime: "May – October (dry season, best game viewing)",
    duration: "3–4 nights recommended",
    description: "Zimbabwe's largest national park — home to the greatest concentration of elephants in Africa and outstanding Big Five sightings.",
    longDescription: `Hwange National Park covers 14,651 square kilometres of diverse habitat — from open savannah and mopane woodland to arid desert dunes in the south. It is Zimbabwe's flagship wildlife reserve and the centrepiece of our safari programmes.

Hwange is particularly renowned for its extraordinary elephant herds, often gathering at artificially maintained waterholes in the dry season in groups of hundreds. It is also one of the best places in Africa to encounter the endangered African wild dog.

Go Wild Tours operates private game drives in Hwange with our certified professional guides — pioneers of the area's walking safari tradition.`,
    activities: [
      { name: "Game Drives", icon: "🚙", description: "Day and night drives with certified professional guides in custom vehicles" },
      { name: "Walking Safari", icon: "🦶", description: "On-foot wilderness experience with armed professional guides" },
      { name: "Hide Sitting", icon: "🔭", description: "Guided time at active waterholes — extraordinary predator and elephant sightings" },
      { name: "Photographic Safari", icon: "📷", description: "Specialist photographic drives in optimal golden-hour light" },
      { name: "Birdwatching", icon: "🦅", description: "500+ species — a birding paradise year-round" },
    ],
    accommodation: [
      { name: "Linkwasha Camp", type: "Luxury Tented Camp", description: "Remote luxury camp in a private concession, extraordinary wildlife density", image: "" },
      { name: "Somalisa Camp", type: "Luxury Tented Camp", description: "Intimate seven-tent camp beside a productive waterhole", image: "" },
    ],
    wildlife: ["Elephant", "Lion", "Leopard", "Wild Dog", "Cheetah", "Buffalo", "Giraffe", "Sable Antelope", "Roan Antelope"],
    coordinates: { lat: -19.0, lng: 26.5 },
  },
  {
    slug: "mana-pools",
    name: "Mana Pools",
    tagline: "Where the Wild Things Roam Free",
    region: "Northern Zimbabwe — Zambezi Valley",
    image: "/images/safari/leopard-walking.jpg",
    heroImage: "/images/safari/elephant-river.jpg",
    highlights: ["UNESCO World Heritage Site", "Best Walking Safaris in Africa", "Canoe Safaris on the Zambezi"],
    bestFor: ["Experienced safari travellers", "Walking safari enthusiasts", "Photographers"],
    bestTime: "April – October (peak: Aug–Oct for wildlife)",
    duration: "3–5 nights recommended",
    description: "A UNESCO World Heritage Site and arguably Africa's most wild and authentic safari experience — walking freely alongside lion, elephant and wild dog.",
    longDescription: `Mana Pools is unlike anywhere else in Africa. This remote floodplain in the Zambezi Valley is one of the few places in the world where visitors are permitted to walk unguided in a national park — a privilege that speaks to the extraordinary wildness of the place.

Defined by ancient albida trees, ox-bow pools teeming with hippos, and the broad Zambezi River forming the border with Zambia, Mana Pools offers an immediacy and authenticity of wildlife experience that even the finest private reserves cannot match.

Our Mana Pools walking safaris are led by some of Zimbabwe's most celebrated professional guides — men and women with decades of experience tracking lion and leopard on foot.`,
    activities: [
      { name: "Walking Safari", icon: "🦶", description: "On-foot encounters with lion, elephant, and wild dog — Africa's most thrilling experience" },
      { name: "Canoe Safari", icon: "🛶", description: "Multi-day paddling safari along the Zambezi — camping on the banks" },
      { name: "Game Drives", icon: "🚙", description: "Morning and evening drives along the floodplains" },
      { name: "Fishing", icon: "🎣", description: "Tiger fishing on the Zambezi — one of Africa's great freshwater fishing destinations" },
      { name: "Photography Hides", icon: "📷", description: "Ground-level photography at active sites" },
    ],
    accommodation: [
      { name: "Chikwenya Camp", type: "Luxury Tented Camp", description: "Eight ensuite tents on a private concession at the Sapi Reserve boundary", image: "" },
      { name: "Ruckomechi Camp", type: "Exclusive Tented Camp", description: "Ten luxury tents on the western bank of the Zambezi", image: "" },
    ],
    wildlife: ["Lion", "Elephant", "Wild Dog", "Leopard", "Hippo", "Crocodile", "Eland", "Waterbuck", "Impala"],
    coordinates: { lat: -15.75, lng: 29.38 },
  },
  {
    slug: "matobo-hills",
    name: "Matobo Hills",
    tagline: "Ancient Rocks, White Rhino & Rock Art",
    region: "Southern Zimbabwe",
    image: "/images/safari/leopard-tree.jpg",
    heroImage: "/images/safari/rhino.jpg",
    highlights: ["White Rhino Tracking on Foot", "San Rock Art — 13,000+ Years Old", "Leopard Capital of Africa"],
    bestFor: ["Cultural travellers", "Rhino conservation supporters", "Hikers"],
    bestTime: "May – September (dry season, comfortable temperatures)",
    duration: "2–3 nights recommended",
    description: "A UNESCO World Heritage Site unlike any other — giant granite boulders, the highest density of leopard in the world, and some of Africa's finest San rock art.",
    longDescription: `Matobo Hills is Zimbabwe's most culturally and geologically extraordinary destination. Formed over 2 billion years ago, the landscape of balancing granite boulders and hidden valleys is simultaneously ancient and otherworldly.

The national park harbours the highest concentration of leopard in Africa, a thriving white and black rhino population, and over 3,000 documented San (Bushman) rock art sites — the richest such collection on the continent.

It is also the resting place of Cecil John Rhodes, who chose Matobo's "World's View" — a granite dome with a 360° panorama — as his burial site. Our Matobo experiences combine rhino tracking on foot with cultural exploration of the rock art and local Ndebele communities.`,
    activities: [
      { name: "White Rhino Tracking", icon: "🦏", description: "On-foot rhino tracking with conservation rangers in the Intensive Protection Zone" },
      { name: "Rock Art Tours", icon: "🎨", description: "Guided tours of 13,000-year-old San Bushman paintings" },
      { name: "Leopard Spotting", icon: "🐆", description: "Game drives at dawn and dusk in the highest leopard density habitat in Africa" },
      { name: "Hiking & Scrambling", icon: "⛰️", description: "Guided hikes across the balancing rock formations" },
      { name: "Cultural Village Visit", icon: "🏘️", description: "Ndebele community experiences with local guides" },
    ],
    accommodation: [
      { name: "Big Cave Camp", type: "Boutique Lodge", description: "Seven-cottage lodge tucked into a granite cave formation", image: "" },
      { name: "Amalinda Lodge", type: "Boutique Lodge", description: "Extraordinary lodge built into and around ancient granite boulders", image: "" },
    ],
    wildlife: ["White Rhino", "Black Rhino", "Leopard", "Sable Antelope", "Giraffe", "Zebra"],
    coordinates: { lat: -20.5, lng: 28.47 },
  },
  {
    slug: "lake-kariba",
    name: "Lake Kariba",
    tagline: "The Inland Sea of Africa",
    region: "Northern Zimbabwe",
    image: "/images/safari/hippos-grass.jpg",
    heroImage: "/images/safari/river-aerial.jpg",
    highlights: ["World's Largest Man-Made Lake by Volume", "Houseboat Safaris", "Matusadona National Park"],
    bestFor: ["Couples & honeymooners", "Fishing enthusiasts", "Alternative safari seekers"],
    bestTime: "April – November (optimal wildlife and fishing)",
    duration: "2–4 nights recommended",
    description: "An inland sea stretching 280km along the Zambian border — the setting for houseboat safaris, tiger fishing, and wildlife-rich shores of Matusadona National Park.",
    longDescription: `Lake Kariba was created in 1959 when the Kariba Dam flooded the Zambezi Valley — but today it reads as a timeless wilderness, its 5,000 square kilometres of water framed by distant escarpment hills and dramatic sunsets that photographers pursue from around the world.

The shores of Matusadona National Park offer elephant, buffalo, lion and the endangered black rhino — accessible by boat safari directly from the lake. Tiger fishing on Kariba is legendary, rated among Africa's finest freshwater angling experiences.

Go Wild Tours pairs Lake Kariba houseboat experiences with game drives in Matusadona for a unique land-and-water safari combination unlike any other in southern Africa.`,
    activities: [
      { name: "Houseboat Safari", icon: "🛥️", description: "Multi-night luxury houseboat experience with game drives from the water" },
      { name: "Tiger Fishing", icon: "🎣", description: "Legendary Kariba tiger fish — one of Africa's great freshwater challenges" },
      { name: "Sunset Cruises", icon: "🌅", description: "Sundowner cruises with elephant and buffalo on the shoreline" },
      { name: "Game Drives — Matusadona", icon: "🚙", description: "Land-based game drives in Matusadona National Park" },
      { name: "Kayaking", icon: "🛶", description: "Morning kayak among Kariba's famous dead trees — extraordinary photography" },
    ],
    accommodation: [
      { name: "Musango Safari Camp", type: "Exclusive Island Camp", description: "Seven-chalet island camp in Matusadona National Park", image: "" },
      { name: "Bumi Hills Safari Lodge", type: "Luxury Lodge", description: "Dramatic clifftop lodge overlooking Lake Kariba", image: "" },
    ],
    wildlife: ["Elephant", "Buffalo", "Black Rhino", "Lion", "Hippo", "Crocodile", "Tigerfish"],
    coordinates: { lat: -16.98, lng: 28.77 },
  },
  {
    slug: "botswana",
    name: "Botswana",
    tagline: "The Jewel of the Kalahari",
    region: "Southern Africa",
    image: "/images/safari/hippos-mud.jpg",
    heroImage: "/images/safari/elephant-river.jpg",
    highlights: ["Okavango Delta", "Chobe National Park", "Kalahari Desert"],
    bestFor: ["Wildlife enthusiasts", "Luxury safaris", "Photographers"],
    bestTime: "May – October (dry season)",
    duration: "6–10 nights recommended",
    description: "Experience the unparalleled wildlife density of the Okavango Delta and the massive elephant herds of Chobe.",
    longDescription: `Botswana is widely considered one of Africa's premier safari destinations, known for its low-impact, high-value tourism model that ensures pristine and uncrowded wilderness experiences.

From the lush waterways of the Okavango Delta to the arid expanses of the Kalahari Desert, the country offers incredible contrasts. The Chobe River is famous for hosting the largest concentration of elephants in Africa.

Go Wild Tours offers seamless cross-border itineraries, combining the best of Zimbabwe with Botswana's iconic landscapes.`,
    activities: [
      { name: "Mokoro Trails", icon: "🛶", description: "Glide silently through the Delta in a traditional dugout canoe" },
      { name: "Game Drives", icon: "🚙", description: "Exceptional wildlife viewing in Moremi and Chobe" },
      { name: "River Cruises", icon: "🛥️", description: "Sunset cruises on the Chobe River" }
    ],
    accommodation: [
      { name: "Okavango Delta Camps", type: "Luxury Tented Camp", description: "Exclusive camps accessible only by light aircraft", image: "" }
    ],
    wildlife: ["Elephant", "Lion", "Leopard", "Wild Dog", "Hippo", "Crocodile"],
    coordinates: { lat: -22.3285, lng: 24.6849 },
  },
  {
    slug: "namibia",
    name: "Namibia",
    tagline: "Land of Striking Contrasts",
    region: "Southern Africa",
    image: "/images/safari/dunes-moody.jpg",
    heroImage: "/images/safari/dead-tree-desert.jpg",
    highlights: ["Sossusvlei Dunes", "Etosha National Park", "Skeleton Coast"],
    bestFor: ["Adventure seekers", "Photographers", "Self-drive safaris"],
    bestTime: "June – October",
    duration: "10–14 nights recommended",
    description: "A country of vast open spaces, towering red sand dunes, and unique desert-adapted wildlife.",
    longDescription: `Namibia is defined by its dramatic landscapes. The towering red dunes of Sossusvlei are among the highest in the world, while the desolate Skeleton Coast is hauntingly beautiful.

Etosha National Park offers extraordinary wildlife viewing around its massive salt pan, where animals congregate at waterholes in the dry season. Look out for desert-adapted elephants and rhinos in Damaraland.

Our overland expeditions perfectly capture the essence of this rugged, breathtaking country.`,
    activities: [
      { name: "Dune Climbing", icon: "⛰️", description: "Climb the iconic Dune 45 or Big Daddy at Sossusvlei" },
      { name: "Etosha Game Drives", icon: "🚙", description: "Watch wildlife congregate around the salt pan waterholes" },
      { name: "Scenic Flights", icon: "✈️", description: "View the dramatic Skeleton Coast from the air" }
    ],
    accommodation: [
      { name: "Desert Lodges", type: "Boutique Lodge", description: "Architecturally stunning lodges blending into the landscape", image: "" }
    ],
    wildlife: ["Desert Elephant", "Black Rhino", "Lion", "Oryx", "Springbok"],
    coordinates: { lat: -22.9576, lng: 18.4904 },
  },
  {
    slug: "zambia",
    name: "Zambia",
    tagline: "The Real Africa",
    region: "Southern Africa",
    image: "/images/safari/leopard-walking.jpg",
    heroImage: "/images/safari/victoria-falls-wide.jpg",
    highlights: ["South Luangwa", "Lower Zambezi", "Victoria Falls"],
    bestFor: ["Walking safaris", "Experienced safari goers", "Authentic wilderness"],
    bestTime: "June – October",
    duration: "7–10 nights recommended",
    description: "The birthplace of the walking safari, offering raw, untamed wilderness and the magnificent Victoria Falls.",
    longDescription: `Zambia is a vast, wild country that remains largely untouched by mass tourism. It is famously the birthplace of the walking safari, particularly in the South Luangwa National Park, known for its high leopard density.

The Lower Zambezi National Park offers a brilliant mix of land and water-based activities, sharing the great river with Zimbabwe's Mana Pools.

From the Zambian side of Victoria Falls to the remote wilderness of Kafue, Zambia delivers an authentic, old-school safari experience.`,
    activities: [
      { name: "Walking Safaris", icon: "🦶", description: "Pioneering walking safaris in South Luangwa" },
      { name: "Canoeing", icon: "🛶", description: "Paddle the Lower Zambezi among hippos and elephants" },
      { name: "Night Drives", icon: "🔦", description: "Excellent chances of spotting leopards on the hunt" }
    ],
    accommodation: [
      { name: "Bush Camps", type: "Intimate Camp", description: "Small, authentic camps focused on the wilderness experience", image: "" }
    ],
    wildlife: ["Leopard", "Lion", "Elephant", "Hippo", "Puku"],
    coordinates: { lat: -13.1339, lng: 27.8493 },
  },
  {
    slug: "malawi",
    name: "Malawi",
    tagline: "The Warm Heart of Africa",
    region: "Southeastern Africa",
    image: "/images/safari/river-aerial.jpg",
    heroImage: "/images/safari/sunset-cruise.jpg",
    highlights: ["Lake Malawi", "Liwonde National Park", "Majete Wildlife Reserve"],
    bestFor: ["Beach and bush combos", "Cultural interactions", "Snorkeling"],
    bestTime: "May – October",
    duration: "5–7 nights recommended",
    description: "Famous for the crystal-clear waters of Lake Malawi and incredibly welcoming people.",
    longDescription: `Malawi is affectionately known as the "Warm Heart of Africa" due to the legendary friendliness of its people. The country is dominated by Lake Malawi, a massive inland sea with golden beaches and extraordinary cichlid fish diversity.

In recent years, Malawi has also emerged as a fantastic wildlife destination, with successful conservation efforts transforming parks like Majete and Liwonde into thriving Big Five reserves.

It's the perfect destination for those seeking a relaxing beach-style end to an adventurous safari.`,
    activities: [
      { name: "Snorkeling & Diving", icon: "🤿", description: "Swim among hundreds of endemic cichlid species in Lake Malawi" },
      { name: "Cultural Visits", icon: "🏘️", description: "Authentic interactions with local communities" },
      { name: "Game Drives", icon: "🚙", description: "Explore the revitalized wildlife reserves" }
    ],
    accommodation: [
      { name: "Lakeshore Lodges", type: "Beach Lodge", description: "Relaxing lodges right on the sandy shores of the lake", image: "" }
    ],
    wildlife: ["Cichlids", "Elephant", "Rhino", "Lion", "Hippo"],
    coordinates: { lat: -13.2543, lng: 34.3015 },
  }
];
