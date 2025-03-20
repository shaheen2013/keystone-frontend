"use client";

import { useEffect, useRef } from "react";

export default function GoogleTranslate() {
  // const [selectedLang, setSelectedLang] = useState("en");

  // // Handle language selection from the custom dropdown
  // const handleTranslate = (lang: string) => {
  //   setSelectedLang(lang);
  // };
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const translateRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let timeoutId: any;

    if (!(translateRef.current?.childNodes.length > 0)) {
      function activateTranslate() {
        //add script
        if (!scriptRef.current) {
          const addScript = document.createElement("script");
          addScript.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
          scriptRef.current = addScript;
          document.body.appendChild(addScript);
        }

        //activate translate - only works once
        if (
          !(translateRef.current?.childNodes.length > 0) &&
          window.google?.translate
        ) {
          window.googleTranslateElementInit =
            new window.google.translate.TranslateElement(
              {},
              "google_translate_element"
            );
        }

        //reset if not finished
        if (!translateRef.current?.childNodes.length > 0) {
          timeoutId = setTimeout(() => {
            activateTranslate();
          }, 1000);
        }
      }

      activateTranslate();
    }

    return () => clearTimeout(timeoutId);
  }, [scriptRef]);

  return (
    <div className="translate-container">
      {/* Google Translate UI */}
      <div className="border-primary-2 border rounded-xl mb-4">
        {/* <Accordion type="single" collapsible className="w-full">
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
                <span className="font-semibold text-gray-9 text-base">
                  Google Translate
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="border-t border-primary-2 px-4 py-4">
              <div>
                <Select onValueChange={handleTranslate} value={selectedLang}>
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
                              alt={`${option.name} Flag`}
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
        </Accordion> */}
        <div ref={translateRef} id="google_translate_element"></div>
      </div>
    </div>
  );
}
