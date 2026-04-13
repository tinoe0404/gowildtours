import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { constructMetadata } from "@/lib/seo";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { Suspense } from "react";
import "./globals.css";


export const metadata = constructMetadata({
  title: "Go Wild Tours | Premium African Safari Adventures",
  description: "Experience unforgettable safari adventures across Africa. Discover wildlife, culture, and breathtaking landscapes with Go Wild Tours — your premier safari tour operator.",
});

import { ComparisonProvider } from "@/context/ComparisonContext";
import { WishlistProvider } from "@/context/WishlistContext";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <WishlistProvider>
          <ComparisonProvider>
            <Suspense fallback={null}>
              {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
              )}
            </Suspense>
            <ConditionalLayout header={<Header />} footer={<Footer />}>
              {children}
            </ConditionalLayout>
          </ComparisonProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
