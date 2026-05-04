import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biral Adarsha High School | Alumni Eid Reunion & Farewell 2026",
  description:
    "Join the grand Alumni Eid Reunion & Farewell Ceremony 2026 at Biral Adarsha High School. Celebrate Eid-ul-Azha with old friends, honor our beloved retiring teachers, and relive cherished memories.",
  keywords: [
    "Biral Adarsha High School",
    "BAHS",
    "Alumni Reunion 2026",
    "Eid Reunion",
    "Farewell Ceremony",
    "Mohi Uddin Sir",
    "Dinajpur",
    "Bangladesh",
    "বিরল আদর্শ উচ্চ বিদ্যালয়",
    "প্রাক্তন শিক্ষার্থী",
    "ঈদ পুনর্মিলনী",
  ],
  authors: [{ name: "BAHS প্রাক্তন শিক্ষার্থী" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Alumni Eid Reunion & Farewell 2026 — Biral Adarsha High School",
    description:
      "A grand Eid-ul-Azha reunion and farewell ceremony honoring our beloved teachers at Biral Adarsha High School. All alumni are invited.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#082a21",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
