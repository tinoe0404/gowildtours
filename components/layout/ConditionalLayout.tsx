"use client";

import { usePathname } from "next/navigation";
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
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    if (isAdminRoute) {
        // Admin routes: no header, no footer, no comparison bar
        return <>{children}</>;
    }

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
