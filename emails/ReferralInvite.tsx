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

export const ReferralEmail = ({ inviteLink = "https://gowildtours.com/refer/USER123" }) => (
    <Html>
        <Head />
        <Preview>You've been invited to explore the wild! 🌍</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Text style={logoText}>GO WILD TOURS</Text>
                </Section>

                <Section style={hero}>
                    <Heading style={h1}>Better Together</Heading>
                    <Text style={text}>
                        Your friend thinks you need a vacation (and we agree).
                        Join them on a Go Wild Tours adventure and you'll both get $50 off your first trip!
                    </Text>
                </Section>

                <Section style={card}>
                    <div style={circle}>$50</div>
                    <Heading style={cardHeading}>Your Travel Credit</Heading>
                    <Text style={cardText}>
                        Use this credit towards any safari package of 3 days or more.
                    </Text>
                    <Button style={button} href={inviteLink}>
                        Claim Your $50 Credit
                    </Button>
                </Section>

                <Text style={subText}>
                    Already have an account? <Link href="#" style={link}>Log in</Link> to view your referrals.
                </Text>

                <Hr style={hr} />
                <Text style={footer}>
                    Go Wild Tours & Travels.<br />
                    <Link href="#" style={footerLink}>View Terms</Link>
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ReferralEmail;

const main = {
    backgroundColor: '#f4f1ea',
    fontFamily: '"Outfit", sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '40px auto',
    padding: '0',
    borderRadius: '12px',
    maxWidth: '600px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
};

const header = {
    textAlign: 'center' as const,
    padding: '32px',
};

const logoText = {
    fontSize: '20px',
    fontWeight: '900',
    color: '#2a4444',
    letterSpacing: '2px',
};

const hero = {
    padding: '0 32px 32px',
    textAlign: 'center' as const,
};

const h1 = {
    color: '#2a4444',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '16px',
};

const text = {
    color: '#4a5568',
    fontSize: '18px',
    lineHeight: '28px',
    maxWidth: '400px',
    margin: '0 auto',
};

const card = {
    backgroundColor: '#f8fafc',
    margin: '0 32px 32px',
    padding: '40px 24px',
    borderRadius: '16px',
    textAlign: 'center' as const,
    border: '1px dashed #cbd5e0',
};

const circle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#d69e2e',
    color: '#ffffff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
};

const cardHeading = {
    color: '#2d3748',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 8px',
};

const cardText = {
    color: '#718096',
    fontSize: '14px',
    margin: '0 0 24px',
};

const button = {
    backgroundColor: '#2a4444',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    padding: '12px 32px',
    display: 'inline-block',
};

const subText = {
    textAlign: 'center' as const,
    color: '#718096',
    fontSize: '14px',
    marginBottom: '32px',
};

const link = {
    color: '#2a4444',
    fontWeight: 'bold',
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
