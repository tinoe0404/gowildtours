import Link from "next/link";
import Image from "next/image";
import { siteConfig, navLinks } from "@/lib/constants";
import Container from "@/components/ui/Container";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import prisma from "@/lib/db";

export default async function Footer() {
    // Fetch settings and packages for a truly dynamic footer
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = settings.reduce((acc: any, s) => {
        acc[s.key] = s.value;
        return acc;
    }, {});

    const footerPackages = await prisma.package.findMany({
        where: { isPublished: true },
        take: 5,
        select: { title: true, slug: true }
    });

    const contact = settingsMap.contact_info || {
        email: siteConfig.email,
        phone: siteConfig.phone,
        address: siteConfig.location
    };

    const socials = settingsMap.social_links || siteConfig.socials;

    return (
        <footer className="bg-dark-deep text-cream/80">
            <div className="pt-16 pb-10">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                        {/* Brand Column */}
                        <div className="lg:col-span-1">
                            <Link href="/" className="relative block h-12 w-40 mb-4 group transition-transform hover:scale-105 duration-300">
                                <Image
                                    src={siteConfig.logos.light}
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
                                {footerPackages.map((pkg) => (
                                    <li key={pkg.slug}>
                                        <Link
                                            href={`/packages/${pkg.slug}`}
                                            className="text-sm text-cream/60 hover:text-accent transition-colors duration-300"
                                        >
                                            {pkg.title}
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
                                        {contact.address}
                                    </span>
                                </li>
                                <li>
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="flex items-start gap-3 text-sm text-cream/60 hover:text-accent transition-colors"
                                    >
                                        <Phone className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                                        {contact.phone}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="flex items-start gap-3 text-sm text-cream/60 hover:text-accent transition-colors"
                                    >
                                        <Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                                        {contact.email}
                                    </a>
                                </li>
                            </ul>

                            {/* Social Icons */}
                            <div className="flex items-center gap-3 mt-6">
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
                    </div>
                </Container>
            </div>
        </footer>
    );
}
