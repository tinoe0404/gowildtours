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

export const PromoEmail = () => (
    <Html>
        <Head />
        <Preview>Limited Time Offer: Save 15% on Luxury Safaris! 🐘</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Text style={logoText}>GO WILD TOURS</Text>
                </Section>

                <Section style={offerBox}>
                    <Heading style={offerHeading}>15% OFF</Heading>
                    <Text style={offerSubheading}>YOUR NEXT ADVENTURE</Text>
                </Section>

                <Section style={content}>
                    <Heading style={h2}>The Wild is Calling</Heading>
                    <Text style={text}>
                        For a limited time, book any luxury safari package for travel between May and August and receive an exclusive 15% discount.
                    </Text>
                    <Text style={text}>
                        Use code: <strong>WILD15</strong> at checkout.
                    </Text>

                    <Button style={button} href="https://gowildtours.com/safaris">
                        Claim Your Discount
                    </Button>
                </Section>

                <Hr style={hr} />
                <Text style={footer}>
                    *Offer valid until April 30th. Terms and conditions apply.<br />
                    <Link href="#" style={footerLink}>Unsubscribe</Link>
                </Text>
            </Container>
        </Body>
    </Html>
);

export default PromoEmail;

const main = {
    backgroundColor: '#2a4444', // Dark background for promo
    fontFamily: '"Outfit", sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '40px auto',
    padding: '0',
    borderRadius: '12px',
    maxWidth: '600px',
    overflow: 'hidden',
};

const header = {
    textAlign: 'center' as const,
    padding: '32px',
    backgroundColor: '#f4f1ea',
};

const logoText = {
    fontSize: '24px',
    fontWeight: '900',
    color: '#2a4444',
    letterSpacing: '2px',
};

const offerBox = {
    backgroundColor: '#d69e2e',
    color: '#ffffff',
    textAlign: 'center' as const,
    padding: '48px 20px',
};

const offerHeading = {
    fontSize: '64px',
    fontWeight: '900',
    margin: '0',
    lineHeight: '1',
};

const offerSubheading = {
    fontSize: '20px',
    letterSpacing: '4px',
    margin: '16px 0 0',
    fontWeight: 'bold',
};

const content = {
    padding: '48px 32px',
    textAlign: 'center' as const,
};

const h2 = {
    color: '#2a4444',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 16px',
};

const text = {
    color: '#4a5568',
    fontSize: '16px',
    lineHeight: '26px',
    marginBottom: '24px',
};

const button = {
    backgroundColor: '#2a4444',
    borderRadius: '50px',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    padding: '16px 48px',
    display: 'inline-block',
};

const hr = {
    borderColor: '#edf2f7',
    margin: '0 32px',
};

const footer = {
    color: '#a0aec0',
    fontSize: '12px',
    textAlign: 'center' as const,
    padding: '32px',
};

const footerLink = {
    color: '#a0aec0',
    textDecoration: 'underline',
};
