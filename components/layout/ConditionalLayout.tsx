"use client";

import ComparisonBar from "@/components/features/ComparisonBar";

export default function ConditionalLayout({ 
    children,
    header,
    footer
}: { 
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}) {
    // Public routes: full layout
    return (
        <>
            {header}
            <main className="min-h-screen">{children}</main>
            <ComparisonBar />
            {footer}
        </>
    );
}
