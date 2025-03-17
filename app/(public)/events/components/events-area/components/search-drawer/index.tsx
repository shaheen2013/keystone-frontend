import { Button } from "@/components/shadcn/button";
import { Search } from "@/components/icons";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/shadcn/drawer";
import { DialogTitle } from "@/components/shadcn/dialog";
import { useState } from "react";
import { Input } from "@/components/shadcn/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
};
const SearchDrawer = ({
  search,
  setSearch,
  searchParams,
}: {
  search: string;
  setSearch: any;
  searchParams: any;
}) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const updateUrlParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateUrlParams("event", data.name);
    setOpen(false);
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="icon" variant="primary" className="bg-primary-2">
            <Search className="text-gray-9 size-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-full px-5 pb-6">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <form
            className="flex flex-col gap-6 mt-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              placeholder="Search by event name"
              classes={{ root: "w-full" }}
              endIcon={<Search className="text-gray-7" />}
              {...register("name", { required: true })}
              errorText={errors.name && "Name is required"}
            />
            <Button variant="secondary" className="w-full" type="submit">
              Search
            </Button>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
