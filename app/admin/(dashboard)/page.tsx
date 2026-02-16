"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";
import ChartCard from "@/components/admin/ChartCard";
import StatusBadge from "@/components/admin/StatusBadge";
import {
    CalendarCheck, DollarSign, MessageSquare, Star, Users,
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import { format } from "date-fns";
import Link from "next/link";

const COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"];

// Demo data for charts (replaced by API in production)
const bookingTrend = Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    bookings: Math.floor(Math.random() * 8) + 1,
}));

const statusDist = [
    { name: "Pending", value: 12 },
    { name: "Confirmed", value: 28 },
    { name: "Completed", value: 45 },
    { name: "Cancelled", value: 5 },
];

const topPackages = [
    { name: "Vic Falls Explorer", revenue: 24500 },
    { name: "Okavango Delta", revenue: 18200 },
    { name: "Hwange Safari", revenue: 15800 },
    { name: "Chobe Classic", revenue: 12400 },
    { name: "Mana Pools", revenue: 9600 },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        fetch("/api/admin/dashboard/stats")
            .then((r) => r.json())
            .then(setStats)
            .catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Overview of your business performance</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                    title="Bookings (Month)"
                    value={stats?.stats.bookings.value ?? "—"}
                    icon={CalendarCheck}
                    trend={stats ? { value: stats.stats.bookings.trend, label: "vs last month" } : undefined}
                />
                <StatCard
                    title="Revenue (Month)"
                    value={stats ? `$${Number(stats.stats.revenue.value).toLocaleString()}` : "—"}
                    icon={DollarSign}
                    trend={stats ? { value: stats.stats.revenue.trend, label: "vs last month" } : undefined}
                />
                <StatCard title="New Inquiries" value={stats?.stats.inquiries ?? "—"} icon={MessageSquare} />
                <StatCard title="Pending Reviews" value={stats?.stats.pendingReviews ?? "—"} icon={Star} />
                <StatCard title="Subscribers" value={stats?.stats.subscribers ?? "—"} icon={Users} />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <ChartCard title="Bookings (30 days)" className="lg:col-span-2">
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={bookingTrend}>
                            <defs>
                                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                            <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                            <Tooltip />
                            <Area type="monotone" dataKey="bookings" stroke="#f59e0b" fill="url(#colorBookings)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Booking Status">
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Pie data={statusDist} cx="50%" cy="50%" outerRadius={90} innerRadius={50} dataKey="value" paddingAngle={4}>
                                {statusDist.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-3 mt-2 justify-center">
                        {statusDist.map((s, i) => (
                            <div key={s.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                {s.name}
                            </div>
                        ))}
                    </div>
                </ChartCard>
            </div>

            {/* Top Packages + Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard title="Top Packages by Revenue">
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={topPackages} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                            <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={120} stroke="#94a3b8" />
                            <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
                            <Bar dataKey="revenue" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {stats?.recentBookings?.map((b: any) => (
                            <Link
                                key={b.id}
                                href={`/admin/bookings/${b.id}`}
                                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{b.customerName}</p>
                                    <p className="text-xs text-gray-400">{b.bookingReference}</p>
                                </div>
                                <div className="text-right">
                                    <StatusBadge status={b.bookingStatus} />
                                    <p className="text-xs text-gray-400 mt-1">
                                        {format(new Date(b.createdAt), "MMM d")}
                                    </p>
                                </div>
                            </Link>
                        )) ?? (
                                <p className="text-sm text-gray-400 py-4 text-center">No recent activity</p>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
