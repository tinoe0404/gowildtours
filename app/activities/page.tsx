import { Metadata } from "next";
import ActivitiesClient from "./ActivitiesClient";
import { activities } from "@/lib/activities-data";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Safari Activities & Adventures | Go Wild Tours",
    description: "Discover unforgettable standalone experiences in Africa. From white water rafting and bungee jumping to night safaris and cultural village tours.",
};

export default function ActivitiesPage() {
    // We can pass initial data if we want, but for now we'll import it in the client
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80"
                    alt="Adventure Activity Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 text-center px-4">
                    <div className="flex items-center justify-center gap-2 text-white/80 text-sm font-medium mb-4">
                        <span>Home</span>
                        <span>•</span>
                        <span className="text-orange-500">Activities</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                        Adventure <span className="text-orange-500">Activities</span>
                    </h1>
                    <p className="text-lg text-neutral-200 max-w-2xl mx-auto font-medium">
                        Unforgettable moments in the heart of Africa. Choose from our curated selection of day trips, group tours, and solo adventures.
                    </p>
                </div>

                {/* Decorative Bottom Curve */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-50 to-transparent" />
            </section>

            <ActivitiesClient activities={activities} />
        </main>
    );
}
