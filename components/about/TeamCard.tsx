'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
    specialization?: string[];
    languages?: string[];
    socials?: {
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}

interface TeamCardProps {
    member: TeamMember;
    index: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
        >
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-4">
                        {member.socials?.linkedin && (
                            <a href={member.socials.linkedin} className="text-white hover:text-accent transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        )}
                        {member.socials?.instagram && (
                            <a href={member.socials.instagram} className="text-white hover:text-accent transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        )}
                        {member.socials?.email && (
                            <a href={`mailto:${member.socials.email}`} className="text-white hover:text-accent transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                        {member.name}
                    </h3>
                    <span className="text-accent font-bold text-xs uppercase tracking-widest block mt-1">
                        {member.role}
                    </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                    {member.bio}
                </p>

                {member.specialization && (
                    <div className="mt-auto flex flex-wrap gap-2">
                        {member.specialization.map((spec, i) => (
                            <span key={i} className="text-[10px] font-bold uppercase bg-gray-100 text-gray-500 px-2 py-1 rounded">
                                {spec}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
