"use client";

import resourcePurchaseImage from "@/public/icons/resource-purchase-popup.svg";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/shadcn/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/shadcn/drawer";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { Download } from "@/components/icons";

const EventContent = () => (
  <div className="rounded-2xl bg-white flex flex-col items-center">
    {resourcePurchaseImage && (
      <Image
        src={resourcePurchaseImage}
        alt="unlock"
        width={240}
        height={160}
      />
    )}
    <h3 className="mt-6 mb-2 text-3xl font-semibold text-gray-9 text-center">
      Unlock Premium Resources
    </h3>
    <p className="text-base font-normal text-gray-8 text-center">
      Gain access to exclusive materials and advanced tools to enhance your
      experience.
    </p>
    <hr className="h-px w-full bg-gray-2 mt-4 mb-8" />
  </div>
);

const ResourcePurchase = () => {
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const TriggerButton = (
    <div>
      <Download className="size-8 text-gray-9" />
    </div>
  );

  const FooterButtons = (
    <div className="flex flex-col md:flex-row w-full  gap-2">
      <DialogClose asChild>
        <DrawerClose asChild>
          <Button variant="outline" className="w-full md:w-1/2">
            Cancel
          </Button>
        </DrawerClose>
      </DialogClose>
      <Button variant="secondary" className="w-full md:w-1/2">
        Buy Now
      </Button>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[464px]">
          <DialogTitle className="sr-only">Attend This Event</DialogTitle>
          <EventContent />
          <DialogFooter className="p-0">{FooterButtons}</DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent className="sm:max-w-[350px] p-8 md:p-10">
        <DialogTitle className="sr-only">Attend This Event</DialogTitle>
        <EventContent />
        <DrawerFooter className="p-0">{FooterButtons}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ResourcePurchase;
