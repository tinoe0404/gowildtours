"use client";

import { useEffect } from "react";

export default function ClientPrint() {
    useEffect(() => {
        // Small delay to ensure styles and images are loaded
        const timeout = setTimeout(() => {
            window.print();
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return null;
}
