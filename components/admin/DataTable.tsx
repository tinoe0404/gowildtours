"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    pageSize?: number;
    onRowClick?: (row: T) => void;
    selectable?: boolean;
    onSelectionChange?: (selected: T[]) => void;
}

export default function DataTable<T extends { id?: string }>({
    columns,
    data,
    pageSize = 10,
    onRowClick,
    selectable = false,
    onSelectionChange,
}: DataTableProps<T>) {
    const [page, setPage] = useState(0);
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
    const [selected, setSelected] = useState<Set<string>>(new Set());

    // Sorting
    const sorted = [...data].sort((a, b) => {
        if (!sortKey) return 0;
        const aVal = (a as any)[sortKey];
        const bVal = (b as any)[sortKey];
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sorted.length / pageSize);
    const paginated = sorted.slice(page * pageSize, (page + 1) * pageSize);

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    const toggleSelect = (id: string) => {
        const next = new Set(selected);
        if (next.has(id)) next.delete(id); else next.add(id);
        setSelected(next);
        onSelectionChange?.(data.filter((r) => next.has((r as any).id)));
    };

    const toggleAll = () => {
        if (selected.size === paginated.length) {
            setSelected(new Set());
            onSelectionChange?.([]);
        } else {
            const ids = new Set(paginated.map((r) => (r as any).id as string));
            setSelected(ids);
            onSelectionChange?.(paginated);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            {selectable && (
                                <th className="px-4 py-3 w-10">
                                    <input type="checkbox" className="rounded" onChange={toggleAll} checked={selected.size === paginated.length && paginated.length > 0} />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={cn("px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500", col.sortable && "cursor-pointer select-none hover:text-gray-800")}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.label}
                                        {col.sortable && sortKey === col.key && (
                                            sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {paginated.map((row, i) => (
                            <tr
                                key={(row as any).id || i}
                                onClick={() => onRowClick?.(row)}
                                className={cn("hover:bg-gray-50 transition-colors", onRowClick && "cursor-pointer")}
                            >
                                {selectable && (
                                    <td className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                            checked={selected.has((row as any).id)}
                                            onChange={() => toggleSelect((row as any).id)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </td>
                                )}
                                {columns.map((col) => (
                                    <td key={col.key} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                        {col.render ? col.render(row) : String((row as any)[col.key] ?? "—")}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {paginated.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-10 text-gray-400">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
                    <span>Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, data.length)} of {data.length}</span>
                    <div className="flex gap-1">
                        <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                            <button key={i} onClick={() => setPage(i)} className={cn("px-3 py-1 rounded text-sm font-medium", page === i ? "bg-amber-100 text-amber-700" : "hover:bg-gray-100")}>
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
