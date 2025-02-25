import React from "react";
import { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
