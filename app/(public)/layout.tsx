import React, { Suspense } from "react";
import { ReactNode } from "react";

import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Accessibility from "@/components/partials/Accessibility";
import { GoogleTagManager } from "@next/third-parties/google";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  const isGAEnabled =
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ENABLED === "true";
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  const renderGoogleTagManager = () => {
    if (!isGAEnabled || !GA_ID) return null;
    return <GoogleTagManager gtmId={GA_ID} />;
  };

  return (
    <>
      <div id="root">
        <Suspense fallback={null}>{renderGoogleTagManager()}</Suspense>
        <Header />
        {children}
        <Footer />
      </div>
      <Accessibility />
    </>
  );
}
