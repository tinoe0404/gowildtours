"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Activity } from "@/lib/activities-data";
import { ArrowRight, Star } from "lucide-react";
import Button from "@/components/ui/Button";

interface FeaturedActivitiesProps {
    activities: Activity[];
}

export default function FeaturedActivities({ activities }: FeaturedActivitiesProps) {
    if (activities.length === 0) return null;

    return (
        <section className="py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-neutral-900">Most Popular Experiences</h2>
                    <p className="text-neutral-600">Hand-picked adventures you shouldn&apos;t miss.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {activities.slice(0, 2).map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative group h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-orange-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                                    {activity.category}
                                </div>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span className="text-xs font-bold text-white">4.9</span>
                                </div>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                                {activity.title}
                            </h3>

                            <p className="text-neutral-300 text-sm md:text-base max-w-lg mb-8 line-clamp-2">
                                {activity.shortDescription}
                            </p>

                            <div className="flex flex-wrap items-center gap-6">
                                <Link href={`/activities/${activity.slug}`}>
                                    <Button size="lg" className="bg-white text-black hover:bg-neutral-100 rounded-full px-8">
                                        Book Experience
                                    </Button>
                                </Link>

                                <Link
                                    href={`/activities/${activity.slug}`}
                                    className="text-white font-semibold flex items-center gap-2 group/link"
                                >
                                    View Details
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>

                                <div className="ml-auto">
                                    <span className="text-neutral-400 text-xs block">Starts from</span>
                                    <span className="text-2xl font-black text-white">${activity.price.amount}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
