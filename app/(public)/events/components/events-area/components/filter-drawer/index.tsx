import { Button } from "@/components/shadcn/button";
import { Filter2 } from "@/components/icons";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/shadcn/drawer";
import { DialogTitle } from "@/components/shadcn/dialog";
import { useState } from "react";
import EventTypes from "../event-type";
import Services from "../services";

const FilterDrawer = ({
  selectedServices,
  setSelectedServices,
  selectedEventTypes,
  setSelectedEventTypes,
  handleResetFilter,
}: {
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
  selectedEventTypes: string[];
  setSelectedEventTypes: React.Dispatch<React.SetStateAction<string[]>>;
  handleResetFilter: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="icon" variant="secondary" className="bg-secondary-2">
            <Filter2 className="text-gray-9 size-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-full px-5 pb-6">
          <DialogTitle className="sr-only">Filter</DialogTitle>
          <form className="flex flex-col gap-6 mt-6 " onSubmit={handleSubmit}>
            <div className="bg-primary-1 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-primary-2 flex items-center justify-between">
                <h3 className="text-gray-9 text-xl font-semibold">Filter</h3>
                <Button
                  className="text-secondary-6 hover:bg-primary-1 hover:text-secondary-6"
                  variant="ghost"
                  onClick={handleResetFilter}
                >
                  Reset
                </Button>
              </div>
              <EventTypes
                selectedEventTypes={selectedEventTypes}
                setSelectedEventTypes={setSelectedEventTypes}
              />
              <Services
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
              />
            </div>
            <Button variant="secondary" className="w-full" type="submit">
              Apply
            </Button>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
