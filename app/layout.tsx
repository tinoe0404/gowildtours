import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://gowildtours.com"),
  title: {
    default: "Go Wild Tours | Premium African Safari Adventures",
    template: "%s | Go Wild Tours",
  },
  description:
    "Experience unforgettable safari adventures across Africa. Discover wildlife, culture, and breathtaking landscapes with Go Wild Tours — your premier safari tour operator.",
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo/go-wild-tours-icon.png", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Go Wild Tours | Premium African Safari Adventures",
    description:
      "Experience unforgettable safari adventures across Africa with Go Wild Tours.",
    url: "https://gowildtours.com",
    siteName: "Go Wild Tours",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/logo/go-wild-tours-full.svg",
        width: 1200,
        height: 630,
        alt: "Go Wild Tours Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Go Wild Tours | Premium African Safari Adventures",
    description:
      "Experience unforgettable safari adventures across Africa with Go Wild Tours.",
    images: ["/images/logo/go-wild-tours-full.svg"],
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
        className={`${playfairDisplay.variable} ${inter.variable} ${montserrat.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
