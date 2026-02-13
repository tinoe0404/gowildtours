"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
    LayoutDashboard, MessageSquare, CalendarCheck, Package, Star,
    BarChart3, Mail, Settings, FileText, ChevronLeft, ChevronRight,
    Hotel, Activity, Image, Users, Menu,
} from "lucide-react";

const navGroups = [
    {
        label: "Overview",
        items: [
            { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        ],
    },
    {
        label: "Operations",
        items: [
            { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
            { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
            { label: "Reviews", href: "/admin/reviews", icon: Star },
        ],
    },
    {
        label: "Content",
        items: [
            { label: "Packages", href: "/admin/content/packages", icon: Package },
            { label: "Hotels", href: "/admin/content/hotels", icon: Hotel },
            { label: "Activities", href: "/admin/content/activities", icon: Activity },
            { label: "Gallery", href: "/admin/content/gallery", icon: Image },
            { label: "Team", href: "/admin/content/team", icon: Users },
        ],
    },
    {
        label: "Insights",
        items: [
            { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
            { label: "Reports", href: "/admin/reports", icon: FileText },
        ],
    },
    {
        label: "Comms",
        items: [
            { label: "Campaigns", href: "/admin/communications", icon: Mail },
        ],
    },
    {
        label: "System",
        items: [
            { label: "Settings", href: "/admin/settings", icon: Settings },
        ],
    },
];

export default function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 bottom-0 z-40 bg-[#1a1f2e] text-white flex flex-col transition-all duration-300",
                collapsed ? "w-[72px]" : "w-[260px]"
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                {!collapsed && (
                    <Link href="/admin" className="text-lg font-bold tracking-tight">
                        Go<span className="text-amber-400">Wild</span> Admin
                    </Link>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 space-y-6 px-3">
                {navGroups.map((group) => (
                    <div key={group.label}>
                        {!collapsed && (
                            <p className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mb-2 px-3">
                                {group.label}
                            </p>
                        )}
                        <ul className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                                isActive
                                                    ? "bg-amber-500/20 text-amber-400"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                            )}
                                            title={collapsed ? item.label : undefined}
                                        >
                                            <Icon className="h-[18px] w-[18px] shrink-0" />
                                            {!collapsed && <span>{item.label}</span>}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
