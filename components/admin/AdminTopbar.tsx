"use client";

import { Bell, Search, LogOut, User } from "lucide-react";
import { useState } from "react";

interface AdminTopbarProps {
    user?: { name: string; email: string; role: string };
}

export default function AdminTopbar({ user }: AdminTopbarProps) {
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = async () => {
        await fetch("/api/admin/auth/logout", { method: "POST" });
        window.location.href = "/admin/login";
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Search */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 w-full max-w-md">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                    placeholder="Search bookings, inquiries..."
                    className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
                />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4 ml-4">
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
                </button>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-amber-700" />
                        </div>
                        {user && (
                            <div className="text-left hidden md:block">
                                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                <p className="text-[11px] text-gray-500 capitalize">{user.role.replace("_", " ")}</p>
                            </div>
                        )}
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
