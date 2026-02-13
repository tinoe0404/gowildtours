"use client";

import { useState } from "react";
import { Plus, GripVertical, Edit, Trash2, User } from "lucide-react";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    photo?: string;
}

export default function TeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
                    <p className="text-sm text-gray-500">Manage your team displayed on the site</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    <Plus className="h-4 w-4" /> Add Member
                </button>
            </div>

            {members.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
                    <User className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No team members yet</p>
                    <button onClick={() => setShowForm(true)} className="mt-3 text-sm text-amber-600 hover:text-amber-700 font-semibold">
                        Add your first team member →
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
                    {members.map((m) => (
                        <div key={m.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                            <GripVertical className="h-4 w-4 text-gray-300 cursor-grab" />
                            <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center">
                                {m.photo ? <img src={m.photo} alt={m.name} className="h-10 w-10 rounded-full object-cover" /> : <User className="h-5 w-5 text-amber-600" />}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{m.name}</p>
                                <p className="text-sm text-gray-400">{m.role}</p>
                            </div>
                            <div className="flex gap-1">
                                <button className="p-1.5 hover:bg-gray-100 rounded"><Edit className="h-4 w-4 text-gray-500" /></button>
                                <button className="p-1.5 hover:bg-red-50 rounded"><Trash2 className="h-4 w-4 text-red-400" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
