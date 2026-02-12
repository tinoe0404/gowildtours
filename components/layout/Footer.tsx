import Link from "next/link";
import Image from "next/image";
import { siteConfig, navLinks } from "@/lib/constants";
import Container from "@/components/ui/Container";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const packages = [
    "Big Five Experience",
    "Victoria Falls & Safari",
    "Luxury Bush Camp",
    "Walking Safaris",
    "Photographic Tours",
];

export default function Footer() {
    return (
        <footer className="bg-dark-deep text-cream/80">
            {/* Main Footer */}
            <div className="pt-16 pb-10">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                        {/* Brand Column */}
                        <div className="lg:col-span-1">
                            <Link href="/" className="relative block h-12 w-40 mb-4 group transition-transform hover:scale-105 duration-300">
                                <Image
                                    src="/images/logo/go-wild-tours-full-white.svg"
                                    alt={siteConfig.name}
                                    fill
                                    className="object-contain object-left opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                            </Link>
                            <p className="text-sm leading-relaxed text-cream/60 mb-6">
                                Premium safari experiences across Africa&apos;s most breathtaking
                                destinations. Discover the wild with expert guides and luxury
                                accommodations.
                            </p>
                            {/* Tourism badge placeholder */}
                            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-cream/10 text-xs text-cream/40">
                                <span>🏛️</span>
                                <span>Registered Tourism Operator</span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-accent text-sm font-semibold uppercase tracking-wider text-accent mb-5">
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-cream/60 hover:text-accent transition-colors duration-300"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Our Packages */}
                        <div>
                            <h3 className="font-accent text-sm font-semibold uppercase tracking-wider text-accent mb-5">
                                Our Packages
                            </h3>
                            <ul className="space-y-3">
                                {packages.map((pkg) => (
                                    <li key={pkg}>
                                        <Link
                                            href="/packages"
                                            className="text-sm text-cream/60 hover:text-accent transition-colors duration-300"
                                        >
                                            {pkg}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="font-accent text-sm font-semibold uppercase tracking-wider text-accent mb-5">
                                Contact Us
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                                    <span className="text-sm text-cream/60">
                                        {siteConfig.location}
                                    </span>
                                </li>
                                <li>
                                    <a
                                        href={`tel:${siteConfig.phone}`}
                                        className="flex items-start gap-3 text-sm text-cream/60 hover:text-accent transition-colors"
                                    >
                                        <Phone className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                                        {siteConfig.phone}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={`mailto:${siteConfig.email}`}
                                        className="flex items-start gap-3 text-sm text-cream/60 hover:text-accent transition-colors"
                                    >
                                        <Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                                        {siteConfig.email}
                                    </a>
                                </li>
                            </ul>

                            {/* Social Icons */}
                            <div className="flex items-center gap-3 mt-6">
                                {[
                                    { icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
                                    { icon: Facebook, href: siteConfig.socials.facebook, label: "Facebook" },
                                    { icon: Twitter, href: siteConfig.socials.twitter, label: "Twitter" },
                                    { icon: Youtube, href: siteConfig.socials.youtube, label: "YouTube" },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="p-2 rounded-full border border-cream/10 text-cream/50 hover:text-accent hover:border-accent/30 transition-all duration-300"
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-cream/10">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-5 text-xs text-cream/40">
                        <p>
                            © {new Date().getFullYear()} {siteConfig.name}. All rights
                            reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="/privacy" className="hover:text-accent transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-accent transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="hover:text-accent transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
}
