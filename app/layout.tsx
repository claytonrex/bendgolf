import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { PinGate } from "@/components/PinGate";
import { BottomNav } from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bend Golf Trip 2026",
  description: "Itinerary, scores, and the Cup.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f3d2e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        <PinGate>
          <main className="flex-1 pb-24 max-w-xl mx-auto w-full">{children}</main>
          <BottomNav />
        </PinGate>
      </body>
    </html>
  );
}
