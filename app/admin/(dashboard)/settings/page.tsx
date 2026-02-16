"use client";

import { useState } from "react";
import { Save, Globe, Mail, Calendar, Shield, Users } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { id: "general", label: "General", icon: Globe },
        { id: "booking", label: "Booking", icon: Calendar },
        { id: "email", label: "Email", icon: Mail },
        { id: "security", label: "Security", icon: Shield },
        { id: "users", label: "Users", icon: Users },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500">Configure your platform</p>
            </div>

            <div className="flex gap-6">
                {/* Tabs */}
                <div className="w-48 shrink-0 space-y-1">
                    {tabs.map((t) => {
                        const Icon = t.icon;
                        return (
                            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === t.id ? "bg-amber-50 text-amber-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}>
                                <Icon className="h-4 w-4" /> {t.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                    {activeTab === "general" && (
                        <div className="space-y-5">
                            <h2 className="text-lg font-semibold text-gray-800">General Settings</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Site Name</label>
                                    <input defaultValue="Go Wild Tours" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Contact Email</label>
                                    <input defaultValue="info@gowildtours.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                                    <input defaultValue="+263 77 123 4567" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                                    <input defaultValue="Harare, Zimbabwe" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-700 mt-4">Social Links</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input placeholder="Facebook URL" className="px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                                <input placeholder="Instagram URL" className="px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                                <input placeholder="TikTok URL" className="px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                                <input placeholder="YouTube URL" className="px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                            </div>
                        </div>
                    )}

                    {activeTab === "booking" && (
                        <div className="space-y-5">
                            <h2 className="text-lg font-semibold text-gray-800">Booking Configuration</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Min Lead Time (days)</label>
                                    <input type="number" defaultValue={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Deposit %</label>
                                    <input type="number" defaultValue={30} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Default Currency</label>
                                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 bg-white">
                                        <option>USD</option>
                                        <option>EUR</option>
                                        <option>GBP</option>
                                        <option>ZAR</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Cancellation Policy</label>
                                <textarea rows={4} defaultValue="Free cancellation up to 14 days before check-in. 50% charge for cancellations within 7-14 days. No refund within 7 days." className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 resize-none" />
                            </div>
                        </div>
                    )}

                    {activeTab === "email" && (
                        <div className="space-y-5">
                            <h2 className="text-lg font-semibold text-gray-800">Email Configuration</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Sender Name</label>
                                    <input defaultValue="Go Wild Tours" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Sender Email</label>
                                    <input defaultValue="noreply@gowildtours.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email Provider</label>
                                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 bg-white">
                                    <option>Resend</option>
                                    <option>SendGrid</option>
                                    <option>SMTP</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="space-y-5">
                            <h2 className="text-lg font-semibold text-gray-800">Security</h2>
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                                <p className="font-semibold">Two-factor authentication</p>
                                <p className="text-xs mt-1">2FA is recommended for all admin accounts.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Session Timeout (hours)</label>
                                <input type="number" defaultValue={24} className="w-full max-w-xs px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" />
                            </div>
                        </div>
                    )}

                    {activeTab === "users" && (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Admin Users</h2>
                                <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                                    <Users className="h-4 w-4" /> Add User
                                </button>
                            </div>
                            <div className="text-sm text-gray-400 py-8 text-center border-2 border-dashed border-gray-200 rounded-lg">
                                Admin users will appear here after running the seed command.
                            </div>
                        </div>
                    )}

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
                            <Save className="h-4 w-4" /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
