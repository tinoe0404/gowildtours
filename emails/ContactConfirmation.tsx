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
    Img,
} from '@react-email/components';
import * as React from 'react';

interface ContactConfirmationEmailProps {
    name: string;
    subject: string;
    message: string;
}

export const ContactConfirmationEmail = ({
    name,
    subject,
    message,
}: ContactConfirmationEmailProps) => (
    <Html>
        <Head />
        <Preview>We received your message - Go Wild Tours</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Hi {name},</Heading>
                <Text style={text}>
                    Thank you for reaching out to Go Wild Tours. We have received your message regarding "<strong>{subject}</strong>" and one of our safari specialists will get back to you within 24 hours.
                </Text>
                <Section style={section}>
                    <Text style={label}>YOUR MESSAGE SUMMARY:</Text>
                    <Text style={messageBox}>"{message}"</Text>
                </Section>
                <Hr style={hr} />
                <Text style={footer}>
                    <strong>Go Wild Tours & Travels</strong><br />
                    Victoria Falls, Zimbabwe<br />
                    <Link href="https://gowildtours.com" style={link}>www.gowildtours.com</Link>
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ContactConfirmationEmail;

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '40px 20px',
    borderRadius: '8px',
    maxWidth: '600px',
};

const h1 = {
    color: '#2a4444',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'left' as const,
    margin: '30px 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
};

const text = {
    color: '#525f7f',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left' as const,
};

const section = {
    padding: '24px',
    backgroundColor: '#f9fafb',
    borderRadius: '4px',
    margin: '20px 0',
};

const label = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#8898aa',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
};

const messageBox = {
    color: '#525f7f',
    fontSize: '14px',
    fontStyle: 'italic',
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
};

const link = {
    color: '#c5a059', // Accent color from design system
    textDecoration: 'underline',
};
