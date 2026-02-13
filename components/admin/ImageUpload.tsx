"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
    maxFiles?: number;
}

export default function ImageUpload({ value, onChange, onRemove, maxFiles = 5 }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const newUrls: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const res = await fetch(`/api/admin/upload?filename=${file.name}`, {
                    method: "POST",
                    body: file,
                });

                if (!res.ok) throw new Error("Upload failed");

                const blob = await res.json();
                newUrls.push(blob.url);
            }

            onChange([...value, ...newUrls]);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image. Check your connection and permissions.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-4 w-full">
            <div className="flex flex-wrap gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 group">
                        <Image
                            src={url}
                            alt="Uploaded image"
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => onRemove(url)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}

                {value.length < maxFiles && (
                    <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="w-32 h-32 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors"
                    >
                        {isUploading ? (
                            <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                        ) : (
                            <>
                                <Upload className="w-6 h-6 text-gray-400" />
                                <span className="text-xs font-medium text-gray-500">Upload</span>
                            </>
                        )}
                    </button>
                )}
            </div>

            <input
                type="file"
                multiple={maxFiles > 1}
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={onUpload}
            />
            {value.length === 0 && !isUploading && (
                <div className="flex items-center gap-2 text-sm text-gray-400 italic">
                    <ImageIcon className="w-4 h-4" />
                    <span>No images uploaded yet</span>
                </div>
            )}
        </div>
    );
}
