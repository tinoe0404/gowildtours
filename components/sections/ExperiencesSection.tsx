"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { experiences } from "@/lib/experiences-data";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ExperiencesSection() {
    const sectionRef = useScrollReveal();

    return (
        <Section id="experiences" spacing="lg" className="bg-[var(--color-mist)] relative scroll-reveal" ref={sectionRef as React.RefObject<HTMLElement>}>
            <Container>
                <SectionHeading
                    title="Safari World"
                    subtitle="Immerse yourself in the authentic African wilderness through our curated collection of premium safari experiences."
                    label="Why Choose Us"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {experiences.map((experience, index) => (
                        <div key={experience.id}>
                            <ExperienceCard experience={experience} index={index} />
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
