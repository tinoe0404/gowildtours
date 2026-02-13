"use client";

import ChartCard from "@/components/admin/ChartCard";
import StatCard from "@/components/admin/StatCard";
import { DollarSign, TrendingUp, Users, Globe } from "lucide-react";
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6", "#ec4899"];

// Demo data
const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    revenue: Math.floor(Math.random() * 40000) + 10000,
    bookings: Math.floor(Math.random() * 30) + 5,
}));

const topCountries = [
    { country: "United Kingdom", bookings: 42 },
    { country: "Australia", bookings: 28 },
    { country: "United States", bookings: 24 },
    { country: "Germany", bookings: 18 },
    { country: "South Africa", bookings: 15 },
];

const travelerTypes = [
    { name: "Couples", value: 35 },
    { name: "Families", value: 25 },
    { name: "Solo", value: 20 },
    { name: "Friends", value: 15 },
    { name: "Business", value: 5 },
];

const funnelData = [
    { stage: "Inquiries", count: 320 },
    { stage: "Bookings", count: 120 },
    { stage: "Confirmed", count: 95 },
    { stage: "Completed", count: 78 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <p className="text-sm text-gray-500">Deep insights into your business performance</p>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard title="Avg Booking Value" value="$1,850" icon={DollarSign} trend={{ value: 12, label: "vs last quarter" }} />
                <StatCard title="Conversion Rate" value="37.5%" icon={TrendingUp} trend={{ value: 5, label: "vs last month" }} />
                <StatCard title="Repeat Customers" value="18%" icon={Users} trend={{ value: -2, label: "vs last month" }} />
                <StatCard title="Countries" value="24" icon={Globe} />
            </div>

            {/* Revenue Chart */}
            <ChartCard title="Monthly Revenue & Bookings" description="12-month rolling performance">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyRevenue}>
                        <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                        <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                        <Tooltip formatter={(value: any) => {
                            if (value === undefined || value === null) return ["0", ""];
                            const v = Array.isArray(value) ? value[0] : value;
                            return [typeof v === 'number' ? v.toLocaleString() : v, ""];
                        }} />
                        <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#f59e0b" fill="url(#colorRev)" strokeWidth={2} />
                        <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Funnel */}
                <ChartCard title="Booking Funnel">
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={funnelData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                            <YAxis dataKey="stage" type="category" tick={{ fontSize: 11 }} width={80} stroke="#94a3b8" />
                            <Tooltip />
                            <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Top Countries */}
                <ChartCard title="Top Countries">
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={topCountries} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                            <YAxis dataKey="country" type="category" tick={{ fontSize: 11 }} width={100} stroke="#94a3b8" />
                            <Tooltip />
                            <Bar dataKey="bookings" fill="#10b981" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Traveler Types */}
                <ChartCard title="Traveler Types">
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie data={travelerTypes} cx="50%" cy="50%" outerRadius={85} innerRadius={45} dataKey="value" paddingAngle={4}>
                                {travelerTypes.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-3 justify-center mt-1">
                        {travelerTypes.map((t, i) => (
                            <div key={t.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} /> {t.name}
                            </div>
                        ))}
                    </div>
                </ChartCard>
            </div>
        </div>
    );
}
