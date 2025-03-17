import { useState } from "react";
import { Download } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogTrigger,
  DialogContent,
} from "@/components/shadcn/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerTrigger,
  DrawerContent,
} from "@/components/shadcn/drawer";
import { Button } from "@/components/shadcn/button";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children?: React.ReactNode;
}

export default function Modal({
  open,
  title,
  children,
  onOpenChange,
}: ModalProps) {
  //   const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* <DialogTrigger asChild>{TriggerButton}</DialogTrigger> */}
        <DialogContent
          className="sm:max-w-[464px]"
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only"></DialogTitle>
          {/* title */}
          <h2 className="text-3xl font-semibold">{title}</h2>
          <div>{children}</div>
          {/* <DialogFooter className="p-0"></DialogFooter> */}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {/* <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger> */}
      <DrawerContent className="p-8 md:p-10" aria-describedby={undefined}>
        <DialogTitle className="sr-only">Attend This Event</DialogTitle>
        <div className="mb-3">{children}</div>
        {/* <DrawerFooter className="p-0"></DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
