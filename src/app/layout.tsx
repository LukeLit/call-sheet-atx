import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/data/content";
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

export const metadata: Metadata = {
  title: `${site.wordmark} — Find the support that already exists`,
  description: site.description,
  applicationName: site.wordmark,
  authors: [{ name: site.founder }],
  keywords: [
    "Open Call",
    "Muse",
    "artist grants",
    "musicians",
    "Austin",
    "nonprofit",
  ],
  openGraph: {
    title: site.wordmark,
    description: site.description,
    url: "https://csa.ironreach.xyz",
    siteName: site.wordmark,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.wordmark,
    description: site.description,
  },
  metadataBase: new URL("https://csa.ironreach.xyz"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased night-wash">{children}</body>
    </html>
  );
}
