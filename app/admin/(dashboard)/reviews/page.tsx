"use client";

import { useEffect, useState } from "react";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { format } from "date-fns";
import { Star } from "lucide-react";

type Review = {
    id: string;
    reviewerName: string;
    rating: number;
    title: string;
    status: string;
    verified: boolean;
    packageId: string;
    createdAt: string;
};

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const params = new URLSearchParams();
        if (filter !== "all") params.set("status", filter);
        fetch(`/api/admin/reviews?${params}`)
            .then((r) => r.json())
            .then((d) => setReviews(d.reviews || []))
            .catch(console.error);
    }, [filter]);

    const handleAction = async (id: string, status: string) => {
        await fetch(`/api/admin/reviews`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    };

    const columns: Column<Review>[] = [
        { key: "reviewerName", label: "Reviewer", sortable: true },
        {
            key: "rating",
            label: "Rating",
            render: (r) => (
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
                    ))}
                </div>
            ),
        },
        { key: "title", label: "Title" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
        { key: "verified", label: "Verified", render: (r) => r.verified ? <span className="text-emerald-600 text-xs font-bold">✓ Yes</span> : <span className="text-gray-400 text-xs">No</span> },
        { key: "createdAt", label: "Date", sortable: true, render: (r) => format(new Date(r.createdAt), "MMM d, yyyy") },
        {
            key: "actions",
            label: "Actions",
            render: (r) => (
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    {r.status === "pending" && (
                        <>
                            <button onClick={() => handleAction(r.id, "approved")} className="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 rounded hover:bg-emerald-100 font-medium">Approve</button>
                            <button onClick={() => handleAction(r.id, "rejected")} className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium">Reject</button>
                        </>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Review Moderation</h1>
                <p className="text-sm text-gray-500">Approve, reject, or flag customer reviews</p>
            </div>

            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                {["all", "pending", "approved", "rejected", "spam"].map((f) => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${filter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>
                        {f}
                    </button>
                ))}
            </div>

            <DataTable columns={columns} data={reviews} selectable />
        </div>
    );
}
