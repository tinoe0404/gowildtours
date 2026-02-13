"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { Activity } from "@/lib/activities-data";
import SafariBadge from "@/components/ui/SafariBadge";
import Button from "@/components/ui/Button";

interface ActivityCardProps {
    activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {activity.featured && (
                        <SafariBadge className="bg-orange-600 hover:bg-orange-700 text-white border-none shadow-lg">
                            Featured
                        </SafariBadge>
                    )}
                    {activity.popular && (
                        <SafariBadge className="bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-lg">
                            Popular
                        </SafariBadge>
                    )}
                    {activity.seasonal && (
                        <SafariBadge className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg">
                            Seasonal
                        </SafariBadge>
                    )}
                </div>

                {/* Duration Overlay */}
                <div className="absolute bottom-4 right-4">
                    <div className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
                        {activity.duration.display}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-orange-600 text-xs font-bold uppercase tracking-wider">
                        {activity.category}
                    </span>
                </div>

                <Link href={`/activities/${activity.slug}`}>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                        {activity.title}
                    </h3>
                </Link>

                <p className="text-neutral-600 text-sm line-clamp-2 mb-6 flex-grow">
                    {activity.shortDescription}
                </p>

                {/* Key Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-neutral-500">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-medium">{activity.duration.display}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500">
                        <Users className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-medium">
                            {activity.groupSize.max} People
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500">
                        <Star className="w-4 h-4 text-orange-600 fill-orange-600" />
                        <span className="text-xs font-medium">{activity.difficulty}</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                        <span className="text-neutral-500 text-xs block mb-0.5">From</span>
                        <span className="text-xl font-bold text-neutral-900">
                            ${activity.price.amount}
                        </span>
                        <span className="text-neutral-500 text-xs ml-1">/{activity.price.per === "Person" ? "pp" : "unit"}</span>
                    </div>

                    <Link href={`/activities/${activity.slug}`}>
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full">
                            Book Now
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
