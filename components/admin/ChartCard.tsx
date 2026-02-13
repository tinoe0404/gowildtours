"use client";

import { cn } from "@/lib/cn";

interface ChartCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export default function ChartCard({ title, description, children, className }: ChartCardProps) {
    return (
        <div className={cn("bg-white rounded-xl border border-gray-100 p-5 shadow-sm", className)}>
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
