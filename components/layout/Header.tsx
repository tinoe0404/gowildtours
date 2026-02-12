"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import Navigation from "@/components/layout/Navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        // Transparent → solid after 50px
        setIsScrolled(currentScrollY > 50);

        // Show on scroll up, hide on scroll down (only after 100px)
        if (currentScrollY > 100) {
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
        } else {
            setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
                    isScrolled
                        ? "bg-dark-deep/95 backdrop-blur-md shadow-lg py-3"
                        : "bg-transparent py-5",
                    isVisible ? "translate-y-0" : "-translate-y-full"
                )}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 group relative h-12 md:h-16 w-32 md:w-48 transition-transform hover:scale-105 duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <Image
                            src={isScrolled ? "/images/logo/go-wild-tours-full-white.svg" : "/images/logo/go-wild-tours-full.svg"}
                            alt={siteConfig.name}
                            fill
                            className="object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:block">
                        <Navigation />
                    </nav>

                    {/* Desktop CTAs */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Button variant="outline" size="sm">
                            Enquire Now
                        </Button>
                        <Button variant="primary" size="sm">
                            Book Adventure
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden relative z-50 p-2 text-cream hover:text-accent transition-colors cursor-pointer"
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 lg:hidden transition-all duration-500",
                    isMobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-dark-deep/98 backdrop-blur-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Menu Content */}
                <div
                    className={cn(
                        "relative flex flex-col items-center justify-center h-full gap-6 transition-transform duration-500",
                        isMobileMenuOpen ? "translate-y-0" : "-translate-y-8"
                    )}
                >
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-display text-2xl text-cream hover:text-accent transition-all duration-300"
                            style={{
                                transitionDelay: isMobileMenuOpen
                                    ? `${index * 60}ms`
                                    : "0ms",
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="flex flex-col gap-3 mt-6 w-60">
                        <Button variant="outline" size="md" className="w-full">
                            Enquire Now
                        </Button>
                        <Button variant="primary" size="md" className="w-full">
                            Book Adventure
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
