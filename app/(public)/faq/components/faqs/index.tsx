"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Minus, Plus } from "lucide-react";
import { useCallback, useState } from "react";

const Faqs = ({ data }: { data: any }) => {
  const { title, items } = data;
  const [isOpen, setOpen] = useState(data[items[0].key][0]);

  const handleToggle = useCallback((faq: any) => {
    setOpen((prev: any) => (prev === faq ? null : faq));
  }, []);

  return (
    <section className="bg-white py-12 md:py-28">
      <div className="container flex flex-col items-center gap-6 md:gap-12">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9">{title}</h3>
        <Tabs defaultValue={items[0].key} className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
            {items.map((item: any) => (
              <TabsTrigger key={item.key} value={item.key}>
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map((item: any) => (
            <TabsContent
              key={item.key}
              value={item.key}
              className="mt-6 md:mt-12"
            >
              <div className="flex flex-col gap-2 md:gap-6">
                {data[item.key].map((faq: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-start gap-6 bg-gray-1 border border-gray-2 rounded-xl px-4 md:px-5 py-3 md:py-4 cursor-pointer"
                    onClick={() => handleToggle(data[item.key][index])}
                  >
                    <div className="flex flex-col gap-4">
                      <h4 className="text-base md:text-xl font-bold text-gray-9">
                        {faq.question}
                      </h4>
                      {isOpen === data[item.key][index] && (
                        <p className="text-gray-9 text-sm md:text-lg">
                          {faq.answer}
                        </p>
                      )}
                    </div>

                    {isOpen === data[item.key][index] ? (
                      <Minus
                        className="text-gray-9 size-6 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(null);
                        }}
                      />
                    ) : (
                      <Plus
                        className="text-gray-9 size-6 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(data[item.key][index]);
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Faqs;
