import { Button } from "@/components/shadcn/button";
import { Filter2 } from "@/components/icons";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/shadcn/drawer";
import { DialogTitle } from "@/components/shadcn/dialog";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { eventTypes, services } from "../../constant";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";

type Inputs = {
  name: string;
};
const FilterDrawer = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
          <form
            className="flex flex-col gap-6 mt-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="bg-primary-1 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-primary-2 flex items-center justify-between">
                <h3 className="text-gray-9 text-xl font-semibold">Filter</h3>
                <Button
                  className="text-secondary-6 hover:bg-primary-1 hover:text-secondary-6"
                  variant="ghost"
                  // onClick={() => {
                  //   updateUrlParams("type", null);
                  //   updateUrlParams("service", null);
                  // }}
                >
                  Reset
                </Button>
              </div>
              <div className="m-4 bg-white rounded-xl">
                <div className="flex flex-col">
                  <h3 className="text-gray-9 text-base font-semibold px-4 py-3">
                    Event Type
                  </h3>
                  <hr className="border-gray-2" />
                  {eventTypes.map((eventType, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 px-4 py-3"
                    >
                      <Checkbox
                        id={eventType}
                        // checked={isChecked}
                        // onCheckedChange={() => {
                        //   updateUrlParams("type", eventType);
                        // }}
                        variant="secondary"
                      />
                      <Label
                        htmlFor={eventType}
                        className="text-sm text-gray-5"
                      >
                        {eventType}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="m-4 bg-white rounded-xl">
                <div className="flex flex-col">
                  <h3 className="text-gray-9 text-base font-semibold px-4 py-3">
                    Services
                  </h3>
                  <hr className="border-gray-2" />
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 px-4 py-3"
                    >
                      <Checkbox
                        id={service}
                        variant="secondary"
                        // onCheckedChange={() => {
                        //   updateUrlParams("service", service);
                        // }}
                      />
                      <Label htmlFor={service} className="text-sm text-gray-5">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
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
