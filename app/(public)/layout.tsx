import React from "react";
import { ReactNode } from "react";

import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
