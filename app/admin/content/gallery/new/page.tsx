"use client";

import GalleryForm from "@/components/admin/GalleryForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewGalleryPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/content/gallery" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add to Gallery</h1>
                    <p className="text-gray-500">Upload a new image to the website gallery.</p>
                </div>
            </div>

            <GalleryForm />
        </div>
    );
}
