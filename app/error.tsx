"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-light px-4">
            <div className="text-center max-w-md">
                <span className="text-5xl mb-4 block">🌿</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-dark-deep mb-3">
                    Something went wrong
                </h2>
                <p className="text-warm-gray mb-6 leading-relaxed">
                    We encountered an unexpected error. Please try again or contact our
                    team for assistance.
                </p>
                <Button onClick={() => reset()} variant="primary">
                    Try Again
                </Button>
            </div>
        </div>
    );
}
