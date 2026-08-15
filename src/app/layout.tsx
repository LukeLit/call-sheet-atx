import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/data/content";
import { MuseDrawer } from "@/components/MuseDrawer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const title = "Open Call — Find the support that already exists";
const ogImage = {
  url: "/images/brand/og.png",
  width: 1200,
  height: 630,
  alt: "Open Call — Muse is the assistant",
};

export const metadata: Metadata = {
  title,
  description: site.description,
  applicationName: site.wordmark,
  keywords: [
    "Open Call",
    "Muse",
    "artist grants",
    "musicians",
    "HAAM",
    "Texas Workforce Commission",
    "Austin",
    "nonprofit",
  ],
  metadataBase: new URL("https://csa.ironreach.xyz"),
  alternates: {
    canonical: "https://csa.ironreach.xyz",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description: site.description,
    url: "https://csa.ironreach.xyz",
    siteName: site.wordmark,
    locale: "en_US",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F7F1E6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased sun-wash">
        {children}
        <MuseDrawer />
      </body>
    </html>
  );
}
