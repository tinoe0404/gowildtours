"use client";

import { useState } from "react";
import { Send, Clock, Plus, FileText, Users } from "lucide-react";

const templates = [
    { id: "welcome", name: "Welcome Email", description: "Sent to new subscribers" },
    { id: "promo", name: "Seasonal Promotion", description: "Highlight deals and specials" },
    { id: "newsletter", name: "Monthly Newsletter", description: "Updates and stories" },
];

export default function CommunicationsPage() {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [segment, setSegment] = useState("all");
    const [schedule, setSchedule] = useState("now");

    const handleSend = async () => {
        if (!confirm(`Send campaign "${subject}" to ${segment} subscribers?`)) return;
        await fetch("/api/admin/campaigns/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject, body, segment, schedule }),
        });
        alert("Campaign sent!");
        setSubject("");
        setBody("");
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Email Campaigns</h1>
                <p className="text-sm text-gray-500">Compose and send email campaigns to your subscribers</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Composer */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800">Compose</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Subject Line</label>
                        <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Your amazing subject..." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email Body</label>
                        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={10} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none resize-none" placeholder="Write your email content..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Recipient Segment</label>
                            <select value={segment} onChange={(e) => setSegment(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                                <option value="all">All Subscribers</option>
                                <option value="new">New (Last 30 days)</option>
                                <option value="engaged">Engaged</option>
                                <option value="custom">Custom Filter</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Schedule</label>
                            <select value={schedule} onChange={(e) => setSchedule(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                                <option value="now">Send Now</option>
                                <option value="later">Schedule for Later</option>
                            </select>
                        </div>
                    </div>

                    <button onClick={handleSend} disabled={!subject || !body} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50">
                        <Send className="h-4 w-4" /> Send Campaign
                    </button>
                </div>

                {/* Templates */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2"><FileText className="h-4 w-4" /> Templates</h3>
                        <div className="space-y-2">
                            {templates.map((t) => (
                                <button key={t.id} onClick={() => { setSubject(t.name); setBody(`Template: ${t.name}\n\n${t.description}`); }} className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors">
                                    <p className="text-sm font-medium text-gray-800">{t.name}</p>
                                    <p className="text-xs text-gray-400">{t.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2"><Users className="h-4 w-4" /> Subscribers</h3>
                        <p className="text-2xl font-bold text-gray-900">—</p>
                        <p className="text-xs text-gray-400 mt-1">Active subscribers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
