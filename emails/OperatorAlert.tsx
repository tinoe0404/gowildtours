import {
    Body,
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

interface OperatorAlertEmailProps {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    nationality: string;
    bookingReference: string;
    specialRequests: string;
    subtotal: number;
    items: Array<{
        name: string;
        travelers: number;
        date: string;
        pricePerPerson: number;
    }>;
}

export const OperatorAlertEmail = ({
    customerName,
    customerEmail,
    customerPhone,
    nationality,
    bookingReference,
    specialRequests,
    subtotal,
    items,
}: OperatorAlertEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>NEW BOOKING ALERT - Ref #{bookingReference}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={h1}>🚨 New Booking Request</Heading>
                        <Text style={referenceStyle}>Ref: {bookingReference}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Heading style={h2}>Customer Details</Heading>
                        <Text style={text}><strong>Name:</strong> {customerName}</Text>
                        <Text style={text}><strong>Email:</strong> <Link href={`mailto:${customerEmail}`}>{customerEmail}</Link></Text>
                        <Text style={text}><strong>Phone:</strong> {customerPhone}</Text>
                        <Text style={text}><strong>Nationality:</strong> {nationality}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Heading style={h2}>Booking Items</Heading>
                        {items.map((item, idx) => (
                            <div key={idx} style={itemStyle}>
                                <Text style={itemName}>{item.name}</Text>
                                <Text style={itemDetails}>{item.travelers} Travelers | Date: {item.date}</Text>
                                <Text style={itemPrice}>${(item.pricePerPerson * item.travelers).toLocaleString()} USD</Text>
                            </div>
                        ))}
                        <div style={subtotalContainer}>
                            <Text style={subtotalText}><strong>Total:</strong> ${subtotal.toLocaleString()} USD</Text>
                        </div>
                    </Section>

                    {specialRequests && (
                        <>
                            <Hr style={hr} />
                            <Section style={section}>
                                <Heading style={h2}>Special Requests</Heading>
                                <Text style={text}>{specialRequests}</Text>
                            </Section>
                        </>
                    )}

                    <Hr style={hr} />
                    <Section style={footer}>
                        <Text style={footerText}>Please review this request in the admin dashboard to confirm availability.</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default OperatorAlertEmail;

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '40px auto',
    padding: '32px',
    borderRadius: '8px',
    maxWidth: '600px',
    border: '1px solid #e6ebf1',
};

const header = {
    textAlign: 'center' as const,
    marginBottom: '24px',
};

const h1 = {
    color: '#333333',
    fontSize: '24px',
    margin: '0',
};

const referenceStyle = {
    color: '#ffffff',
    backgroundColor: '#000000',
    padding: '4px 12px',
    display: 'inline-block',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '12px 0 0',
};

const section = {
    marginBottom: '24px',
};

const h2 = {
    color: '#666666',
    fontSize: '16px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    margin: '0 0 12px',
};

const text = {
    color: '#444444',
    fontSize: '15px',
    lineHeight: '24px',
    margin: '4px 0',
};

const itemStyle = {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '8px',
};

const itemName = {
    color: '#333333',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 4px',
};

const itemDetails = {
    color: '#666666',
    fontSize: '14px',
    margin: '0 0 4px',
};

const itemPrice = {
    color: '#333333',
    fontSize: '15px',
    fontWeight: 'bold',
    margin: '0',
    textAlign: 'right' as const,
};

const subtotalContainer = {
    marginTop: '16px',
    textAlign: 'right' as const,
};

const subtotalText = {
    color: '#333333',
    fontSize: '18px',
    margin: '0',
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '24px 0',
};

const footer = {
    textAlign: 'center' as const,
};

const footerText = {
    color: '#8898aa',
    fontSize: '13px',
};
