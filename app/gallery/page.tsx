import type { Metadata } from "next";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
    title: "Safari Gallery",
    description:
        "Browse our curated collection of stunning safari photography — wildlife, landscapes, cultural encounters, and adventure activities across Africa's most breathtaking destinations.",
};

export default function GalleryPage() {
    return <GalleryPageClient />;
}
