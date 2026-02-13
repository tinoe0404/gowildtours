'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SafariInput from '../ui/SafariInput';
import SafariTextarea from '../ui/SafariTextarea';
import { Send, CheckCircle2 } from 'lucide-react';

export const ContactForm = () => {
    const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary-50 p-12 rounded-3xl border border-primary-100 text-center flex flex-col items-center"
            >
                <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary-200">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-tight">Message Sent Successfully!</h3>
                <p className="text-gray-600 mb-8 max-w-sm">
                    Thank you for reaching out to Go Wild Tours. Our travel experts will get back to you within 24 hours.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-primary-600 font-bold hover:underline"
                >
                    Send another message
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                    <SafariInput required placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address *</label>
                    <SafariInput required type="email" placeholder="john@example.com" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <SafariInput type="tel" placeholder="+263 71 635 5176" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Inquiry Type *</label>
                    <select className="flex h-10 w-full rounded-lg border border-beige/50 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all appearance-none cursor-pointer">
                        <option>General Inquiry</option>
                        <option>Safari Package Info</option>
                        <option>Booking Assistance</option>
                        <option>Custom Request</option>
                        <option>Feedback</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Message *</label>
                <SafariTextarea required placeholder="Tell us about your safari plans..." className="min-h-[150px]" />
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
                {status === 'submitting' ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span>Send Message</span>
                    </>
                )}
            </button>
            <p className="text-center text-xs text-gray-500">
                By submitting this form, you agree to our Privacy Policy.
            </p>
        </form>
    );
};
