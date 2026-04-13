'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            type: formData.get('type') === 'General Inquiry' ? 'contact' : 'custom_quote',
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Failed to send message');
            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-[var(--color-mist)] p-12 rounded-[var(--radius-lg)] border border-[var(--color-sand)] text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-[var(--color-savanna)] text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-[var(--color-earth)] font-display text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                <p className="text-[var(--color-dusk)] mb-8 max-w-sm">
                    Thank you for reaching out to Go Wild Tours. Our travel experts will get back to you within 24 hours.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-[var(--color-savanna)] font-bold hover:underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input id="name" name="name" type="text" required placeholder="John Doe" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input id="email" name="email" type="email" required placeholder="john@example.com" className="form-input" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input id="phone" name="phone" type="tel" placeholder="+263 71 635 5176" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="type" className="form-label">Inquiry Type *</label>
                    <select id="type" name="type" className="form-input appearance-none text-[var(--color-earth)]" required>
                        <option>General Inquiry</option>
                        <option>Safari Package Info</option>
                        <option>Booking Assistance</option>
                        <option>Custom Request</option>
                        <option>Feedback</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea id="message" name="message" required placeholder="Tell us about your safari plans..." className="form-input section-min-h-[150px] resize-y" rows={6}></textarea>
            </div>

            {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again or email us directly.</p>
            )}

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn btn--primary w-full flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
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
            <p className="text-center text-xs text-[var(--color-dusk)]">
                By submitting this form, you agree to our Privacy Policy.
            </p>
        </form>
    );
};
