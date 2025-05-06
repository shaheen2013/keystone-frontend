import { Clock } from "@/components/icons";
import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Calendar } from "lucide-react";
import moment from "moment";

export default function Hero({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) {
  const { title, subtitle, banner, dateTime, readTime } = data;

  return (
    <section
      className="relative w-full min-h-[448px] md:min-h-[788px] py-4 flex items-center justify-center bg-gray-200 bg-opacity-50"
      style={
        !loading
          ? {
              backgroundImage: `
          linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%),
          linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.80) 22.5%, rgba(0, 0, 0, 0.00) 79.21%),
          url(${banner})
        `,
              backgroundColor: "lightgray",
              backgroundPosition: "0px -81px",
              backgroundSize: "100% 138.325%",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    >
      <div className="container">
        {loading ? (
          <div className="max-w-4xl flex flex-col items-start gap-6">
            <Skeleton className="h-[30px] w-[80px] rounded-full" />

            <Skeleton className="h-10 w-full" />

            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
            <Skeleton className="mt-6 h-32 w-full md:w-1/2" />
          </div>
        ) : (
          <div className="max-w-4xl text-white flex flex-col items-start gap-6">
            <Button size="sm" className="px-4 h-[30px] text-xs rounded-full">
              Blog
            </Button>
            <h1 className="text-3xl md:text-5xl font-bold !leading-[1.2]">
              {title}
            </h1>
            <p className="text-base md:text-lg font-medium line-clamp-3">
              {subtitle}
            </p>
            <div className="mt-6 p-6 flex flex-col gap-4 bg-primary-8 rounded-xl w-fit">
              <span className="text-white text-sm md:text-base font-medium inline-flex">
                <Calendar className="mr-2 size-6" />
                {moment(dateTime).format("h:mm A, Do MMM YYYY")}
              </span>
              <span className="text-white text-sm md:text-base font-medium inline-flex">
                <Clock className="mr-2 size-6" />
                {readTime} minute Read
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
