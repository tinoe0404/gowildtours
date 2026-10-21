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
const businessEmail = 'bookings@gowildtourszim.com';

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
    async sendContactConfirmation(data: {
        name: string;
        email: string;
        phone?: string | null;
        subject: string;
        message: string;
        inquiryType?: string;
    }) {
        // Skip silently if SMTP isn't fully configured
        if (!env.SMTP_USER || !env.SMTP_PASS) return;

        try {
            // 1. Send confirmation to customer
            const emailHtml = await render(<ContactConfirmationEmail name={data.name} subject={data.subject} message={data.message} />);

            await transporter.sendMail({
                from: `Go Wild Tours <${fromEmail}>`,
                to: data.email,
                subject: 'We received your message - Go Wild Tours',
                html: emailHtml,
            });

            // 2. Send complete notification to bookings@gowildtourszim.com
            const businessHtml = `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
                    <div style="border-bottom: 2px solid #15803d; padding-bottom: 16px; margin-bottom: 20px;">
                        <h2 style="color: #14532d; margin: 0; font-size: 20px;">New Inquiry / Tourist Lead</h2>
                        <p style="color: #6b7280; font-size: 13px; margin: 4px 0 0 0;">Received via GoWild Tours Website</p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280; width: 140px;"><strong>Tourist Name:</strong></td>
                            <td style="padding: 8px 0; font-weight: 600; color: #111827;">${data.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;"><strong>Email Address:</strong></td>
                            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #15803d; text-decoration: none; font-weight: 500;">${data.email}</a></td>
                        </tr>
                        ${data.phone ? `
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;"><strong>Phone Number:</strong></td>
                            <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #15803d; text-decoration: none;">${data.phone}</a></td>
                        </tr>` : ''}
                        ${data.inquiryType ? `
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;"><strong>Inquiry Type:</strong></td>
                            <td style="padding: 8px 0;"><span style="background-color: #f0fdf4; color: #166534; padding: 3px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600;">${data.inquiryType}</span></td>
                        </tr>` : ''}
                        <tr>
                            <td style="padding: 8px 0; color: #6b7280;"><strong>Subject:</strong></td>
                            <td style="padding: 8px 0; font-weight: 600; color: #111827;">${data.subject}</td>
                        </tr>
                    </table>

                    <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 24px;">
                        <span style="color: #4b5563; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; display: block; margin-bottom: 8px;">Message & Details</span>
                        <div style="white-space: pre-wrap; color: #1f2937; line-height: 1.6; font-size: 14px;">${data.message}</div>
                    </div>

                    <div style="text-align: center; padding-top: 8px;">
                        <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" style="background-color: #15803d; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; display: inline-block;">
                            Reply to ${data.name}
                        </a>
                    </div>

                    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f3f4f6; font-size: 12px; color: #9ca3af; text-align: center;">
                        You received this because an inquiry was submitted to GoWild Tours • You can also hit Reply to answer directly.
                    </div>
                </div>
            `;

            await transporter.sendMail({
                from: `Go Wild Tours <${fromEmail}>`,
                to: businessEmail,
                replyTo: data.email,
                subject: `New Lead: ${data.subject} (${data.name})`,
                text: `New inquiry from ${data.name} (${data.email})${data.phone ? ` Phone: ${data.phone}` : ''}\nSubject: ${data.subject}\n\n${data.message}`,
                html: businessHtml,
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
                from: `Go Wild Tours <${fromEmail}>`,
                to: data.customerEmail,
                subject: `Booking Confirmation - ${data.bookingReference}`,
                html: emailHtml,
            });

            // Notify business
            await transporter.sendMail({
                from: `Go Wild Tours <${fromEmail}>`,
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
                from: `Go Wild Tours <${fromEmail}>`,
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
                from: `Go Wild Tours <${fromEmail}>`,
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
