"use client";

import { Minus, Plus } from "@/components/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { useGetFaqsQuery } from "@/features/public/faqSlice";
import { TabsContent } from "@radix-ui/react-tabs";
import { useCallback, useEffect, useMemo, useState } from "react";

const Faqs = () => {
  const { data } = useGetFaqsQuery({});
  const faqsData = useMemo(() => data?.data || [], [data]);

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

  return (
    <section className="bg-white py-12 md:py-28">
      <div className="container flex flex-col items-center gap-6 md:gap-12">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9">
          Frequently Asked Question
        </h3>

        {faqsData.length > 0 && (
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
        )}
      </div>
    </section>
  );
};

export default Faqs;
