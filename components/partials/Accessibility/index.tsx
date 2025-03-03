"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

import {
  getAccessibilifySettings,
  saveAccessibilifySetting,
} from "@/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/shadcn/accordion";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectTrigger,
  SelectContent,
} from "@/components/shadcn/select";

import { Slider } from "@/components/shadcn/slider";
import { Switch } from "@/components/shadcn/switch";
import { Button } from "@/components/shadcn/button";
import { languageOptions } from "@/static/accessibility";
import { Sheet, SheetContent, SheetTrigger } from "@/components/shadcn/sheet";

export default function Accessibility() {
  type Options = {
    colorBlind: boolean;
    lowVision: boolean;
    saturationStatus: boolean;
    saturation: number[];
    boldText: boolean;
    bigCursor: boolean;
    increaseContrast: boolean;
    textSize: number;
    magnification: boolean;
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
    textSize: 4,
    magnification: false,
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
    boldText: "font-bold text-gray-900 bg-gray-100",
    bigCursor: "cursor-big",
  };

  useEffect(() => {
    const settings: Options = getAccessibilifySettings();
    const root = document.getElementById("root") as HTMLElement;
    const body = document.body as HTMLElement;

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
      handleSaturation(settings.saturation);
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
  }, []);

  const handleAccessibilityRender = (event: any) => {
    if (!event) {
      return;
    }

    console.log("Accessibility component rendered");
  };

  // handle accessibility options
  const handleColorBlind = (event: any) => {
    setOptions({ ...options, colorBlind: event });

    const root = document.getElementById("root") as HTMLElement;
    root.classList.toggle(accessibilityClasses.colorBlind);

    saveAccessibilifySetting("colorBlind", event);
  };

  const handleLowVision = (event: any) => {
    setOptions({ ...options, lowVision: event });

    document
      .getElementById("root")
      ?.classList.toggle(accessibilityClasses.lowVision);
    saveAccessibilifySetting("lowVision", event);
  };

  const handleSaturationStatus = (event: any) => {
    saveAccessibilifySetting("saturationStatus", event);

    setOptions({
      ...options,
      saturationStatus: event,
      ...(!event ? { saturation: [1] } : {}),
    });

    const root = document.getElementById("root") as HTMLElement;
    if (options.saturationStatus) {
      root.classList.remove(
        accessibilityClasses.saturation[1],
        accessibilityClasses.saturation[2],
        accessibilityClasses.saturation[3]
      );
    } else {
    }
  };

  const handleSaturation = (value: number[]) => {
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
    saveAccessibilifySetting("boldText", event);

    const root = document.getElementById("root") as HTMLElement;
    accessibilityClasses.boldText.split(" ").forEach((cls) => {
      root.classList.toggle(cls);
    });
  };

  const handleBigCursor = (event: any) => {
    setOptions({ ...options, bigCursor: event });
    saveAccessibilifySetting("bigCursor", event);

    const body = document.body as HTMLElement;
    body.classList.toggle(accessibilityClasses.bigCursor);
  };

  const handleReset = () => {
    console.log("Resetting accessibility options");
  };

  return (
    <div className="fixed right-5 top-[450px] z-20">
      <Sheet onOpenChange={handleAccessibilityRender}>
        <SheetTrigger asChild>
          <Image
            src="/icons/accessibility.svg"
            width={50}
            height={50}
            alt="Accessibility"
            className="cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent
          className="flex flex-col overflow-y-scroll min-w-[460px] p-8"
          aria-describedby={undefined}
          id="accessibility-menu"
        >
          {/* todo: ignore this component */}
          <DialogTitle>
            {/* Intentional DialogTitle component because to remove shadcn error */}
          </DialogTitle>

          {/* content */}
          <div className="flex-1">
            <h2 className="font-semibold text-2xl mb-2 text-gray-9">
              Accessibility Menu
            </h2>

            <p className="text-gray-8 text-base mb-6">
              Customize your browsing with accessibility options designed to
              enhance readability, visibility.
            </p>

            <div>
              {/* color accordion*/}
              <div className="border-primary-2 border rounded-xl mb-4">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  value="item-1"
                >
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
                        <span className="font-semibold text-gray-9 text-base">
                          Color
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="border-t border-primary-2 px-4 py-4">
                      {/* color blind */}
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">
                            Color Blind
                          </span>
                          <Switch
                            onCheckedChange={handleColorBlind}
                            checked={options.colorBlind}
                          />
                        </label>
                      </div>

                      {/* low vision */}
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">
                            Low Vision
                          </span>
                          <Switch
                            id="airplane-mode"
                            checked={options.lowVision}
                            onCheckedChange={handleLowVision}
                          />
                        </label>
                      </div>

                      {/* saturation */}
                      <div className="mb-5">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">
                            Saturation
                          </span>
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
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  value="item-1"
                >
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
                        <span className="font-semibold text-gray-9 text-base">
                          Display & Text Size
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="border-t border-primary-2 px-4 py-4">
                      {/* bold text */}
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">
                            Bold Text
                          </span>
                          <Switch
                            checked={options.boldText}
                            onCheckedChange={handleBoldText}
                          />
                        </label>
                      </div>

                      {/* big cursor */}
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">
                            Big Cursor
                          </span>
                          <Switch
                            id="airplane-mode"
                            onCheckedChange={handleBigCursor}
                            checked={options.bigCursor}
                          />
                        </label>
                      </div>

                      {/* increase contrast */}
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">
                            Increase Contrast
                          </span>
                          <Switch id="airplane-mode" />
                        </label>
                      </div>

                      {/* text size */}
                      <div className="flex items-center">
                        <div className="text-gray-9 font-medium text-base basis-4/12">
                          Text Size
                        </div>

                        <div className="relative w-full flex basis-8/12 justify-center items-center gap-2">
                          <div className="text-xs">A</div>
                          <div className="w-full flex flex-col justify-center relative">
                            <Slider min={1} max={7} step={1} />

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
                      src="/icons/color.svg"
                      width={20}
                      height={20}
                      alt="Accessibility"
                      className="w-10 h-10"
                    />

                    <span className="font-semibold text-gray-9 text-base">
                      Magnification
                    </span>
                  </div>

                  <div className="mr-[2px]">
                    <Switch id="airplane-mode" />
                  </div>
                </div>
              </div>

              {/* google translate*/}
              <div className="border-primary-2 border rounded-xl mb-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-1`} className="last:border-b-0">
                    <AccordionTrigger className="px-3 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <Image
                          src="/icons/translate-box.svg"
                          width={20}
                          height={20}
                          alt="Accessibility"
                          className="w-10 h-10"
                        />
                        <span className="font-semibold text-gray-9 text-base">
                          Google Translate
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="border-t border-primary-2 px-4 py-4">
                      <div>
                        <Select>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {languageOptions.map((option, index) => {
                                return (
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
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* bottom  */}
          <div className="mt-auto">
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleReset}
            >
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
    </div>
  );
}
