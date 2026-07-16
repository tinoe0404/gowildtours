'use client';

export const dynamic = "force-static";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TeamCard } from '@/components/about/TeamCard';
import { ValueCard } from '@/components/about/ValueCard';
import SectionHeading from '@/components/ui/SectionHeading';
import {
    Heart, ShieldCheck, Leaf, Users, Award,
    Compass, Telescope, Star, CheckCircle2,
    Calendar, MapPin, Camera
} from 'lucide-react';
import FacebookReviews from '@/components/marketing/FacebookReviews';
import ReviewsSection from '@/components/reviews/ReviewsSection';

const staticTeamMembers = [
    {
        name: "Godfrey Mateta",
        role: "Founder & Lead Safari Specialist",
        bio: "With over 15 years of experience in the Zimbabwean wilderness, Godfrey founded Go Wild Tours to share his deep passion for conservation and wildlife. His knowledge of animal behavior and the Victoria Falls region is unmatched.",
        image: "/images/safari/welwitschia.jpg",
        specialization: ["Big Five Tracking", "Conservation", "Photography"],
        languages: ["English", "Shona", "Ndebele"],
        socials: { linkedin: "#", instagram: "#", email: "godfrey@gowildtours.com" }
    },
    {
        name: "Sarah Jenkins",
        role: "Operations Manager",
        bio: "Sarah ensures that every detail of your journey is perfectly orchestrated. From complex logistics to luxury accommodation bookings, her dedication to excellence guarantees a seamless and stress-free safari adventure.",
        image: "/images/safari/kudu.jpg",
        specialization: ["Logistics", "Guest Relations", "Luxury Travel"],
        socials: { linkedin: "#", email: "sarah@gowildtours.com" }
    },
    {
        name: "Brighton Ncube",
        role: "Senior Wildlife Guide",
        bio: "Brighton's keen eyes and expert tracking skills have earned him a reputation as one of the best guides in Hwange National Park. He is particularly passionate about birdlife and predator-prey dynamics.",
        image: "/images/safari/wild-dogs.jpg",
        specialization: ["Birding", "Walking Safaris", "African Botany"],
        socials: { instagram: "#" }
    },
    {
        name: "Elena Rossi",
        role: "Sustainability Director",
        bio: "Elena leads our conservation initiatives and local community projects. She ensures that Go Wild Tours maintains its commitment to eco-friendly practices and social responsibility at every level.",
        image: "/images/safari/martial-eagle.jpg",
        specialization: ["Eco-Tourism", "Community Development"],
        socials: { linkedin: "#", twitter: "#" }
    }
];

const values = [
    {
        title: "Authenticity",
        description: "We provide genuine African experiences, avoiding tourist traps and focusing on real encounters with wildlife and culture.",
        icon: Compass
    },
    {
        title: "Sustainability",
        description: "Environmental conservation is at our core. We operate with minimal impact and support active restoration projects.",
        icon: Leaf
    },
    {
        title: "Community",
        description: "We believe in empowering local communities through employment, education, and direct financial support.",
        icon: Users
    },
    {
        title: "Excellence",
        description: "From our expert guides to our luxury transport, we never compromise on the quality of your experience.",
        icon: Award
    },
    {
        title: "Safety",
        description: "Your well-being is our priority. We employ rigorous safety protocols and maintain first-aid certified staff.",
        icon: ShieldCheck
    },
    {
        title: "Passion",
        description: "We aren't just a business; we are enthusiasts who love Africa and share that love with every traveler.",
        icon: Heart
    }
];

const milestones = [
    { year: "2010", title: "Go Wild Tours Founded", description: "Established in Victoria Falls with a single 4x4 vehicle." },
    { year: "2015", title: "National Expansion", description: "Expanded operations to Hwange National Park and beyond." },
    { year: "2018", title: "Eco-Certification", description: "Achieved Silver status from the Sustainable Tourism Association." },
    { year: "2023", title: "Award Winning", description: "Voted Zimbabwe's Best Boutique Safari Operator." },
    { year: "2026", title: "5,000+ Happy Guests", description: "Celebrating a decade and a half of unforgettable memories." }
];

