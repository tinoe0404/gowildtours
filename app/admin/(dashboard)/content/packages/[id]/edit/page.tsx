"use client";

import { useEffect, useState, use } from "react";
import PackageForm from "@/components/admin/PackageForm";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [pkg, setPkg] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/admin/content/packages/${id}`)
            .then(res => res.json())
            .then(data => {
                setPkg(data);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return (
            <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/content/packages" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Package</h1>
                    <p className="text-sm text-gray-500">Update safari details and pricing</p>
                </div>
            </div>

            <PackageForm initialData={pkg} id={id} />
        </div>
    );
}
