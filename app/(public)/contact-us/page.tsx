"use client";

import GetTouch from "@/components/partials/get-touch";
import { Skeleton } from "@/components/shadcn/skeleton";
import { useGetFooterQuery } from "@/features/public/footerSlice";
import { useEffect, useState } from "react";

export default function ContactUs() {
  const { data, isLoading, isFetching }: any = useGetFooterQuery({});
  const loading = isLoading || isFetching;
  const [mapSrc, setMapSrc] = useState<string>("");

  useEffect(() => {
    if (data?.data?.get_in_touch?.maps) {
      const srcMatch = data.data.get_in_touch.maps.match(/src="([^"]*)"/);
      if (srcMatch) {
        setMapSrc(srcMatch[1]);
      }
    }
  }, [data]);

  return (
    <>
      <GetTouch classes={{ root: "bg-primary-2", form: "bg-white" }} />
      <div className="container py-12 md:py-28">
        {loading ? (
          <Skeleton className="w-full h-[350px] md:h-[800px] rounded-3xl" />
        ) : (
          mapSrc && (
            <iframe
              title="Google Maps"
              className="w-full h-[350px] md:h-[800px] border-0 rounded-3xl"
              src={mapSrc}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          )
        )}
      </div>
    </>
  );
}
