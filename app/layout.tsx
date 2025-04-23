import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ReduxProvider from "@/components/partials/ReduxProvider";
import { Toaster } from "@/components/shadcn/toaster";
import GoogleTranslateInit from "@/components/GoogleTranslateInit";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Keystone | A Place for Connection & Support",
  description: "Keystone is a space where everyone can connect...",
  icons: { icon: "/icons/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <GoogleTranslateInit />
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
