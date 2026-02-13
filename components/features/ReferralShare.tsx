"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import SocialShare from "@/components/marketing/SocialShare";

interface ReferralShareProps {
    referralLink: string;
}

export default function ReferralShare({ referralLink }: ReferralShareProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-beige/50 text-center shadow-sm">
            <h2 className="text-3xl font-display font-bold text-dark-deep mb-2">Your Unique Link</h2>
            <p className="text-warm-gray mb-8">Copy and share this link to start earning.</p>

            <div className="flex flex-col md:flex-row items-center gap-4 bg-light p-2 rounded-xl border border-beige mb-8">
                <code className="flex-1 text-dark-deep font-mono text-sm break-all px-4 py-2 text-left">
                    {referralLink}
                </code>
                <Button
                    variant="outline"
                    className="w-full md:w-auto shrink-0 min-w-[120px]"
                    onClick={handleCopy}
                >
                    {copied ? "Copied!" : "Copy Link"}
                </Button>
            </div>

            <div className="flex flex-col items-center gap-4">
                <p className="text-sm font-bold text-dark-deep uppercase tracking-wider">Or share directly</p>
                <SocialShare
                    url={referralLink}
                    title="Get $50 off your first African Safari!"
                    className="justify-center"
                />
            </div>
        </div>
    );
}
