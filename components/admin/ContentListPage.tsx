"use client";

import { useEffect, useState } from "react";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type ContentItem = {
    id: string;
    title?: string;
    name?: string;
    alt?: string;
    slug?: string;
    isPublished?: boolean;
    isFeatured?: boolean;
    category?: string;
    price?: number;
    createdAt: string;
    url?: string;
};

interface ContentListProps {
    type: "packages" | "hotels" | "activities" | "gallery" | "team";
    apiPath: string;
    title?: string;
    description?: string;
}

export default function ContentListPage({ type, apiPath, title, description }: ContentListProps) {
    const [items, setItems] = useState<ContentItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch(apiPath)
            .then((r) => r.json())
            .then((d) => setItems(Array.isArray(d) ? d : (d.items || [])))
            .catch(console.error);
    }, [apiPath]);

    const label = title || type.charAt(0).toUpperCase() + type.slice(1);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        await fetch(`${apiPath}/${id}`, { method: "DELETE" });
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const columns: Column<ContentItem>[] = [
        {
            key: "title",
            label: "Name / Preview",
            sortable: true,
            render: (r) => (
                <div className="flex items-center gap-3">
                    {r.url && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                            <img src={r.url} className="w-full h-full object-cover" alt="" />
                        </div>
                    )}
                    <span className="font-medium">{r.title || r.name || r.alt || "Unnamed Item"}</span>
                </div>
            )
        },
        { key: "category", label: "Category" },
        {
            key: "price",
            label: "Price",
            render: (r) => r.price ? `$${Number(r.price).toLocaleString()}` : "—"
        },
        {
            key: "status",
            label: "Status",
            render: (r) => typeof r.isPublished !== 'undefined' ? <StatusBadge status={r.isPublished ? "active" : "inactive"} /> : "—"
        },
        {
            key: "isFeatured",
            label: "Featured",
            render: (r) => r.isFeatured ? <span className="text-amber-600 text-xs font-bold">★ Yes</span> : <span className="text-gray-400 text-xs">No</span>
        },
        {
            key: "actions",
            label: "",
            render: (r) => (
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => router.push(`/admin/content/${type}/${r.id}/edit`)} className="p-1.5 hover:bg-gray-100 rounded"><Edit className="h-4 w-4 text-gray-500" /></button>
                    <button onClick={() => handleDelete(r.id)} className="p-1.5 hover:bg-red-50 rounded"><Trash2 className="h-4 w-4 text-red-400" /></button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{label}</h1>
                    <p className="text-sm text-gray-500">{description || `Manage your ${type}`}</p>
                </div>
                <button
                    onClick={() => router.push(`/admin/content/${type}/new`)}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    <Plus className="h-4 w-4" /> Add {label.slice(0, -1)}
                </button>
            </div>

            <DataTable columns={columns} data={items} selectable onRowClick={(row) => router.push(`/admin/content/${type}/${row.id}/edit`)} />
        </div>
    );
}
