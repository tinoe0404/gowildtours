import type { Metadata } from "next";

export const dynamic = "force-static";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
    title: "Safari Gallery",
    description:
        "Browse our curated collection of stunning safari photography — wildlife, landscapes, cultural encounters, and adventure activities across Africa's most breathtaking destinations.",
};

import { galleryImages } from "@/lib/gallery-data";

export default function GalleryPage() {
    return <GalleryPageClient initialImages={galleryImages} />;
}
