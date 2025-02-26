"use client";

import React from "react";
import Image from "next/image";
import { Input, Label } from "@headlessui/react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/shadcn/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";

import { Button } from "@/components/shadcn/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Switch } from "@/components/shadcn/switch";
import { Slider } from "@/components/shadcn/slider";

export default function Accessibility() {
  const handleReset = () => {
    console.log("Resetting accessibility options");
  };

  return (
    <div className="fixed right-5 top-[450px] z-20">
      <Sheet>
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
              {/* Color Accesibility */}
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
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">
                            Color Blind
                          </span>
                          <Switch id="airplane-mode" />
                        </label>
                      </div>

                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">
                            Low Vision
                          </span>
                          <Switch id="airplane-mode" />
                        </label>
                      </div>

                      <div className="mb-5">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">
                            Saturation
                          </span>
                          <Switch id="airplane-mode" />
                        </label>
                      </div>

                      <div className="relative">
                        <Slider min={1} max={3} step={1} />

                        {/* slider steps */}
                        <div>
                          <div className="absolute right-[-2px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                          <div className="absolute left-[1px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                        </div>
                      </div>

                      <div className="flex justify-between text-gray-7 text-sm mt-3">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Display & text size  */}
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
                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">
                            Bold Text
                          </span>
                          <Switch id="airplane-mode" />
                        </label>
                      </div>

                      <div className="mb-4 border-b border-primary-2 pb-3">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-9 font-medium text-base">
                            Big Cursor
                          </span>
                          <Switch id="airplane-mode" />
                        </label>
                      </div>

                      <div className="mb-5 flex">
                        <span className="text-gray-9 font-medium text-base flex-1">
                          Text Size
                        </span>

                        <div className="relative w-full">
                          <Slider min={1} max={7} step={1} />

                          {/* slider steps */}
                          <div>
                            <div className="absolute right-[-2px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                            <div className="absolute left-[1px] top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[12px] w-[3px] bg-gray-3 rounded-lg -z-10"></div>
                          </div>
                        </div>
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
