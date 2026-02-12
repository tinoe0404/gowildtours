import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Go Wild Tours | Premium African Safari Experiences",
    template: "%s | Go Wild Tours",
  },
  description:
    "Discover the wild heart of Africa with Go Wild Tours. Premium safari experiences, luxury bush camps, and unforgettable wildlife encounters across Africa's most breathtaking destinations.",
  keywords: [
    "safari tours",
    "African safari",
    "luxury safari",
    "Victoria Falls",
    "Zimbabwe safari",
    "Big Five",
    "bush camp",
    "wildlife tours",
    "Go Wild Tours",
  ],
  openGraph: {
    title: "Go Wild Tours | Premium African Safari Experiences",
    description:
      "Discover the wild heart of Africa with Go Wild Tours. Premium safari experiences and unforgettable wildlife encounters.",
    url: "https://gowildtours.com",
    siteName: "Go Wild Tours",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Go Wild Tours | Premium African Safari Experiences",
    description:
      "Discover the wild heart of Africa with Go Wild Tours.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${montserrat.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
