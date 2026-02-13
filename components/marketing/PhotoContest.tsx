"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Upload, Image as ImageIcon, Heart } from "lucide-react";
import Image from "next/image";

export default function PhotoContest() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate upload
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Entry submitted! Good luck!");
        }, 1500);
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-dark-deep mb-4">"Best of the Bush" Photo Contest</h2>
                <p className="text-warm-gray max-w-2xl mx-auto mb-8">
                    Share your best safari moment for a chance to win a 2-night stay at Hwange Safari Lodge.
                </p>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => document.getElementById('submit-entry')?.scrollIntoView({ behavior: 'smooth' })}>
                        Submit Your Photo
                    </Button>
                    <Button variant="outline">
                        View Gallery
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Recent Entries */}
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder */}
                            {/* <Image src={`/images/contest-${i}.jpg`} fill className="object-cover" alt="Contest Entry" /> */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold">@user{i}</span>
                                    <div className="flex items-center gap-1 text-xs">
                                        <Heart className="w-3 h-3 fill-current" /> {10 * i + 5}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit Form */}
                <div id="submit-entry" className="bg-light p-8 rounded-[2rem] border border-beige">
                    <h3 className="text-2xl font-bold text-dark-deep mb-6 flex items-center gap-2">
                        <Upload className="w-5 h-5 text-accent" /> Enter the Contest
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-dark-deep mb-2">Photo Caption</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" placeholder="e.g., Sunset at waterhole" required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-dark-deep mb-2">Your Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" placeholder="John Doe" required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-dark-deep mb-2">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" placeholder="john@example.com" required />
                        </div>

                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-white transition-colors cursor-pointer">
                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Drag and drop your photo here, or click to browse</p>
                            <input type="file" className="hidden" accept="image/*" />
                        </div>

                        <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                            {isSubmitting ? "Uploading..." : "Submit Entry"}
                        </Button>
                        <p className="text-xs text-center text-gray-400 mt-2">
                            By adding a photo you agree to our terms and conditions.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
