"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

import { getAccessabilitySettings, saveAccessibilitySetting } from "@/lib/utils";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion";
import { Button } from "@/components/shadcn/button";
import { Slider } from "@/components/shadcn/slider";
import { Switch } from "@/components/shadcn/switch";

import { Sheet, SheetContent, SheetTrigger } from "@/components/shadcn/sheet";
import TTS from "../TTS/TTS";

export default function Accessibility() {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSelectedLang(value);

    // Simulate changing the language using Google's internal dropdown
    const selectEl = document.querySelector<HTMLSelectElement>(".goog-te-combo");

    if (selectEl) {
      selectEl.value = value;
      selectEl.dispatchEvent(new Event("change"));
    }
  };

  const resetTranslate = () => {
    const selectEl = document.querySelector<HTMLSelectElement>(".goog-te-combo");

    if (selectEl) {
      selectEl.value = "en"; // Default language
      selectEl.dispatchEvent(new Event("change"));
      setSelectedLang("en");
    }
  };

  useEffect(() => {
    // Wait a little for the Google Translate to load
    const interval = setInterval(() => {
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo) {
        setSelectedLang(document.documentElement.lang);

        clearInterval(interval);
      }
    }, 1000);

    // Stop trying after 5 seconds
    setTimeout(() => clearInterval(interval), 5000);
  }, []);

  type Options = {
    colorBlind: boolean;
    lowVision: boolean;
    saturationStatus: boolean;
    saturation: number[];
    boldText: boolean;
    bigCursor: boolean;
    increaseContrast: boolean;
    textSize: number[];
    magnification: boolean;
    textToSpeech: boolean;
    googleTranslate: string;
  };

  const [options, setOptions] = useState<Options>({
    colorBlind: false,
    lowVision: false,
    saturationStatus: false,
    saturation: [1],
    boldText: false,
    bigCursor: false,
    increaseContrast: false,
    textSize: [4],
    magnification: false,
    textToSpeech: localStorage.getItem("textToSpeech") === "true",
    googleTranslate: "",
  });

  const accessibilityClasses = {
    colorBlind: "grayscale",
    lowVision: "contrast-75",
    saturation: {
      1: "saturate-50",
      2: "saturate-150",
      3: "saturate-100",
    },
    boldText: "font-bold",
    bigCursor: "cursor-big",
    increaseContrast: "saturate-200",
    textSize: {
      1: "accessibility-1xl",
      2: "accessibility-2xl",
      3: "accessibility-3xl",
      5: "accessibility-5xl",
      6: "accessibility-6xl",
      7: "accessibility-7xl",
      8: "accessibility-8xl",
    },
    magnification: "magnification",
  };

  useEffect(() => {
    const settings: Options = getAccessabilitySettings();

    const body = document.body as HTMLElement;
    const root = document.getElementById("root") as HTMLElement;

    if (settings.colorBlind) {
      setOptions((prev) => ({ ...prev, colorBlind: settings.colorBlind }));
      root?.classList.add(accessibilityClasses.colorBlind);
    }

    if (settings.lowVision) {
      setOptions((prev) => ({ ...prev, lowVision: settings.lowVision }));
      root?.classList.add(accessibilityClasses.lowVision);
    }

    if (settings.saturationStatus) {
      setOptions((prev) => ({
        ...prev,
        saturationStatus: settings.saturationStatus,
      }));
    }

    if (settings.saturation) {
      setOptions((prev) => ({ ...prev, saturation: settings.saturation }));
      const root = document.getElementById("root") as HTMLElement;

      if (settings.saturation[0] == 1 && settings.saturationStatus) {
        // low saturation
        root.classList.add(accessibilityClasses.saturation[1]);
      }

      if (settings.saturation[0] == 2 && settings.saturationStatus) {
        // high saturation
        root.classList.add(accessibilityClasses.saturation[2]);
      }

      if (settings.saturation[0] == 3 && settings.saturationStatus) {
        // desaturate
        root.classList.add(accessibilityClasses.saturation[3]);
      }
    }

    if (settings.boldText) {
      setOptions((prev) => ({ ...prev, boldText: settings.boldText }));
      accessibilityClasses.boldText.split(" ").forEach((cls) => {
        root?.classList.add(cls);
      });
    }

    if (settings.bigCursor) {
      setOptions((prev) => ({ ...prev, bigCursor: settings.bigCursor }));
      body?.classList.add(accessibilityClasses.bigCursor);
    }

    if (settings.increaseContrast) {
      setOptions((prev) => ({
        ...prev,
        increaseContrast: settings.increaseContrast,
      }));
      root?.classList.add(accessibilityClasses.increaseContrast);
    }

    if (settings.textSize) {
      setOptions((prev) => ({ ...prev, textSize: settings.textSize }));

      if (settings.textSize[0] === 1) {
        root.classList.add(accessibilityClasses.textSize[1]);
      }

      if (settings.textSize[0] === 2) {
        root.classList.add(accessibilityClasses.textSize[2]);
      }

      if (settings.textSize[0] === 3) {
        root.classList.add(accessibilityClasses.textSize[3]);
      }

      if (settings.textSize[0] === 5) {
        root.classList.add(accessibilityClasses.textSize[5]);
      }

      if (settings.textSize[0] === 6) {
        root.classList.add(accessibilityClasses.textSize[6]);
      }

      if (settings.textSize[0] === 7) {
        root.classList.add(accessibilityClasses.textSize[7]);
      }

      if (settings.textSize[0] === 8) {
        root.classList.add(accessibilityClasses.textSize[8]);
      }
    }

    if (settings.magnification) {
      setOptions((prev) => ({
        ...prev,
        magnification: settings.magnification,
      }));
      root?.classList.add(accessibilityClasses.magnification);
    }
  }, []);

  const handleAccessibilityRender = (event: any) => {
    setOpen(event);
    if (!event) {
      return;
    }
  };

  // handle accessibility options
  const handleColorBlind = (event: any) => {
    setOptions({ ...options, colorBlind: event });

    const root = document.getElementById("root") as HTMLElement;
    root.classList.toggle(accessibilityClasses.colorBlind);

    saveAccessibilitySetting("colorBlind", event);
  };

  const handleLowVision = (event: any) => {
    setOptions({ ...options, lowVision: event });

    document.getElementById("root")?.classList.toggle(accessibilityClasses.lowVision);
    saveAccessibilifySetting("lowVision", event);
  };

  const handleSaturationStatus = (event: any) => {
    saveAccessibilitySetting("saturationStatus", event);
    setOptions({
      ...options,
      saturationStatus: event,
      ...(!event ? { saturation: [1] } : {}),
    });

    const root = document.getElementById("root") as HTMLElement;

    if (event) {
      root.classList.remove(accessibilityClasses.saturation[1]);
      root.classList.remove(accessibilityClasses.saturation[2]);
      root.classList.remove(accessibilityClasses.saturation[3]);

      root.classList.add(accessibilityClasses.saturation[1]);
    } else {
      saveAccessibilitySetting("saturation", [1]);

      root.classList.remove(accessibilityClasses.saturation[1]);
      root.classList.remove(accessibilityClasses.saturation[2]);
      root.classList.remove(accessibilityClasses.saturation[3]);
    }
  };

  const handleSaturation = (value: number[]) => {
    saveAccessibilitySetting("saturation", value);
    setOptions({ ...options, saturation: value });

    const root = document.getElementById("root") as HTMLElement;

    root.classList.remove(accessibilityClasses.saturation[1]);
    root.classList.remove(accessibilityClasses.saturation[2]);
    root.classList.remove(accessibilityClasses.saturation[3]);

    if (value[0] == 1) {
      // low saturation
      root.classList.add(accessibilityClasses.saturation[1]);
    }

    if (value[0] == 2) {
      // high saturation
      root.classList.add(accessibilityClasses.saturation[2]);
    }

    if (value[0] == 3) {
      // desaturate
      root.classList.add(accessibilityClasses.saturation[3]);
    }
  };

  const handleBoldText = (event: any) => {
    setOptions({ ...options, boldText: event });
    saveAccessibilitySetting("boldText", event);

    const root = document.getElementById("root") as HTMLElement;
    accessibilityClasses.boldText.split(" ").forEach((cls) => {
      root.classList.toggle(cls);
    });
  };

  const handleBigCursor = (event: any) => {
    setOptions({ ...options, bigCursor: event });
    saveAccessibilitySetting("bigCursor", event);

    const body = document.body as HTMLElement;
    body.classList.toggle(accessibilityClasses.bigCursor);
  };

  const handleIncreaseContrast = (event: any) => {
    setOptions({ ...options, increaseContrast: event });
    saveAccessibilitySetting("increaseContrast", event);

    const root = document.getElementById("root") as HTMLElement;
    root.classList.toggle(accessibilityClasses.increaseContrast);
  };

  const handleTextSize = (value: number[]) => {
    setOptions({ ...options, textSize: value });
    saveAccessibilitySetting("textSize", value);

    const root = document.getElementById("root") as HTMLElement;

    // remove all text size classes
    Object.keys(accessibilityClasses.textSize).forEach((key) => {
      root.classList.remove(
        accessibilityClasses.textSize[key as unknown as keyof typeof accessibilityClasses.textSize]
      );
    });

    if (value[0] === 1) {
      root.classList.add(accessibilityClasses.textSize[1]);
    }
    if (value[0] === 2) {
      root.classList.add(accessibilityClasses.textSize[2]);
    }
    if (value[0] === 3) {
      root.classList.add(accessibilityClasses.textSize[3]);
    }

    // ! skip 4 because it's default

    if (value[0] === 5) {
      root.classList.add(accessibilityClasses.textSize[5]);
    }
    if (value[0] === 6) {
      root.classList.add(accessibilityClasses.textSize[6]);
    }
    if (value[0] === 7) {
      root.classList.add(accessibilityClasses.textSize[7]);
    }
    if (value[0] === 8) {
      root.classList.add(accessibilityClasses.textSize[8]);
    }
  };

  const handleMagnification = (event: any) => {
    setOptions({ ...options, magnification: event });
    saveAccessibilitySetting("magnification", event);

    const root = document.getElementById("root") as HTMLElement;
    root.classList.toggle(accessibilityClasses.magnification);
  };

  const handleTextToSpeech = (event: any) => {
    setOptions({ ...options, textToSpeech: event });
    saveAccessibilitySetting("textToSpeech", event);
    localStorage.setItem("textToSpeech", event);
  };

  const handleReset = () => {
    localStorage.removeItem("accessibilitySettings");

    setOptions({
      colorBlind: false,
      lowVision: false,
      saturationStatus: false,
      saturation: [1],
      boldText: false,
      bigCursor: false,
      increaseContrast: false,
      textSize: [4],
      magnification: false,
      googleTranslate: "",
    } as Options);

    const body = document.body as HTMLElement;

    const root = document.getElementById("root") as HTMLElement;
    body.classList.remove(accessibilityClasses.bigCursor);

    Object.keys(accessibilityClasses).forEach((key) => {
      const accessibilityClass = accessibilityClasses[key as keyof typeof accessibilityClasses];

      if (typeof accessibilityClass === "string") {
        const split = accessibilityClass.split(" ");

        split.forEach((cls) => {
          root.classList.remove(cls);
        });
        return;
      }

      if (typeof accessibilityClass === "object") {
        Object.keys(accessibilityClass).forEach((key) => {
          root.classList.remove(accessibilityClass[key as unknown as keyof typeof accessibilityClass]);
        });
      }
    });

    resetTranslate();
  };

  return (
    <div className="fixed right-5 top-[450px] z-20 lg:flex hidden">
      <Sheet open={open} onOpenChange={handleAccessibilityRender}>
        <SheetTrigger asChild>
          <div className={`cursor-pointer`}>
            <Image src="/icons/accessibility.svg" width={50} height={50} alt="Accessibility" />
            {Object.keys(options).some((key) => options[key as keyof Options] === true) && (
              <div className="absolute top-0 right-[-3px] w-3 h-3 bg-green-500 rounded-full">
                <div className="animate-ping w-3 h-3 bg-green-500 rounded-full" />
              </div>
            )}
          </div>
        </SheetTrigger>

        <SheetContent
          className="flex flex-col overflow-y-scroll min-w-[460px] p-8"
          aria-describedby={undefined}
          id="accessibility-menu"
        >
          {/* 
            ignore DialogTitle component
            Intentional DialogTitle component because to remove shadcn error 
          */}
          <DialogTitle></DialogTitle>

          {/* content */}
          <div className="flex-1">
            <h2 className="font-semibold text-2xl mb-2 text-gray-9">Accessibility Menu</h2>

            <p className="text-gray-8 text-base mb-6">
              Customize your browsing with accessibility options designed to enhance readability, visibility.
            </p>

            <div>
              {/* color accordion*/}
              <div className="border-primary-2 border rounded-xl mb-4">
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                  <AccordionItem value={`item-1`} className="last:border-b-0">
                    <AccordionTrigger className="px-3 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <Image
                          src="/icons/color.svg"
                          width={20}
                          height={20}
                          alt="Accessibility"
                          className="w-10 h-10"
                        />
                        <span className="font-semibold text-gray-9 text-base">Color</span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="border-t border-primary-2 px-4 py-4">
                      {/* color blind */}
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">Color Blind</span>
                          <Switch onCheckedChange={handleColorBlind} checked={options.colorBlind} />
                        </label>
                      </div>

                      {/* low vision */}
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">Low Vision</span>
                          <Switch id="airplane-mode" checked={options.lowVision} onCheckedChange={handleLowVision} />
                        </label>
                      </div>

                      {/* saturation */}
                      <div className="mb-5">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">Saturation</span>
                          <Switch
                            id="airplane-mode"
                            checked={options.saturationStatus}
                            onCheckedChange={handleSaturationStatus}
                          />
                        </label>
                      </div>

                      <div className="relative">
                        <Slider
                          min={1}
                          max={3}
                          step={1}
                          onValueChange={handleSaturation}
                          value={options.saturation}
                          disabled={!options.saturationStatus}
                        />

                        {/* slider steps */}
                        <div>
                          <div className="absolute right-[-2px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                          <div className="absolute left-[1px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                        </div>
                      </div>

                      <div className="flex justify-between text-gray-7 text-sm mt-3">
                        <span className="flex-1">Low</span>
                        <span className="flex-1 text-center">High</span>
                        <span className="flex-1 text-right">Desaturate</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* display & text size accordion */}
              <div className="border-primary-2 border rounded-xl mb-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-1`} className="last:border-b-0">
                    <AccordionTrigger className="px-3 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <Image
                          src="/icons/color.svg"
                          width={20}
                          height={20}
                          alt="Accessibility"
                          className="w-10 h-10"
                        />
                        <span className="font-semibold text-gray-9 text-base">Display & Text Size</span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="border-t border-primary-2 px-4 py-4">
                      {/* bold text */}
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">Bold Text</span>
                          <Switch checked={options.boldText} onCheckedChange={handleBoldText} />
                        </label>
                      </div>

                      {/* big cursor */}
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">Big Cursor</span>
                          <Switch onCheckedChange={handleBigCursor} checked={options.bigCursor} />
                        </label>
                      </div>

                      {/* increase contrast */}
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">Increase Contrast</span>
                          <Switch onCheckedChange={handleIncreaseContrast} checked={options.increaseContrast} />
                        </label>
                      </div>

                      {/* text size */}
                      <div className="flex items-center">
                        <div className="text-gray-9 font-medium text-base basis-4/12">Text Size</div>

                        <div className="relative w-full flex basis-8/12 justify-center items-center gap-2">
                          <div className="text-xs">A</div>
                          <div className="w-full flex flex-col justify-center relative">
                            <Slider min={1} max={7} step={1} onValueChange={handleTextSize} value={options.textSize} />

                            {/* slider steps */}
                            <div className="flex justify-between text-gray-7 text-sm -mt-2">
                              <div className="h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                              <div className=" h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                              <div className=" h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                              <div className=" h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                              <div className=" h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                              <div className=" h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                              <div className=" h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                            </div>
                          </div>
                          <div className="text-lg">A</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* magnification */}
              <div className="border-primary-2 border rounded-xl mb-4">
                <div className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/icons/search-box.svg"
                      width={20}
                      height={20}
                      alt="Accessibility"
                      className="w-10 h-10"
                    />

                    <span className="font-semibold text-gray-9 text-base">Magnification</span>
                  </div>

                  <div className="mr-[2px]">
                    <Switch checked={options.magnification} onCheckedChange={handleMagnification} />
                  </div>
                </div>
              </div>

              {/* text to speech */}
              <div className="border-primary-2 border rounded-xl mb-4">
                <div className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/icons/text-speech.svg"
                      width={20}
                      height={20}
                      alt="Accessibility"
                      className="w-10 h-10"
                    />

                    <span className="font-semibold text-gray-9 text-base">Text to Speech</span>
                  </div>

                  <div className="mr-[2px]">
                    <Switch checked={options.textToSpeech} onCheckedChange={handleTextToSpeech} />
                  </div>
                </div>
              </div>

              <div className="translate-container">
                {/* Google Translate UI */}
                <div className="border-primary-2 border rounded-xl mb-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue={selectedLang !== "en" ? "item-1" : ""}
                  >
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

                      <AccordionContent className="border-t border-primary-2 px-4 py-4">
                        <select
                          onChange={handleLanguageChange}
                          value={selectedLang}
                          className="border p-2 rounded w-full"
                          translate="no"
                        >
                          <option value="">Select Language</option>
                          <option value="ab">Abkhaz</option>
                          <option value="ace">Acehnese</option>
                          <option value="ach">Acholi</option>
                          <option value="aa">Afar</option>
                          <option value="af">Afrikaans</option>
                          <option value="sq">Albanian</option>
                          <option value="alz">Alur</option>
                          <option value="am">Amharic</option>
                          <option value="ar">Arabic</option>
                          <option value="hy">Armenian</option>
                          <option value="as">Assamese</option>
                          <option value="av">Avar</option>
                          <option value="awa">Awadhi</option>
                          <option value="ay">Aymara</option>
                          <option value="az">Azerbaijani</option>
                          <option value="ban">Balinese</option>
                          <option value="bal">Baluchi</option>
                          <option value="bm">Bambara</option>
                          <option value="bci">Baoulé</option>
                          <option value="ba">Bashkir</option>
                          <option value="eu">Basque</option>
                          <option value="btx">Batak Karo</option>
                          <option value="bts">Batak Simalungun</option>
                          <option value="bbc">Batak Toba</option>
                          <option value="be">Belarusian</option>
                          <option value="bem">Bemba</option>
                          <option value="bn">Bengali</option>
                          <option value="bew">Betawi</option>
                          <option value="bho">Bhojpuri</option>
                          <option value="bik">Bikol</option>
                          <option value="bs">Bosnian</option>
                          <option value="br">Breton</option>
                          <option value="bg">Bulgarian</option>
                          <option value="bua">Buryat</option>
                          <option value="yue">Cantonese</option>
                          <option value="ca">Catalan</option>
                          <option value="ceb">Cebuano</option>
                          <option value="ch">Chamorro</option>
                          <option value="ce">Chechen</option>
                          <option value="ny">Chichewa</option>
                          <option value="zh-CN">Chinese (Simplified)</option>
                          <option value="zh-TW">Chinese (Traditional)</option>
                          <option value="chk">Chuukese</option>
                          <option value="cv">Chuvash</option>
                          <option value="co">Corsican</option>
                          <option value="crh">Crimean Tatar (Cyrillic)</option>
                          <option value="crh-Latn">Crimean Tatar (Latin)</option>
                          <option value="hr">Croatian</option>
                          <option value="cs">Czech</option>
                          <option value="da">Danish</option>
                          <option value="fa-AF">Dari</option>
                          <option value="dv">Dhivehi</option>
                          <option value="din">Dinka</option>
                          <option value="doi">Dogri</option>
                          <option value="dov">Dombe</option>
                          <option value="nl">Dutch</option>
                          <option value="dyu">Dyula</option>
                          <option value="dz">Dzongkha</option>
                          <option value="eo">Esperanto</option>
                          <option value="et">Estonian</option>
                          <option value="ee">Ewe</option>
                          <option value="fo">Faroese</option>
                          <option value="fj">Fijian</option>
                          <option value="tl">Filipino</option>
                          <option value="fi">Finnish</option>
                          <option value="fon">Fon</option>
                          <option value="fr">French</option>
                          <option value="fr-CA">French (Canada)</option>
                          <option value="fy">Frisian</option>
                          <option value="fur">Friulian</option>
                          <option value="ff">Fulani</option>
                          <option value="gaa">Ga</option>
                          <option value="gl">Galician</option>
                          <option value="ka">Georgian</option>
                          <option value="de">German</option>
                          <option value="el">Greek</option>
                          <option value="gn">Guarani</option>
                          <option value="gu">Gujarati</option>
                          <option value="ht">Haitian Creole</option>
                          <option value="cnh">Hakha Chin</option>
                          <option value="ha">Hausa</option>
                          <option value="haw">Hawaiian</option>
                          <option value="iw">Hebrew</option>
                          <option value="hil">Hiligaynon</option>
                          <option value="hi">Hindi</option>
                          <option value="hmn">Hmong</option>
                          <option value="hu">Hungarian</option>
                          <option value="hrx">Hunsrik</option>
                          <option value="iba">Iban</option>
                          <option value="is">Icelandic</option>
                          <option value="ig">Igbo</option>
                          <option value="ilo">Ilocano</option>
                          <option value="id">Indonesian</option>
                          <option value="iu-Latn">Inuktut (Latin)</option>
                          <option value="iu">Inuktut (Syllabics)</option>
                          <option value="ga">Irish</option>
                          <option value="it">Italian</option>
                          <option value="jam">Jamaican Patois</option>
                          <option value="ja">Japanese</option>
                          <option value="jw">Javanese</option>
                          <option value="kac">Jingpo</option>
                          <option value="kl">Kalaallisut</option>
                          <option value="kn">Kannada</option>
                          <option value="kr">Kanuri</option>
                          <option value="pam">Kapampangan</option>
                          <option value="kk">Kazakh</option>
                          <option value="kha">Khasi</option>
                          <option value="km">Khmer</option>
                          <option value="cgg">Kiga</option>
                          <option value="kg">Kikongo</option>
                          <option value="rw">Kinyarwanda</option>
                          <option value="ktu">Kituba</option>
                          <option value="trp">Kokborok</option>
                          <option value="kv">Komi</option>
                          <option value="gom">Konkani</option>
                          <option value="ko">Korean</option>
                          <option value="kri">Krio</option>
                          <option value="ku">Kurdish (Kurmanji)</option>
                          <option value="ckb">Kurdish (Sorani)</option>
                          <option value="ky">Kyrgyz</option>
                          <option value="lo">Lao</option>
                          <option value="ltg">Latgalian</option>
                          <option value="la">Latin</option>
                          <option value="lv">Latvian</option>
                          <option value="lij">Ligurian</option>
                          <option value="li">Limburgish</option>
                          <option value="ln">Lingala</option>
                          <option value="lt">Lithuanian</option>
                          <option value="lmo">Lombard</option>
                          <option value="lg">Luganda</option>
                          <option value="luo">Luo</option>
                          <option value="lb">Luxembourgish</option>
                          <option value="mk">Macedonian</option>
                          <option value="mad">Madurese</option>
                          <option value="mai">Maithili</option>
                          <option value="mak">Makassar</option>
                          <option value="mg">Malagasy</option>
                          <option value="ms">Malay</option>
                          <option value="ms-Arab">Malay (Jawi)</option>
                          <option value="ml">Malayalam</option>
                          <option value="mt">Maltese</option>
                          <option value="mam">Mam</option>
                          <option value="gv">Manx</option>
                          <option value="mi">Maori</option>
                          <option value="mr">Marathi</option>
                          <option value="mh">Marshallese</option>
                          <option value="mwr">Marwadi</option>
                          <option value="mfe">Mauritian Creole</option>
                          <option value="chm">Meadow Mari</option>
                          <option value="mni-Mtei">Meiteilon (Manipuri)</option>
                          <option value="min">Minang</option>
                          <option value="lus">Mizo</option>
                          <option value="mn">Mongolian</option>
                          <option value="my">Myanmar (Burmese)</option>
                          <option value="nhe">Nahuatl (Eastern Huasteca)</option>
                          <option value="ndc-ZW">Ndau</option>
                          <option value="nr">Ndebele (South)</option>
                          <option value="new">Nepalbhasa (Newari)</option>
                          <option value="ne">Nepali</option>
                          <option value="bm-Nkoo">NKo</option>
                          <option value="no">Norwegian</option>
                          <option value="nus">Nuer</option>
                          <option value="oc">Occitan</option>
                          <option value="or">Odia (Oriya)</option>
                          <option value="om">Oromo</option>
                          <option value="os">Ossetian</option>
                          <option value="pag">Pangasinan</option>
                          <option value="pap">Papiamento</option>
                          <option value="ps">Pashto</option>
                          <option value="fa">Persian</option>
                          <option value="pl">Polish</option>
                          <option value="pt">Portuguese (Brazil)</option>
                          <option value="pt-PT">Portuguese (Portugal)</option>
                          <option value="pa">Punjabi (Gurmukhi)</option>
                          <option value="pa-Arab">Punjabi (Shahmukhi)</option>
                          <option value="qu">Quechua</option>
                          <option value="kek">Qʼeqchiʼ</option>
                          <option value="rom">Romani</option>
                          <option value="ro">Romanian</option>
                          <option value="rn">Rundi</option>
                          <option value="ru">Russian</option>
                          <option value="se">Sami (North)</option>
                          <option value="sm">Samoan</option>
                          <option value="sg">Sango</option>
                          <option value="sa">Sanskrit</option>
                          <option value="sat-Latn">Santali (Latin)</option>
                          <option value="sat">Santali (Ol Chiki)</option>
                          <option value="gd">Scots Gaelic</option>
                          <option value="nso">Sepedi</option>
                          <option value="sr">Serbian</option>
                          <option value="st">Sesotho</option>
                          <option value="crs">Seychellois Creole</option>
                          <option value="shn">Shan</option>
                          <option value="sn">Shona</option>
                          <option value="scn">Sicilian</option>
                          <option value="szl">Silesian</option>
                          <option value="sd">Sindhi</option>
                          <option value="si">Sinhala</option>
                          <option value="sk">Slovak</option>
                          <option value="sl">Slovenian</option>
                          <option value="so">Somali</option>
                          <option value="es">Spanish</option>
                          <option value="su">Sundanese</option>
                          <option value="sus">Susu</option>
                          <option value="sw">Swahili</option>
                          <option value="ss">Swati</option>
                          <option value="sv">Swedish</option>
                          <option value="ty">Tahitian</option>
                          <option value="tg">Tajik</option>
                          <option value="ber-Latn">Tamazight</option>
                          <option value="ber">Tamazight (Tifinagh)</option>
                          <option value="ta">Tamil</option>
                          <option value="tt">Tatar</option>
                          <option value="te">Telugu</option>
                          <option value="tet">Tetum</option>
                          <option value="th">Thai</option>
                          <option value="bo">Tibetan</option>
                          <option value="ti">Tigrinya</option>
                          <option value="tiv">Tiv</option>
                          <option value="tpi">Tok Pisin</option>
                          <option value="to">Tongan</option>
                          <option value="lua">Tshiluba</option>
                          <option value="ts">Tsonga</option>
                          <option value="tn">Tswana</option>
                          <option value="tcy">Tulu</option>
                          <option value="tum">Tumbuka</option>
                          <option value="tr">Turkish</option>
                          <option value="tk">Turkmen</option>
                          <option value="tyv">Tuvan</option>
                          <option value="ak">Twi</option>
                          <option value="udm">Udmurt</option>
                          <option value="uk">Ukrainian</option>
                          <option value="ur">Urdu</option>
                          <option value="ug">Uyghur</option>
                          <option value="uz">Uzbek</option>
                          <option value="ve">Venda</option>
                          <option value="vec">Venetian</option>
                          <option value="vi">Vietnamese</option>
                          <option value="war">Waray</option>
                          <option value="cy">Welsh</option>
                          <option value="wo">Wolof</option>
                          <option value="xh">Xhosa</option>
                          <option value="sah">Yakut</option>
                          <option value="yi">Yiddish</option>
                          <option value="yo">Yoruba</option>
                          <option value="yua">Yucatec Maya</option>
                          <option value="zap">Zapotec</option>
                          <option value="zu">Zulu</option>
                        </select>
                        <p className="flex items-center gap-1 mt-1">
                          Powered by{" "}
                          <a className="flex items-center gap-1" href="https://translate.google.com" target="_blank">
                            <Image
                              src="https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png"
                              width={37}
                              height={14}
                              className="pr-[3px]"
                              alt="Google Translate"
                            />
                            Translate
                          </a>
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>

          {/* bottom  */}
          <div className="mt-auto">
            <Button variant="secondary" className="w-full" onClick={handleReset} translate="no">
              <Image
                src="/icons/arrow-rotate.svg"
                width={50}
                height={50}
                alt="Accessibility"
                className="cursor-pointer h-6 w-6"
              />
              Reset All
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <TTS isTTSActive={options.textToSpeech} />
    </div>
  );
}
