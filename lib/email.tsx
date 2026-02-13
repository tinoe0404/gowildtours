import { Resend } from 'resend';
import ContactConfirmationEmail from '@/emails/ContactConfirmation';
import BookingConfirmationEmail from '@/emails/BookingConfirmation';
import { render } from '@react-email/components';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');
const fromEmail = process.env.EMAIL_FROM || 'bookings@gowildtours.com';
const businessEmail = 'info@gowildtours.com';

export const emailService = {
    async sendContactConfirmation(data: { name: string; email: string; subject: string; message: string }) {
        if (!process.env.RESEND_API_KEY) return;

        try {
            const emailHtml = await render(<ContactConfirmationEmail {...data} />);

            await resend.emails.send({
                from: fromEmail,
                to: data.email,
                subject: 'We received your message - Go Wild Tours',
                html: emailHtml,
            });

            // Simple notification to business
            await resend.emails.send({
                from: fromEmail,
                to: businessEmail,
                subject: `New Inquiry: ${data.subject}`,
                text: `New contact form submission from ${data.name} (${data.email})\n\nMessage: ${data.message}`,
            });
        } catch (error) {
            console.error('Email Service Error (Contact):', error);
        }
    },

    async sendBookingConfirmation(data: { customerName: string; customerEmail: string; bookingReference: string; type: string; totalPrice?: number }) {
        if (!process.env.RESEND_API_KEY) return;

        try {
            const emailHtml = await render(<BookingConfirmationEmail {...data} />);

            await resend.emails.send({
                from: fromEmail,
                to: data.customerEmail,
                subject: `Booking Confirmation - ${data.bookingReference}`,
                html: emailHtml,
            });

            // Notify business
            await resend.emails.send({
                from: fromEmail,
                to: businessEmail,
                subject: `New Booking: ${data.bookingReference}`,
                text: `New ${data.type} booking from ${data.customerName} (${data.customerEmail})\nReference: ${data.bookingReference}`,
            });
        } catch (error) {
            console.error('Email Service Error (Booking):', error);
        }
    }
};
