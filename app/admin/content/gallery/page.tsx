"use client";

import { useState } from "react";
import { Upload, X, GripVertical, Trash2 } from "lucide-react";

interface GalleryItem {
    id: string;
    url: string;
    alt: string;
    category: string;
}

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [filter, setFilter] = useState("all");

    const categories = ["all", "wildlife", "landscapes", "lodges", "activities", "culture"];

    const handleDelete = (id: string) => {
        if (!confirm("Delete this image?")) return;
        setImages((prev) => prev.filter((i) => i.id !== id));
        fetch(`/api/admin/content/gallery/${id}`, { method: "DELETE" });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
                    <p className="text-sm text-gray-500">Manage site imagery</p>
                </div>
                <label className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors">
                    <Upload className="h-4 w-4" /> Upload Images
                    <input type="file" multiple accept="image/*" className="hidden" />
                </label>
            </div>

            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                {categories.map((c) => (
                    <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 text-sm font-medium capitalize rounded-md transition-colors ${filter === c ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>
                        {c}
                    </button>
                ))}
            </div>

            {images.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-xl py-20 text-center">
                    <Upload className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Drop images here or click Upload</p>
                    <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WebP up to 10MB</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {images.map((img) => (
                        <div key={img.id} className="group relative rounded-lg overflow-hidden aspect-square border border-gray-100">
                            <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button onClick={() => handleDelete(img.id)} className="p-2 bg-white rounded-full shadow"><Trash2 className="h-4 w-4 text-red-500" /></button>
                            </div>
                            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <GripVertical className="h-4 w-4 text-white cursor-grab" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
