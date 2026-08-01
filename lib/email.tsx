import * as nodemailer from 'nodemailer';
import ContactConfirmationEmail from '@/emails/ContactConfirmation';
import BookingConfirmationEmail from '@/emails/BookingConfirmation';
import OperatorAlertEmail from '@/emails/OperatorAlert';
import { render } from '@react-email/components';
import { env } from '@/lib/env';

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT),
    secure: env.SMTP_SECURE === 'true' || true,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
});

const fromEmail = env.EMAIL_FROM;
const businessEmail = 'info@gowildtourszim.com';

export interface BookingItem {
    name: string;
    travelers: number;
    date: string;
    pricePerPerson: number;
}

export interface CartBookingData {
    customerName: string;
    customerEmail: string;
    bookingReference: string;
    subtotal: number;
    items: BookingItem[];
}

export interface OperatorAlertData {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    nationality: string;
    bookingReference: string;
    subtotal: number;
    specialRequests: string;
    items: BookingItem[];
}

export const emailService = {
    async sendContactConfirmation(data: { name: string; email: string; subject: string; message: string }) {
        // Skip silently if SMTP isn't fully configured
        if (!env.SMTP_USER || !env.SMTP_PASS) return;

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
        if (!env.SMTP_USER || !env.SMTP_PASS) return;

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

    async sendCartBookingConfirmation(data: CartBookingData) {
        if (!env.SMTP_USER || !env.SMTP_PASS) return;
        
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

    async sendOperatorBookingAlert(data: OperatorAlertData) {
        if (!env.SMTP_USER || !env.SMTP_PASS) return;

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
