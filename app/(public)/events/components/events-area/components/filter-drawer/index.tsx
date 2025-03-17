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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const handleResetFilter = () => {
    const searchParams = new URLSearchParams(window.location.search);

    // Keep "page" and "event", remove "type" and "service"
    searchParams.delete("type");
    searchParams.delete("service");

    // Push updated URL
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
  };

  function updateUrlsParamsFilter(key: string, value: string | null) {
    const searchParams = new URLSearchParams(window.location.search);

    if (!value) return; // Prevent null values

    // Get existing values for the key
    let values = searchParams.getAll(key);

    if (values.includes(value)) {
      // Remove value if already present (unchecked)
      values = values.filter((v) => v !== value);
    } else {
      // Add value if not present (checked)
      values.push(value);
    }

    // Reset the key and update with new values
    searchParams.delete(key);
    values.forEach((v) => searchParams.append(key, v));

    // Push the updated URL
    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false });
  }

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
                  onClick={handleResetFilter}
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
                        checked={searchParams
                          .getAll("type")
                          .includes(eventType)}
                        onCheckedChange={() =>
                          updateUrlsParamsFilter("type", eventType)
                        }
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
                        checked={searchParams
                          .getAll("service")
                          .includes(service)}
                        onCheckedChange={() =>
                          updateUrlsParamsFilter("service", service)
                        }
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
