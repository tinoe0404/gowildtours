"use client";

import PackageForm from "@/components/admin/PackageForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewPackagePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/content/packages" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add New Package</h1>
                    <p className="text-sm text-gray-500">Create a new safari experience</p>
                </div>
            </div>

            <PackageForm />
        </div>
    );
}
