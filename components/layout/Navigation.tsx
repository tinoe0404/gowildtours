"use client";
// Navigation component for the header

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/cn";

export default function Navigation() {
    const pathname = usePathname();

    return (
        <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={cn(
                                "relative px-3 py-2 text-sm font-accent font-medium transition-colors duration-300",
                                "hover:text-accent",
                                isActive ? "text-accent" : "text-cream/90",
                                /* Underline animation */
                                "after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:bg-accent",
                                "after:transition-all after:duration-300 after:ease-out",
                                isActive
                                    ? "after:w-6 after:-translate-x-1/2"
                                    : "after:w-0 after:-translate-x-1/2 hover:after:w-6"
                            )}
                        >
                            {link.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
