'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/contact/ContactForm';
import { FAQAccordion } from '@/components/contact/FAQAccordion';
import SectionHeading from '@/components/ui/SectionHeading';
import {
    Phone, Mail, MapPin, Clock, MessageSquare,
    Facebook, Instagram, Twitter, Youtube, Linkedin
} from 'lucide-react';

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
    return (
        <main className="min-h-screen bg-white">
            {/* Header / Hero */}
            <section className="bg-gray-50 border-b border-gray-100 py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <nav className="flex items-center space-x-2 text-gray-500 text-sm mb-6">
                        <a href="/" className="hover:text-primary-600 transition-colors font-medium">Home</a>
                        <span>/</span>
                        <span className="text-gray-900 font-bold">Contact</span>
                    </nav>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 uppercase tracking-tight">Get in Touch</h1>
                        <p className="text-xl text-gray-600 font-medium leading-relaxed">
                            Have questions about our safari packages or need a custom itinerary? Our team of experts is here to help you plan the adventure of a lifetime.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Form Section */}
                        <div className="lg:w-[60%] order-2 lg:order-1">
                            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-100/50">
                                <div className="mb-10">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-tight">Send us a message</h2>
                                    <p className="text-gray-500 font-medium">We typically respond within 24 hours.</p>
                                </div>
                                <ContactForm />
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="lg:w-[40%] order-1 lg:order-2 space-y-8">
                            {/* Contact Cards */}
                            <div className="grid grid-cols-1 gap-6">
                                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 group hover:shadow-lg transition-all">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tight">Visit Our Office</h3>
                                    <p className="text-gray-600 leading-relaxed font-medium">
                                        Go Wild Tours Head Office<br />
                                        123 Safari Drive, Victoria Falls<br />
                                        Zimbabwe
                                    </p>
                                    <a href="#" className="inline-block mt-4 text-primary-600 font-bold hover:underline text-sm uppercase tracking-wider">Get Directions</a>
                                </div>

                                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 group hover:shadow-lg transition-all">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tight">Direct Contact</h3>
                                    <div className="space-y-3">
                                        <a href="tel:+263716355176" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors font-medium">
                                            <Phone className="w-4 h-4" /> +263 71 635 5176
                                        </a>
                                        <a href="mailto:info@gowildtours.com" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors font-medium">
                                            <Mail className="w-4 h-4" /> info@gowildtours.com
                                        </a>
                                    </div>
                                </div>

                                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 group hover:shadow-lg transition-all">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tight">Working Hours</h3>
                                    <div className="space-y-1 text-sm text-gray-600 font-medium">
                                        <p className="flex justify-between"><span>Mon - Fri:</span> <span>8:00 AM - 6:00 PM</span></p>
                                        <p className="flex justify-between"><span>Sat:</span> <span>9:00 AM - 2:00 PM</span></p>
                                        <p className="flex justify-between text-red-500"><span>Sun:</span> <span>Emergency Only</span></p>
                                        <p className="mt-4 pt-4 border-t border-gray-200 text-[10px] text-gray-400 uppercase tracking-widest font-bold">Current Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} CAT</p>
                                    </div>
                                </div>
                            </div>

                            {/* Socials */}
                            <div className="p-8 bg-dark-deep rounded-2xl text-white">
                                <h3 className="text-lg font-bold mb-6 uppercase tracking-tight">Follow Our Adventures</h3>
                                <div className="flex gap-4">
                                    {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                                        <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-all hover:-translate-y-1 border border-white/10">
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    ))}
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
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto">
                        <SectionHeading
                            title="Frequently Asked Questions"
                            subtitle="Quick answers to common inquiries"
                        />
                        <FAQAccordion items={faqs} className="mt-16" />

                        <div className="text-center mt-12 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <p className="text-gray-600 font-medium mb-4">Still have more questions?</p>
                            <a href="tel:+263716355176" className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-100">
                                <Phone className="w-5 h-5" /> Call our Experts
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
