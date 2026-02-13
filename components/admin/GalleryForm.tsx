"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Save, Loader2, Camera } from "lucide-react";
import Button from "@/components/ui/Button";
import ImageUpload from "./ImageUpload";

interface GalleryFormProps {
    initialData?: any;
    id?: string;
}

export default function GalleryForm({ initialData, id }: GalleryFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: initialData || {
            url: "",
            alt: "",
            caption: "",
            category: "General",
            sortOrder: 0,
            images: [], // Used for the upload component
        }
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            // If images were uploaded, take the first one (gallery is single image per entry)
            const submissionData = {
                ...data,
                url: data.images && data.images.length > 0 ? data.images[0] : data.url,
            };

            if (!submissionData.url) {
                throw new Error("Please upload an image or provide a URL");
            }

            const url = id ? `/api/admin/content/gallery/${id}` : "/api/admin/content/gallery";
            const method = id ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            });

            if (!res.ok) throw new Error("Failed to save gallery image");

            router.push("/admin/content/gallery");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-amber-500" />
                        <label className="text-sm font-semibold text-gray-700">Image Upload</label>
                    </div>
                    <Controller
                        name="images"
                        control={control}
                        render={({ field }) => (
                            <ImageUpload
                                value={field.value || (initialData?.url ? [initialData.url] : [])}
                                onChange={(urls) => field.onChange(urls)}
                                onRemove={(url) => field.onChange([])}
                                maxFiles={1}
                            />
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Alt Text</label>
                    <input {...register("alt")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Description for accessibility" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Caption (Optional)</label>
                    <input {...register("caption")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Image caption" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Category</label>
                        <select {...register("category")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                            <option>General</option>
                            <option>Wildlife</option>
                            <option>Landscape</option>
                            <option>Culture</option>
                            <option>Accommodation</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Sort Order</label>
                        <input type="number" {...register("sortOrder")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {id ? "Update Image" : "Add to Gallery"}
                </Button>
            </div>
        </form>
    );
}
