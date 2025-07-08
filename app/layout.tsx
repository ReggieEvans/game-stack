import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const customHeader = localFont({
  src: "./fonts/Brunson.ttf",
  variable: "--font-header",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next.js 15 Starter Template",
  description:
    "Next.js 15 starter with auth, roles, MongoDB, dark mode, and ShadCN UI. Perfect for SaaS apps and dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${customHeader.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
