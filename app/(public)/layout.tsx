import React from "react";
import { ReactNode } from "react";

import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Accessibility from "@/components/partials/Accessibility";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div id="root" className="">
        <Header />
        {children}
        <Footer />
      </div>

      <Accessibility />
    </>
  );
}
