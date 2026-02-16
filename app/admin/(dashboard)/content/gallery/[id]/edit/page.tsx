"use client";

import { useState, useEffect, use } from "react";
import GalleryForm from "@/components/admin/GalleryForm";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface EditGalleryPageProps {
    params: Promise<{ id: string }>;
}

export default function EditGalleryPage({ params }: EditGalleryPageProps) {
    const { id } = use(params);
    const [initialData, setInitialData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/admin/content/gallery/${id}`);
                const data = await res.json();
                setInitialData({
                    ...data,
                    images: [data.url], // Set for the upload component
                });
            } catch (err) {
                console.error("Failed to fetch gallery image:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
        );
    }

    if (!initialData) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Gallery image not found.</p>
                <Link href="/admin/content/gallery" className="text-amber-600 hover:underline mt-2 inline-block">
                    Back to Gallery
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/content/gallery" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Gallery Image</h1>
                    <p className="text-gray-500">Update image details or replace the file.</p>
                </div>
            </div>

            <GalleryForm initialData={initialData} id={id} />
        </div>
    );
}
