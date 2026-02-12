"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { experiences } from "@/lib/experiences-data";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function ExperiencesSection() {
    return (
        <Section id="experiences" spacing="lg" className="bg-light relative">
            {/* Decorative background pattern */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 transform origin-top pointer-events-none" />

            <Container>
                <SectionHeading
                    title="Safari World"
                    subtitle="Immerse yourself in the authentic African wilderness through our curated collection of premium safari experiences."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {experiences.map((experience, index) => (
                        <motion.div key={experience.id} variants={staggerItem}>
                            <ExperienceCard experience={experience} index={index} />
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </Section>
    );
}
