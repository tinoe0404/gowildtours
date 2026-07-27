"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/constants";
import { destinations } from "@/data/destinations";
import CartIcon from "@/components/cart/CartIcon";
import CartSidebar from "@/components/cart/CartSidebar";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
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

    // Close menu on resize to avoid stuck overflow:hidden
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && menuOpen) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [menuOpen]);

    const isHomepage = pathname === "/";
    const isSolid = scrolled || menuOpen || !isHomepage;

    return (
        <nav className={`navbar ${isSolid ? "navbar--scrolled" : "navbar--transparent"}`}>
            {/* Logo */}
            <Link href="/" className="navbar__logo" aria-label="Go Wild Tours">
                <Image
                    src="/logo.png"
                    alt="Go Wild Tours Logo"
                    width={120}
                    height={80}
                    style={{
                        objectFit: "contain",
                        filter: isSolid ? "none" : "brightness(0) invert(1)",
                        transition: "filter 0.25s ease",
                    }}
                    priority
                />
            </Link>

            {/* Desktop Navigation */}
            <ul className="navbar__links">
                {navLinks.map((link) => (
                    <li
                        key={link.href}
                        className={link.href === "/destinations" ? "nav-item--has-dropdown" : ""}
                    >
                        <Link
                            href={link.href}
                            aria-current={pathname === link.href ? "page" : undefined}
                        >
                            {link.label}
                        </Link>

                        {/* Destinations dropdown */}
                        {link.href === "/destinations" && (
                            <div className="nav-dropdown">
                                {destinations.map((dest) => (
                                    <Link
                                        key={dest.slug}
                                        href={`/destinations/${dest.slug}`}
                                        className="nav-dropdown__item"
                                    >
                                        <span className="nav-dropdown__name">{dest.name}</span>
                                        <span className="nav-dropdown__tagline">{dest.tagline}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {/* Desktop CTAs & Mobile Hamburger */}
            <div className="navbar__actions">
                {/* Desktop only */}
                <div className="hidden md:flex items-center gap-2">
                    <CartIcon onClick={() => setCartOpen(true)} />
                    <Link href="/contact" className="btn btn--primary ml-1">
                        Book a Safari
                    </Link>
                </div>
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
                {/* Close Button */}
                <button
                    className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <ul className="mobile-menu__links">
                    {navLinks.map((link, index) => (
                        <li key={link.href} style={{ transitionDelay: menuOpen ? `${index * 60 + 100}ms` : "0ms" }}>
                            <Link href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
                        </li>
                    ))}
                    <li style={{ transitionDelay: menuOpen ? `${navLinks.length * 60 + 100}ms` : "0ms" }}>
                        <button 
                            className="text-white hover:text-accent transition-colors font-display text-2xl flex items-center justify-center gap-2 mx-auto cursor-pointer"
                            onClick={() => {
                                setMenuOpen(false);
                                setCartOpen(true);
                            }}
                        >
                            🛒 Open Cart
                        </button>
                    </li>
                    <li style={{ transitionDelay: menuOpen ? `${(navLinks.length + 1) * 60 + 100}ms` : "0ms" }}>
                        <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-lg font-bold text-white transition-all duration-300 hover:brightness-110 mx-auto"
                            style={{ backgroundColor: "#C8832A" }}
                            onClick={() => setMenuOpen(false)}
                        >
                            Book a Safari
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Cart Sidebar */}
            <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </nav>
    );
}
