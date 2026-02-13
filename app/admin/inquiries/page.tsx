"use client";

import { useEffect, useState } from "react";
import DataTable, { Column } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type Inquiry = {
    id: string;
    name: string;
    email: string;
    type: string;
    subject: string;
    status: string;
    priority: string;
    assignedTo: string;
    createdAt: string;
};

const statusFilters = ["all", "new", "in_progress", "responded", "converted", "closed"];

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams();
        if (activeFilter !== "all") params.set("status", activeFilter);
        fetch(`/api/admin/inquiries?${params}`)
            .then((r) => r.json())
            .then((d) => setInquiries(d.inquiries || []))
            .catch(console.error);
    }, [activeFilter]);

    const columns: Column<Inquiry>[] = [
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email" },
        { key: "type", label: "Type", render: (r) => <StatusBadge status={r.type} /> },
        { key: "subject", label: "Subject" },
        { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
        { key: "priority", label: "Priority", render: (r) => <StatusBadge status={r.priority} /> },
        { key: "createdAt", label: "Created", sortable: true, render: (r) => format(new Date(r.createdAt), "MMM d, yyyy") },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
                    <p className="text-sm text-gray-500">Manage and respond to customer inquiries</p>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
                {statusFilters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${activeFilter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
                            }`}
                    >
                        {f.replace("_", " ")}
                    </button>
                ))}
            </div>

            <DataTable
                columns={columns}
                data={inquiries}
                selectable
                onRowClick={(row) => router.push(`/admin/inquiries/${row.id}`)}
            />
        </div>
    );
}
