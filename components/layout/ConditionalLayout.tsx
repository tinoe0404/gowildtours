"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ComparisonBar from "@/components/features/ComparisonBar";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    if (isAdminRoute) {
        // Admin routes: no header, no footer, no comparison bar
        return <>{children}</>;
    }

    // Public routes: full layout
    return (
        <>
            <Header />
            <main className="min-h-screen">{children}</main>
            <ComparisonBar />
            <Footer />
        </>
    );
}
