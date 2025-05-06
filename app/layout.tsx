import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ReduxProvider from "@/components/partials/ReduxProvider";
import { Toaster } from "@/components/shadcn/toaster";
import GoogleAnalytics from "@/components/partials/google-analytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keystone | A Place for Connection & Support",
  description:
    "Keystone is a space where everyone can connect, engage, and find support. Join a welcoming community designed to make life easier and more meaningful.",
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
        <GoogleAnalytics />
        <Toaster />
      </body>
    </html>
  );
}
