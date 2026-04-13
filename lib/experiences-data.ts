import { Compass, Tent, Camera } from "lucide-react";

export type Experience = {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    videoSrc: string;
    posterSrc: string;
    href: string;
};

export const experiences: Experience[] = [
    {
        id: "private-expeditions",
        title: "Private Expeditions",
        description:
            "Tailored journeys to hidden corners with our best guides. Experience the freedom of your own private vehicle and schedule.",
        icon: Compass,
        videoSrc: "/videos/experience-private.mp4",
        posterSrc: "/images/safari/hippos-mud.jpg",
        href: "/experiences/private-expeditions",
    },
    {
        id: "luxury-bush-camps",
        title: "Luxury Bush Camps",
        description:
            "Stay in beautifully designed tented camps blending comfort with authentic wilderness immersion under the stars.",
        icon: Tent,
        videoSrc: "/videos/experience-camps.mp4",
        posterSrc: "/images/safari/dunes-moody.jpg",
        href: "/experiences/luxury-bush-camps",
    },
    {
        id: "photography-safaris",
        title: "Photography Safaris",
        description:
            "Capture Africa's drama with expert guidance, specialized vehicles, and golden-hour access to the best sightings.",
        icon: Camera,
        videoSrc: "/videos/experience-photo.mp4",
        posterSrc: "/images/safari/wild-dogs.jpg",
        href: "/experiences/photography-safaris",
    },
];
