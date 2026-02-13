"use client";

import { Facebook, Twitter, Linkedin, Mail, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface SocialShareProps {
    url: string;
    title: string;
    className?: string;
}

export default function SocialShare({ url, title, className }: SocialShareProps) {
    const [copied, setCopied] = useState(false);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "hover:text-blue-600",
        },
        {
            name: "Twitter",
            icon: Twitter, // Start using X icon if available, but Twitter is standard name in lucide
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: "hover:text-sky-500",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
            color: "hover:text-blue-700",
        },
        {
            name: "WhatsApp",
            icon: (props: any) => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    {...props}
                >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0 1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
            ), // Custom SVG since Phone usually isn't WhatsApp specific enough or available
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            color: "hover:text-green-500",
        },
        {
            name: "Email",
            icon: Mail,
            href: `mailto:?subject=${encodedTitle}&body=Check out this safari: ${encodedUrl}`,
            color: "hover:text-gray-600",
        },
    ];

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn("flex flex-wrap items-center gap-4", className)}>
            <span className="text-sm font-medium text-warm-gray">Share:</span>
            <div className="flex items-center gap-2">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "p-2 rounded-full bg-white border border-beige hover:border-accent transition-colors duration-200 text-dark-deep",
                            link.color
                        )}
                        title={`Share on ${link.name}`}
                    >
                        <link.icon className="w-4 h-4" />
                    </a>
                ))}
                <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-full bg-white border border-beige hover:border-accent transition-colors duration-200 text-dark-deep relative group"
                    title="Copy Link"
                >
                    <LinkIcon className="w-4 h-4" />
                    {copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark-deep text-white text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap">
                            Copied!
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