export default function AboutPage() {
    const team = staticTeamMembers;

    return (
        <main className="min-h-screen bg-white">
            <section className="pt-40 pb-16 bg-mist relative overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(200,135,58,0.05) 0%, rgba(255,255,255,1) 100%)' }}>
                <div className="absolute top-0 left-0 w-full h-[4px]" style={{ background: 'linear-gradient(90deg, #C8873A, #E5A95A, #C8873A)' }} />
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider mb-4 border border-accent/20">About Us</span>
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-dark-deep mb-6">Our Story</h1>
                    <p className="text-xl text-warm-gray max-w-2xl mx-auto leading-relaxed">Connecting people with Africa's wild heart through authentic, sustainable, and unforgettable safari experiences.</p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2 space-y-6">
                            <SectionHeading
                                title="How it all began"
                                subtitle="The Journey of Go Wild Tours"
                                align="left"
                            />
                            <div className="prose prose-lg text-gray-600 leading-relaxed uppercase-h3 tracking-tight">
                                <p>
                                    Founded in 2010 by Godfrey Mateta, Go Wild Tours started with a simple belief: that the most powerful way to protect Africa's wilderness is to help people fall in love with it.
                                </p>
                                <p>
                                    Godfrey, a former national park ranger, saw the need for a boutique safari operator that prioritized deep ecological knowledge over mass tourism. He wanted to create tours that felt like personal explorations, guided by the best experts in the field.
                                </p>
                                <p>
                                    Over the past 16 years, we have grown from a small family business in Victoria Falls into one of Zimbabwe's most respected safari operators, without ever losing that personal touch.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                                <div>
                                    <span className="text-4xl font-black text-primary-600 block">16+</span>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Years Experience</span>
                                </div>
                                <div>
                                    <span className="text-4xl font-black text-primary-600 block">5k+</span>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Happy Travelers</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="aspect-square rounded-2xl overflow-hidden shadow-2xl mt-12"
                                >
                                    <img src="/images/safari/victoria-falls-wide.jpg" alt="Safari history" className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    <img src="/images/safari/elephants-waterhole.jpg" alt="Founders" className="w-full h-full object-cover" />
                                </motion.div>
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-accent text-dark-deep p-8 rounded-2xl shadow-xl hidden md:block">
                                <p className="text-xl font-bold italic">"Africa is more than a destination; it's a feeling."</p>
                                <span className="text-sm font-bold block mt-2 text-dark-deep/70">— Godfrey Mateta</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <SectionHeading
                        title="Our Core Values"
                        subtitle="What drives us forward"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        {values.map((value, idx) => (
                            <ValueCard key={idx} {...value} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-24 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeading title="Key Milestones" subtitle="Our Growth Over the Years" />
                        <div className="relative mt-20 space-y-12 before:absolute before:left-4 md:before:left-1/2 before:w-1 before:h-full before:bg-primary-100 before:-translate-x-1/2">
                            {milestones.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="md:w-1/2 flex items-center justify-end px-4 md:px-12">
                                        <div className={`text-left md:text-right ${idx % 2 === 0 ? 'md:text-left' : ''}`}>
                                            <span className="text-3xl font-black text-primary-600 block mb-2">{item.year}</span>
                                            <h4 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-tight">{item.title}</h4>
                                            <p className="text-gray-500 text-sm">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-primary-600 rounded-full -translate-x-1/2 z-10" />
                                    <div className="md:w-1/2" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <SectionHeading
                        title="Meet the Team"
                        subtitle="Dedicated experts behind the scenes"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {team.map((member: any, idx: number) => (
                            <TeamCard key={idx} member={member} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Sustainability Section */}
            <section className="py-24 bg-dark-deep text-white overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2 relative">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="relative z-10 p-12 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10"
                            >
                                <Leaf className="w-16 h-16 text-accent mb-8" />
                                <h2 className="text-4xl font-bold mb-6 uppercase tracking-tight">Our Commitment to Conservation</h2>
                                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                    We believe that tourism must be a force for good. That's why every safari booked with Go Wild Tours contributes directly to local anti-poaching units and community education programs.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "10% of profits donated to habitat restoration",
                                        "Zero-plastic policy on all guided tours",
                                        "Carbon-offsetting for all vehicle transport",
                                        "100% locally employed staff and guides"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-200 font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-accent" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                            <img src="/images/safari/rhino.jpg" alt="Conservation 1" className="rounded-2xl h-80 w-full object-cover" />
                            <img src="/images/safari/wild-dogs.jpg" alt="Conservation 2" className="rounded-2xl h-80 w-full object-cover mt-12" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <FacebookReviews />

            {/* Custom Reviews System */}
            <ReviewsSection />

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="relative rounded-[40px] p-12 md:p-24 overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, var(--color-savanna), var(--color-emerald))' }}>
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none mix-blend-overlay">
                            <img src="/images/safari/leopard-tree.jpg" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative z-10 text-center max-w-2xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 uppercase tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Ready for your adventure?</h2>
                            <p className="text-white/90 text-lg mb-12 font-medium">Join us for the journey of a lifetime. Let our experts craft your perfect safari experience.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link href="/safaris" className="w-full sm:w-auto bg-white text-dark-deep px-10 py-5 rounded-2xl font-black text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-1">Explore Safaris</Link>
                                <Link href="/contact" className="w-full sm:w-auto bg-transparent text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all border-2 border-white">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
