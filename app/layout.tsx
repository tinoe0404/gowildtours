import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { constructMetadata } from "@/lib/seo";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { Suspense } from "react";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = constructMetadata({
  title: "Go Wild Tours | Premium African Safari Adventures",
  description: "Experience unforgettable safari adventures across Africa. Discover wildlife, culture, and breathtaking landscapes with Go Wild Tours — your premier safari tour operator.",
});

import { ComparisonProvider } from "@/context/ComparisonContext";
import ComparisonBar from "@/components/features/ComparisonBar";
import { WishlistProvider } from "@/context/WishlistContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${montserrat.variable} font-sans antialiased bg-background text-foreground`}
      >
        <WishlistProvider>
          <ComparisonProvider>
            <Suspense fallback={null}>
              {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
              )}
            </Suspense>
            <Header />
            <main className="min-h-screen">{children}</main>
            <ComparisonBar />
            <Footer />
          </ComparisonProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
