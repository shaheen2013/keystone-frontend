"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { languageOptions } from "@/static/accessibility";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GoogleTranslate() {
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Definir función antes de cargar el script
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: true },
        "google_translate_element"
      );
    };

    // Crear y agregar el script dinámicamente
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.id = "google-translate-script";
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("google-translate-script");

      // ✅ Verificar que el script sigue existiendo y es hijo del body
      if (existingScript && existingScript.parentNode === document.body) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const handleTranslate = (lang: string) => {
    console.log(lang);
    setSelectedLang(lang);

    const selectElement = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;

    if (selectElement) {
      selectElement.value = lang;
      selectElement.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="translate-container">
      {/* Google Translate Element (Oculto) */}
      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* UI de Google Translate */}
      <div className="border-primary-2 border rounded-xl mb-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={`item-1`} className="last:border-b-0">
            <AccordionTrigger className="px-3 py-3">
              <div className="flex items-center justify-between gap-3">
                <Image
                  src="/icons/translate-box.svg"
                  width={20}
                  height={20}
                  alt="Translate"
                  className="w-10 h-10"
                />
                <span className="font-semibold text-gray-9 text-base">
                  Google Translate
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="border-t border-primary-2 px-4 py-4">
              <div>
                <Select
                  onValueChange={(value) => handleTranslate(value)}
                  value={selectedLang}
                  defaultValue="en"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {languageOptions.map((option, index) => (
                        <SelectItem value={option.slug} key={index}>
                          <div className="flex items-center gap-3">
                            <Image
                              src={option.icon}
                              width={20}
                              height={16}
                              alt={option.name}
                              className="w-5 h-4 rounded"
                            />
                            {option.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
