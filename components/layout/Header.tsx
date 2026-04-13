"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/constants";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const isSolid = scrolled || menuOpen;

    return (
        <nav className={`navbar ${isSolid ? "navbar--scrolled" : "navbar--transparent"}`}>
            {/* Logo */}
            <Link href="/" className="navbar__logo" aria-label="Go Wild Tours">
                <Image
                    src={isSolid ? siteConfig.logos.dark : siteConfig.logos.light}
                    alt="Go Wild Tours Logo"
                    width={160}
                    height={48}
                    style={{ objectFit: "contain" }}
                    priority
                />
            </Link>

            {/* Desktop Navigation */}
            <ul className="navbar__links">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            aria-current={pathname === link.href ? "page" : undefined}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Desktop CTAs & Mobile Hamburger */}
            <div className="navbar__actions">
                <Link href="/contact" className="btn btn--primary">
                    Book a Safari
                </Link>
                <button
                    className="hamburger-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {menuOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${menuOpen ? "mobile-menu-overlay--open" : ""}`}>
                <ul className="mobile-menu__links">
                    {navLinks.map((link, index) => (
                        <li key={link.href} style={{ transitionDelay: menuOpen ? `${index * 60 + 100}ms` : "0ms" }}>
                            <Link href={link.href}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
