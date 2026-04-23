"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Save, X, Loader2, Plus, Trash2, Camera } from "lucide-react";
import Button from "@/components/ui/Button";
import ImageUpload from "./ImageUpload";

interface PackageFormProps {
    initialData?: any;
    id?: string;
}

export default function PackageForm({ initialData, id }: PackageFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
        defaultValues: initialData || {
            title: "",
            description: "",
            duration: "",
            price: 0,
            category: "Classic Safari",
            isPublished: false,
            isFeatured: false,
            minGuests: initialData?.minGuests || 2,
            maxGuests: initialData?.maxGuests || 6,
            difficulty: initialData?.difficulty || "Moderate",
            destinations: initialData?.destinations?.join(", ") || "",
            inclusions: initialData?.inclusions || [""],
            exclusions: initialData?.exclusions || [""],
            highlights: initialData?.highlights || [""],
            images: initialData?.images || [],
        }
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const url = id ? `/api/admin/content/packages/${id}` : "/api/admin/content/packages";
            const method = id ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    price: parseFloat(data.price),
                    minGuests: parseInt(data.minGuests, 10),
                    maxGuests: parseInt(data.maxGuests, 10),
                    destinations: typeof data.destinations === 'string' ? data.destinations.split(',').map((d: string) => d.trim()).filter(Boolean) : [],
                }),
            });

            if (!res.ok) throw new Error("Failed to save package");

            router.push("/admin/content/packages");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Package Title</label>
                        <input {...register("title", { required: true })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g. 3-Day Victoria Falls Special" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Category</label>
                        <select {...register("category")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                            <option>Classic Safari</option>
                            <option>Luxury Adventure</option>
                            <option>Quick Safari</option>
                            <option>Custom Experience</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Price (USD)</label>
                        <input type="number" {...register("price", { required: true })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Duration String</label>
                        <input {...register("duration", { required: true })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g. 3 Days / 2 Nights" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Min Guests</label>
                        <input type="number" {...register("minGuests")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Max Guests</label>
                        <input type="number" {...register("maxGuests")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Difficulty</label>
                        <select {...register("difficulty")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                            <option>Easy</option>
                            <option>Moderate</option>
                            <option>Challenging</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Destinations (Comma separated)</label>
                    <input {...register("destinations")} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="e.g. Victoria Falls, Hwange" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea {...register("description", { required: true })} rows={6} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-amber-500" />
                        <label className="text-sm font-semibold text-gray-700">Package Images</label>
                    </div>
                    <Controller
                        name="images"
                        control={control}
                        render={({ field }) => (
                            <ImageUpload
                                value={field.value}
                                onChange={(urls) => field.onChange(urls)}
                                onRemove={(url) => field.onChange(field.value.filter((val: string) => val !== url))}
                            />
                        )}
                    />
                </div>

                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" {...register("isPublished")} className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500" />
                        <span className="text-sm font-medium text-gray-700">Published</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" {...register("isFeatured")} className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500" />
                        <span className="text-sm font-medium text-gray-700">Featured</span>
                    </label>
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {id ? "Update Package" : "Create Package"}
                </Button>
            </div>
        </form>
    );
}
