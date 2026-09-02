import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Link,
} from '@react-email/components';
import * as React from 'react';

interface BookingConfirmationEmailProps {
    customerName: string;
    bookingReference: string;
    type?: string;
    totalPrice?: number;
    subtotal?: number;
    items?: Array<{
        name: string;
        travelers: number;
        date: string;
        pricePerPerson: number;
    }>;
}

export const BookingConfirmationEmail = ({
    customerName,
    bookingReference,
    type = "safari",
    totalPrice,
    subtotal,
    items,
}: BookingConfirmationEmailProps) => {
    const finalTotal = subtotal || totalPrice;
    const depositAmount = finalTotal ? finalTotal * 0.3 : 0;

    return (
        <Html>
            <Head />
            <Preview>Your Safari Booking Confirmation - {bookingReference}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Text style={logoText}>GO WILD TOURS</Text>
                    </Section>
                    <Heading style={h1}>Booking Received</Heading>
                    <Text style={text}>
                        Hi {customerName}, thank you for choosing Go Wild Tours! We've received your booking request.
                    </Text>

                    <Section style={detailsSection}>
                        <Text style={detailItem}><strong>Booking Reference:</strong> {bookingReference}</Text>
                        <Text style={detailItem}><strong>Status:</strong> Pending Confirmation</Text>
                    </Section>

                    {items && items.length > 0 && (
                        <Section style={itemsSection}>
                            <Heading style={h2}>Your Safari Package</Heading>
                            {items.map((item, idx) => (
                                <div key={idx} style={itemRow}>
                                    <Text style={itemName}>{item.name}</Text>
                                    <Text style={itemDetails}>{item.travelers} Travelers | {item.date}</Text>
                                    <Text style={itemPrice}>${(item.pricePerPerson * item.travelers).toLocaleString()} USD</Text>
                                </div>
                            ))}
                        </Section>
                    )}

                    {finalTotal && (
                        <Section style={pricingSection}>
                            <Text style={subtotalText}><strong>Subtotal:</strong> ${finalTotal.toLocaleString()} USD</Text>
                            <Text style={depositText}>A 30% deposit (~${depositAmount.toLocaleString()} USD) will be required to secure your reservation upon confirmation.</Text>
                        </Section>
                    )}

                    <Hr style={hr} />

                    <Section>
                        <Heading style={h2}>What happens next?</Heading>
                        <Text style={text}><strong>1. We confirm availability</strong><br/>Our experts are checking lodge and guide availability for your dates.</Text>
                        <Text style={text}><strong>2. You receive an invoice</strong><br/>Once confirmed, we'll send a secure payment link for your 30% deposit.</Text>
                        <Text style={text}><strong>3. You're confirmed!</strong><br/>After deposit, your safari is locked in. Time to start packing!</Text>
                    </Section>

                    <Section style={btnContainer}>
                        <Button style={button} href="https://gowildtours.com/contact">
                            Contact Support
                        </Button>
                    </Section>

                    <Hr style={hr} />
                    <Text style={footer}>
                        If you have any questions, please reply to this email or call us at +263 71 670 7132.<br />
                        &copy; {new Date().getFullYear()} Go Wild Tours & Travels. Victoria Falls, Zimbabwe.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default BookingConfirmationEmail;

const main = {
    backgroundColor: '#f4f1ea', // Warm background
    fontFamily: '"Outfit",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '40px auto',
    padding: '40px 32px',
    borderRadius: '24px',
    maxWidth: '600px',
    border: '1px solid #e2e8f0',
};

const header = {
    textAlign: 'center' as const,
    marginBottom: '32px',
};

const logoText = {
    fontSize: '24px',
    fontWeight: '900',
    color: '#2a4444',
    letterSpacing: '2px',
};

const h1 = {
    color: '#2a4444',
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '0 0 24px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
};

const text = {
    color: '#4a5568',
    fontSize: '16px',
    lineHeight: '26px',
    textAlign: 'left' as const,
};

const detailsSection = {
    padding: '24px',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    margin: '24px 0',
    border: '1px solid #edf2f7',
};

const detailItem = {
    margin: '8px 0',
    fontSize: '15px',
    color: '#2d3748',
};

const btnContainer = {
    textAlign: 'center' as const,
    marginTop: '32px',
};

const button = {
    backgroundColor: '#2a4444',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '16px 32px',
};

const h2 = {
    color: '#333333',
    fontSize: '20px',
    margin: '0 0 16px',
};

const itemsSection = {
    margin: '24px 0',
};

const itemRow = {
    padding: '12px 0',
    borderBottom: '1px solid #edf2f7',
};

const itemName = {
    color: '#2d3748',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 4px',
};

const itemDetails = {
    color: '#718096',
    fontSize: '14px',
    margin: '0',
};

const itemPrice = {
    color: '#2d3748',
    fontSize: '15px',
    fontWeight: 'bold',
    margin: '4px 0 0',
};

const pricingSection = {
    backgroundColor: '#f8fafc',
    padding: '16px 24px',
    borderRadius: '12px',
    marginBottom: '24px',
};

const subtotalText = {
    color: '#2a4444',
    fontSize: '18px',
    margin: '0 0 8px',
};

const depositText = {
    color: '#c8873a',
    fontSize: '14px',
    margin: '0',
};

const hr = {
    borderColor: '#edf2f7',
    margin: '32px 0',
};

const footer = {
    color: '#718096',
    fontSize: '12px',
    lineHeight: '20px',
    textAlign: 'center' as const,
};
