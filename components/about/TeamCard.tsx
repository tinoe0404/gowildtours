'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Twitter, Mail } from 'lucide-react';
import Image from 'next/image';

interface SocialLinks {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    email?: string;
}

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
    specialization?: string[];
    languages?: string[];
    socials?: SocialLinks;
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
            className="group"
        >
            <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl bg-gray-100">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-4 text-white">
                        {member.socials?.linkedin && (
                            <a href={member.socials.linkedin} className="hover:text-accent transition-colors"><Linkedin size={20} /></a>
                        )}
                        {member.socials?.twitter && (
                            <a href={member.socials.twitter} className="hover:text-accent transition-colors"><Twitter size={20} /></a>
                        )}
                        {member.socials?.instagram && (
                            <a href={member.socials.instagram} className="hover:text-accent transition-colors"><Instagram size={20} /></a>
                        )}
                        {member.socials?.email && (
                            <a href={`mailto:${member.socials.email}`} className="hover:text-accent transition-colors"><Mail size={20} /></a>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3 text-sm tracking-wide uppercase">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{member.bio}</p>
                
                {member.specialization && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {member.specialization.map((spec, i) => (
                            <span key={i} className="text-xs font-semibold bg-gray-50 text-gray-500 px-2 py-1 rounded-md uppercase tracking-wider">
                                {spec}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
