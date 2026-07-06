import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layouts/smooth-scroll-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rashmi Kumari | Cybersecurity & AI/ML Engineer",
  description: "Portfolio of Rashmi Kumari, a Cybersecurity & AI/ML Engineer graduating in 2026. Specialized in network security, AI-powered threat detection, and full-stack cloud workflows.",
  keywords: ["Cybersecurity Engineer", "AI/ML Engineer", "Software Engineer", "Next.js", "Python", "Salesforce", "Network Security"],
  authors: [{ name: "Rashmi Kumari" }],
  openGraph: {
    title: "Rashmi Kumari | Cybersecurity & AI/ML Engineer",
    description: "Cinematic portfolio demonstrating network anomaly classifiers, cryptography vault databases, and cloud security pipelines.",
    url: "https://rashmikumari13.github.io/portfolio/",
    siteName: "Rashmi Kumari Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="font-sans antialiased text-white bg-black selection:bg-primary/30 min-h-screen">
        <TooltipProvider>
          <SmoothScrollProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </SmoothScrollProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
