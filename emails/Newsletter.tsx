import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

export const NewsletterEmail = () => (
    <Html>
        <Head />
        <Preview>Explore the hidden gems of Hwange 🦁</Preview>
        <Body style={main}>
            <Container style={container}>
                {/* Header */}
                <Section style={header}>
                    <Text style={logoText}>GO WILD TOURS</Text>
                </Section>

                {/* Hero Image would go here, placeholder for now */}
                <Section style={heroSection}>
                    <div style={heroPlaceholder}>March Safari Highlights</div>
                </Section>

                <Heading style={h1}>The Roar of the Wild</Heading>
                <Text style={text}>
                    Greetings Adventurer,
                </Text>
                <Text style={text}>
                    As the rains subside, the bush comes alive in a vibrant display of green. This month, we're focusing on the majestic herds of Hwange National Park and the secret waterfalls of the Eastern Highlands.
                </Text>

                <Section style={article}>
                    <Heading as="h3" style={h3}>Featured Story: The Matobo Rhinos</Heading>
                    <Text style={text}>
                        Tracking rhinos on foot is an experience like no other. Our guide, Thomas, shares his encounter with a mother and calf in the granite hills of Matobo.
                    </Text>
                    <Link href="https://gowildtours.com/blog/matobo-rhinos" style={link}>Read the full story &rarr;</Link>
                </Section>

                <Section style={featuredTrips}>
                    <Heading as="h3" style={h3}>Upcoming Departures</Heading>
                    <div style={tripCard}>
                        <Text style={tripTitle}>Victoria Falls Explorer</Text>
                        <Text style={tripDate}>April 15th - 20th</Text>
                        <Button style={button} href="https://gowildtours.com/safaris/vic-falls-explorer">
                            View Itinerary
                        </Button>
                    </div>
                </Section>

                <Hr style={hr} />
                <Text style={footer}>
                    You are receiving this email because you signed up for our newsletter.<br />
                    <Link href="#" style={footerLink}>Unsubscribe</Link> | <Link href="#" style={footerLink}>View in Browser</Link>
                </Text>
            </Container>
        </Body>
    </Html>
);

export default NewsletterEmail;

const main = {
    backgroundColor: '#f4f1ea',
    fontFamily: '"Outfit", sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '40px auto',
    padding: '40px 32px',
    borderRadius: '12px',
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

const heroSection = {
    marginBottom: '32px',
};

const heroPlaceholder = {
    backgroundColor: '#2a4444',
    height: '200px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
};

const h1 = {
    color: '#2a4444',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '24px',
};

const h3 = {
    color: '#2a4444',
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '0',
};

const text = {
    color: '#4a5568',
    fontSize: '16px',
    lineHeight: '26px',
    marginBottom: '16px',
};

const article = {
    padding: '24px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    marginBottom: '24px',
};

const link = {
    color: '#d69e2e',
    textDecoration: 'none',
    fontWeight: 'bold',
};

const featuredTrips = {
    marginTop: '32px',
};

const tripCard = {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
};

const tripTitle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2a4444',
    margin: '0 0 8px',
};

const tripDate = {
    fontSize: '14px',
    color: '#718096',
    margin: '0 0 16px',
};

const button = {
    backgroundColor: '#2a4444',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    padding: '10px 20px',
};

const hr = {
    borderColor: '#edf2f7',
    margin: '32px 0',
};

const footer = {
    color: '#718096',
    fontSize: '12px',
    textAlign: 'center' as const,
};

const footerLink = {
    color: '#718096',
    textDecoration: 'underline',
};
