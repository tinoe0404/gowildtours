import Link from "next/link";
import Image from "next/image";
import { siteConfig, navLinks } from "@/lib/constants";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { destinations } from "@/data/destinations";
import { packages as staticPackages } from "@/lib/packages-data";

export default async function Footer() {
    const footerPackages = staticPackages
        .filter((pkg) => pkg.featured)
        .slice(0, 5)
        .map((pkg) => ({ title: pkg.title, slug: pkg.slug }));

    const contact = {
        email: siteConfig.email,
        phone: siteConfig.phone,
        address: siteConfig.location
    };

    const socials = siteConfig.socials;

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="relative block h-14 w-44 mb-4" style={{display: 'inline-block', marginBottom: 'var(--space-4)'}}>
                            <Image
                                src="/logo.png"
                                alt={siteConfig.name}
                                fill
                                style={{objectFit: 'contain', objectPosition: 'left', filter: 'brightness(0) invert(1)'}}
                            />
                        </Link>
                        <p style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 'var(--space-6)'}}>
                            Premium safari experiences across Africa&apos;s most breathtaking
                            destinations. Discover the wild with expert guides and luxury
                            accommodations.
                        </p>
                        <div style={{display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '12px', color: 'rgba(255,255,255,0.5)'}}>
                            <span>🏛️</span>
                            <span>Registered Tourism Operator</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="footer__title">Quick Links</h3>
                        <div className="footer__links">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Our Safaris */}
                    <div>
                        <h3 className="footer__title">Our Safaris</h3>
                        <div className="footer__links">
                            {footerPackages.map((pkg) => (
                                <Link key={pkg.slug} href={`/safaris/${pkg.slug}`}>
                                    {pkg.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h3 className="footer__title">Destinations</h3>
                        <div className="footer__links">
                            {destinations.map((dest) => (
                                <Link key={dest.slug} href={`/destinations/${dest.slug}`}>
                                    {dest.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="footer__title">Contact Us</h3>
                        <div className="footer__links" style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'}}>
                            <div style={{display: 'flex', gap: '8px', alignItems: 'flex-start'}}>
                                <MapPin size={16} color="var(--color-savanna)" style={{marginTop: '4px'}} />
                                <span style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)'}}>{contact.address}</span>
                            </div>
                            <a href={`tel:${contact.phone}`} style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                <Phone size={16} color="var(--color-savanna)" />
                                {contact.phone}
                            </a>
                            <a href={`mailto:${contact.email}`} style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                <Mail size={16} color="var(--color-savanna)" />
                                {contact.email}
                            </a>
                        </div>

                        {/* Social Icons */}
                        <div style={{display: 'flex', gap: '12px', marginTop: 'var(--space-6)'}}>
                            {[
                                { icon: Instagram, href: socials.instagram, label: "Instagram" },
                                { icon: Facebook, href: socials.facebook, label: "Facebook" },
                                { icon: Twitter, href: socials.twitter, label: "Twitter" },
                                { icon: Youtube, href: socials.youtube, label: "YouTube" },
                            ].map((social) => social.href && (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="footer__social-link"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer__bottom">
                    <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
