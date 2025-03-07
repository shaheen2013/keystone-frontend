"use client";

import attend from "@/public/assets/event-details/hero/attend.svg";
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

const EventContent = () => (
  <div className="rounded-2xl bg-white flex flex-col items-center">
    <Image src={attend} alt="Attend" width={100} height={160} />
    <h3 className="mt-6 mb-2 text-3xl font-semibold text-gray-9 text-center">
      You're Almost There!
    </h3>
    <p className="text-base font-normal text-gray-8 text-center">
      Thank you for your interest!{" "}
      <span className="font-semibold text-secondary-6">
        We’ll send the Zoom link to your email and contact shortly.
      </span>
    </p>
    <hr className="h-px w-full bg-gray-2 mt-4 mb-8" />
  </div>
);

const EventConfirmation = () => {
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const TriggerButton = (
    <Button variant="secondary" className="w-full md:w-fit">
      Attend This Event
    </Button>
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
        Confirm Attendance
      </Button>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[524px]">
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
      <DrawerContent className="sm:max-w-[425px] p-8 md:p-10">
        <DialogTitle className="sr-only">Attend This Event</DialogTitle>
        <EventContent />
        <DrawerFooter className="p-0">{FooterButtons}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EventConfirmation;
