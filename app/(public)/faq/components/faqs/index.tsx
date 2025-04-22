"use client";

import { Minus, Plus } from "@/components/icons";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { useGetFaqsQuery } from "@/features/public/faqSlice";
import { TabsContent } from "@radix-ui/react-tabs";
import { useCallback, useEffect, useMemo, useState } from "react";

const Faqs = () => {
  const { data, isLoading, isFetching }: any = useGetFaqsQuery({});
  const faqsData = useMemo(() => data?.data || [], [data]);
  const loading = isLoading || isFetching;

  const [openFaqIds, setOpenFaqIds] = useState<string[]>([]);

  useEffect(() => {
    const firstFaq = faqsData[0]?.faqs?.[0];
    if (firstFaq?.id) setOpenFaqIds([firstFaq?.id]);
  }, [faqsData]);

  const handleToggle = useCallback((faqId: string) => {
    setOpenFaqIds((prevIds) =>
      prevIds.includes(faqId)
        ? prevIds.filter((id) => id !== faqId)
        : [...prevIds, faqId]
    );
  }, []);

  // Skeleton for the header
  const HeaderSkeleton = () => <Skeleton className="h-10 w-64 mx-auto" />;

  // Skeleton for the tabs
  const TabsSkeleton = () => (
    <div className="flex gap-4 justify-center">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-10 w-24" />
      ))}
    </div>
  );

  // Skeleton for FAQ items
  const FaqItemSkeleton = () => (
    <div className="flex flex-col gap-4 bg-gray-1 border border-gray-2 rounded-xl p-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  );

  return (
    <section className="bg-white py-12 md:py-28">
      <div className="container flex flex-col items-center gap-6 md:gap-12">
        {loading ? (
          <HeaderSkeleton />
        ) : (
          <h3 className="text-2xl md:text-5xl font-bold text-gray-9">
            Frequently Asked Question
          </h3>
        )}

        {loading ? (
          <div className="max-w-6xl w-full mx-auto">
            <TabsSkeleton />
            <div className="mt-6 md:mt-12 w-full flex flex-col gap-4">
              {[...Array(4)].map((_, i) => (
                <FaqItemSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : faqsData.length > 0 ? (
          <Tabs
            defaultValue={faqsData[0].id}
            className="max-w-6xl w-full mx-auto"
          >
            <TabsList className="flex justify-start md:justify-center gap-2 md:gap-8">
              {faqsData.map((cat: any) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {faqsData.map((cat: any) => (
              <TabsContent
                key={cat.id}
                value={cat.id}
                className="mt-6 md:mt-12 w-full"
              >
                <div className="flex flex-col gap-2 md:gap-6">
                  {cat.faqs.map((faq: any) => {
                    const isOpen = openFaqIds.includes(faq.id);

                    return (
                      <div
                        key={faq.id}
                        className="flex justify-between items-start gap-6 bg-gray-1 border border-gray-2 rounded-xl px-4 md:px-5 py-3 md:py-4 cursor-pointer"
                        onClick={() => handleToggle(faq.id)}
                      >
                        <div className="flex flex-col gap-4 w-full">
                          <div className="flex justify-between items-center">
                            <h4 className="text-base md:text-xl font-bold text-gray-9">
                              {faq.question}
                            </h4>
                            {isOpen ? (
                              <Minus
                                className="text-gray-9 size-6 shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggle(faq.id);
                                }}
                              />
                            ) : (
                              <Plus
                                className="text-gray-9 size-7 shrik-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggle(faq.id);
                                }}
                              />
                            )}
                          </div>

                          {isOpen && (
                            <p className="text-gray-9 text-sm md:text-lg">
                              {faq.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <p className="text-gray-500">No FAQs found</p>
        )}
      </div>
    </section>
  );
};

export default Faqs;
