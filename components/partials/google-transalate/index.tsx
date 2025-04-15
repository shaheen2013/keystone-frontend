"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion";

import Image from "next/image";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (options: object, containerId: string) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslate() {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const translateRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let timeoutId: any;

    if (!(translateRef.current?.childNodes?.length ?? 0 > 0)) {
      function activateTranslate() {
        // Define googleTranslateElementInit globally
        window.googleTranslateElementInit = function () {
          if (translateRef.current) {
            new window.google!.translate.TranslateElement({}, "google_translate_element");
          }
        };

        // Add script dynamically if not added already
        if (!scriptRef.current) {
          const addScript = document.createElement("script");
          addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
          scriptRef.current = addScript;
          document.body.appendChild(addScript);
        }

        // Retry if translation is not initialized
        if (!(translateRef.current?.childNodes?.length ?? 0 > 0)) {
          timeoutId = setTimeout(() => {
            activateTranslate();
          }, 1000);
        }
      }

      activateTranslate();
    }

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="translate-container">
      {/* Google Translate UI */}
      <div className="border-primary-2 border rounded-xl mb-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="last:border-b-0">
            <AccordionTrigger className="px-3 py-3">
              <div className="flex items-center justify-between gap-3">
                <Image
                  src="/icons/translate-box.svg"
                  width={20}
                  height={20}
                  alt="Translate Icon"
                  className="w-10 h-10"
                />
                <span className="font-semibold text-gray-9 text-base">Google Translate</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="border-t border-primary-2 px-4 py-4"></AccordionContent>
          </AccordionItem>
          <div ref={translateRef} id="google_translate_element"></div>
        </Accordion>
      </div>
    </div>
  );
}
