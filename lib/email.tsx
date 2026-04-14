import * as nodemailer from 'nodemailer';
import ContactConfirmationEmail from '@/emails/ContactConfirmation';
import BookingConfirmationEmail from '@/emails/BookingConfirmation';
import OperatorAlertEmail from '@/emails/OperatorAlert';
import { render } from '@react-email/components';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true' || true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const fromEmail = process.env.EMAIL_FROM || 'bookings@gowildtours.com';
const businessEmail = 'info@gowildtours.com';

export const emailService = {
    async sendContactConfirmation(data: { name: string; email: string; subject: string; message: string }) {
        // Skip silently if SMTP isn't fully configured
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

        try {
            const emailHtml = await render(<ContactConfirmationEmail {...data} />);

            await transporter.sendMail({
                from: fromEmail,
                to: data.email,
                subject: 'We received your message - Go Wild Tours',
                html: emailHtml,
            });

            // Simple notification to business
            await transporter.sendMail({
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
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

        try {
            const emailHtml = await render(<BookingConfirmationEmail {...data} />);

            await transporter.sendMail({
                from: fromEmail,
                to: data.customerEmail,
                subject: `Booking Confirmation - ${data.bookingReference}`,
                html: emailHtml,
            });

            // Notify business
            await transporter.sendMail({
                from: fromEmail,
                to: businessEmail,
                subject: `New Booking: ${data.bookingReference}`,
                text: `New ${data.type} booking from ${data.customerName} (${data.customerEmail})\nReference: ${data.bookingReference}`,
            });
        } catch (error) {
            console.error('Email Service Error (Booking):', error);
        }
    },

    async sendCartBookingConfirmation(data: any) {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
        
        try {
            // Reusing BookingConfirmation but passing items
            const emailHtml = await render(<BookingConfirmationEmail {...data} type="safari package" totalPrice={data.subtotal} />);

            await transporter.sendMail({
                from: fromEmail,
                to: data.customerEmail,
                subject: `Your Safari Booking Request - Ref #${data.bookingReference}`,
                html: emailHtml,
            });
        } catch (error) {
            console.error('Email Service Error (Cart Booking Confirmation):', error);
            throw error;
        }
    },

    async sendOperatorBookingAlert(data: any) {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

        try {
            const emailHtml = await render(<OperatorAlertEmail {...data} />);

            await transporter.sendMail({
                from: fromEmail,
                to: businessEmail,
                subject: `[NEW BOOKING] Ref #${data.bookingReference} — ${data.customerName}`,
                html: emailHtml,
            });
        } catch (error) {
            console.error('Email Service Error (Operator Alert):', error);
            throw error;
        }
    }
};
