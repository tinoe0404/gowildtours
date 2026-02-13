"use client";

import { useState } from "react";
import { Download, FileText, Calendar, TrendingUp, Star, Users } from "lucide-react";

const reports = [
    { id: "bookings", label: "Booking Report", description: "All bookings with customer, status, and revenue data", icon: Calendar },
    { id: "revenue", label: "Revenue Summary", description: "Revenue by package, monthly totals, and averages", icon: TrendingUp },
    { id: "inquiries", label: "Inquiry Report", description: "Inquiries with type, status, and response times", icon: FileText },
    { id: "reviews", label: "Review Summary", description: "Reviews by package, avg rating, and sentiment", icon: Star },
    { id: "subscribers", label: "Subscriber Growth", description: "Newsletter subscriber trends and churn", icon: Users },
];

const formats = ["CSV", "Excel", "PDF"];

export default function ReportsPage() {
    const [selectedFormat, setSelectedFormat] = useState("CSV");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });

    const handleExport = async (reportId: string) => {
        const params = new URLSearchParams({
            format: selectedFormat.toLowerCase(),
            start: dateRange.start,
            end: dateRange.end,
        });

        try {
            const res = await fetch(`/api/admin/reports/${reportId}?${params}`);
            if (!res.ok) throw new Error("Export failed");

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${reportId}-report.${selectedFormat === "Excel" ? "xlsx" : selectedFormat.toLowerCase()}`;
            a.click();
            URL.revokeObjectURL(url);
        } catch {
            alert("Export is not yet connected. API route needed.");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports & Exports</h1>
                <p className="text-sm text-gray-500">Generate and download business reports</p>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <div className="flex flex-wrap items-end gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                        <input type="date" value={dateRange.start} onChange={(e) => setDateRange((p) => ({ ...p, start: e.target.value }))} className="px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
                        <input type="date" value={dateRange.end} onChange={(e) => setDateRange((p) => ({ ...p, end: e.target.value }))} className="px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Format</label>
                        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                            {formats.map((f) => (
                                <button key={f} onClick={() => setSelectedFormat(f)} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${selectedFormat === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.map((r) => {
                    const Icon = r.icon;
                    return (
                        <div key={r.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
                                    <Icon className="h-5 w-5 text-amber-600" />
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-800">{r.label}</h3>
                            <p className="text-xs text-gray-400 mt-1 mb-4">{r.description}</p>
                            <button onClick={() => handleExport(r.id)} className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                                <Download className="h-4 w-4" /> Export as {selectedFormat}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Automated Reports */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Automated Reports</h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Weekly Digest</p>
                            <p className="text-xs text-gray-400">Sent every Monday at 8:00 AM</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:bg-amber-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="text-sm font-medium text-gray-800">Monthly Summary (PDF)</p>
                            <p className="text-xs text-gray-400">Generated on the 1st of each month</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:bg-amber-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
