'use client';

import React from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { FAQAccordion } from '@/components/contact/FAQAccordion';
import SectionHeading from '@/components/ui/SectionHeading';
import {
    Phone, Mail, MapPin, Clock, MessageSquare,
    Facebook, Instagram, Twitter, Youtube, Linkedin
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqs = [
    {
        question: "How do I book a safari package?",
        answer: "Booking is easy! You can browse our packages and click 'Enquire Now', or fill out the contact form on this page. Our specialists will then contact you to discuss your preferences and finalize the itinerary."
    },
    {
        question: "What is the best time of year to visit?",
        answer: "Zimbabwe is a year-round destination. The dry season (May to October) is best for wildlife viewing, while the wet season (November to April) is beautiful for birding and lush landscapes. Victoria Falls is at its most powerful from March to May."
    },
    {
        question: "What should I pack for my safari?",
        answer: "We recommend light, breathable clothing in neutral colors (khaki, olive, tan). Don't forget a warm jacket for early morning drives, comfortable walking shoes, a hat, sun protection, and of course, binoculars and a camera!"
    },
    {
        question: "Are your tours suitable for children?",
        answer: "Yes! We offer family-friendly safaris and can tailor any trip to accommodate children of all ages. Some lodges have age restrictions for certain activities, which we will highlight during the planning phase."
    },
    {
        question: "What is your cancellation policy?",
        answer: "Cancellations made more than 60 days before travel typically incur a loss of deposit. Within 60 days, fees increase on a sliding scale. We strongly recommend comprehensive travel insurance to cover any unforeseen changes."
    }
];

export default function ContactPage() {
    const contactRef = useScrollReveal();
    const faqRef = useScrollReveal();

    return (
        <main className="bg-white">
            <section className="pt-32 pb-12 bg-white">
                <div className="container">
                    <span className="text-label block mb-3">Contact</span>
                    <h1 className="text-h1 font-display font-bold text-[var(--color-earth)]">Get in Touch</h1>
                    <p className="text-body-lg text-[var(--color-text-muted)] max-w-2xl mt-3">Have questions about our safari packages or need a custom itinerary? Our team of experts is here to help you plan the adventure of a lifetime.</p>
                </div>
            </section>

            <section className="section scroll-reveal" ref={contactRef as React.RefObject<HTMLElement>}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Form Section */}
                        <div className="lg:col-span-7">
                            <div className="bg-white rounded-[var(--radius-lg)] p-8 md:p-12 border border-[var(--color-mist)] shadow-lg">
                                <div className="mb-10">
                                    <h2 className="text-2xl font-bold font-display text-[var(--color-earth)] mb-2">Send us a message</h2>
                                    <p className="text-[var(--color-dusk)] font-medium">We typically respond within 24 hours.</p>
                                </div>
                                <ContactForm />
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="lg:col-span-5 space-y-8">
                            {/* Contact Cards */}
                            <div className="grid grid-cols-1 gap-6">
                                <div className="p-8 bg-[var(--color-sand)] rounded-[var(--radius-lg)] group hover:shadow-lg transition-all">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[var(--color-savanna)] mb-6 group-hover:bg-[var(--color-savanna)] group-hover:text-white transition-colors">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold font-display text-[var(--color-earth)] mb-2 uppercase tracking-tight">Visit Our Office</h3>
                                    <p className="text-[var(--color-dusk)] leading-relaxed font-medium">
                                        Go Wild Tours Head Office<br />
                                        123 Safari Drive, Victoria Falls<br />
                                        Zimbabwe
                                    </p>
                                </div>

                                <div className="p-8 bg-[var(--color-sand)] rounded-[var(--radius-lg)] group hover:shadow-lg transition-all">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[var(--color-savanna)] mb-6 group-hover:bg-[var(--color-savanna)] group-hover:text-white transition-colors">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold font-display text-[var(--color-earth)] mb-2 uppercase tracking-tight">Direct Contact</h3>
                                    <div className="space-y-3">
                                        <a href="tel:+263716355176" className="flex items-center gap-3 text-[var(--color-dusk)] hover:text-[var(--color-savanna)] transition-colors font-medium">
                                            <Phone className="w-4 h-4" /> +263 71 635 5176
                                        </a>
                                        <a href="mailto:info@gowildtours.com" className="flex items-center gap-3 text-[var(--color-dusk)] hover:text-[var(--color-savanna)] transition-colors font-medium">
                                            <Mail className="w-4 h-4" /> info@gowildtours.com
                                        </a>
                                    </div>
                                </div>

                                <div className="p-8 bg-[var(--color-sand)] rounded-[var(--radius-lg)] group hover:shadow-lg transition-all">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[var(--color-savanna)] mb-6 group-hover:bg-[var(--color-savanna)] group-hover:text-white transition-colors">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold font-display text-[var(--color-earth)] mb-2 uppercase tracking-tight">Working Hours</h3>
                                    <div className="space-y-1 text-sm text-[var(--color-dusk)] font-medium">
                                        <p className="flex justify-between"><span>Mon - Fri:</span> <span>8:00 AM - 6:00 PM</span></p>
                                        <p className="flex justify-between"><span>Sat:</span> <span>9:00 AM - 2:00 PM</span></p>
                                        <p className="flex justify-between text-red-500"><span>Sun:</span> <span>Emergency Only</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[500px] w-full bg-gray-100 grayscale hover:grayscale-0 transition-all duration-1000">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3801.4580252195974!2d25.83648587595568!3d-17.925404583002573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19456952796934c9%3A0xc6cb598282381e4b!2sVictoria%20Falls!5e0!3m2!1sen!2szw!4v1710000000000!5m2!1sen!2szw"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </section>

            {/* FAQ Section */}
            <section className="section bg-[var(--color-mist)] scroll-reveal" ref={faqRef as React.RefObject<HTMLElement>}>
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <SectionHeading
                            title="Frequently Asked Questions"
                            subtitle="Quick answers to common inquiries"
                            label="FAQ"
                        />
                        <FAQAccordion items={faqs} className="mt-16" />

                        <div className="text-center mt-12 p-8 bg-white rounded-[var(--radius-lg)] border border-[var(--color-sand)] shadow-sm">
                            <p className="text-[var(--color-dusk)] font-medium mb-4">Still have more questions?</p>
                            <a href="tel:+263716355176" className="inline-flex items-center gap-2 btn btn--primary">
                                <Phone className="w-5 h-5" /> Call our Experts
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
