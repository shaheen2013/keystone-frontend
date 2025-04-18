"use client";

import CenteredHero from "@/components/partials/Hero/centered-hero";
import { Link } from "react-scroll";
import { useGetPrivacyPolicyQuery } from "@/features/public/privacyPolicySlice";

export default function PrivacyPolicy() {
  const { data }: any = useGetPrivacyPolicyQuery({});

  const tableOfContents = data?.data?.page?.sections?.map(
    (item: any, index: number) => ({
      id: `section${index + 1}`,
      title: item.title,
    })
  );
  const privacyPolicyData = data?.data?.page || {};

  const heroData = {
    title: privacyPolicyData?.title,
    subtitle: privacyPolicyData?.subtitle,
    banner: privacyPolicyData?.banner || "",
  };

  return (
    <>
      <CenteredHero data={heroData} />
      <div className="container py-12 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[512px_1fr] gap-8">
          <div className="hidden md:block  bg-primary-2 rounded-2xl overflow-hidden h-fit sticky top-28">
            <div className="p-6 bg-primary-3">
              <h3 className="text-gray-9 text-2xl font-semibold">
                Table of Content
              </h3>
            </div>
            <ul className="flex flex-col gap-4 p-6">
              {tableOfContents?.map((item: any, index: number) => (
                <li
                  key={index}
                  className="text-gray-8 text-lg font-semibold cursor-pointer hover:text-primary-6 transition-all"
                >
                  <Link
                    to={item.id}
                    smooth={true}
                    duration={500}
                    offset={-150}
                    spy
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-8 md:gap-16">
            {privacyPolicyData?.sections?.map((item: any, index: number) => (
              <section
                key={index}
                id={`section${index + 1}`}
                className="flex flex-col gap-6"
              >
                <h3 className="text-2xl md:text-4xl font-bold text-gray-9">
                  {item.title}
                </h3>
                <p
                  className="text-gray-8 text-base md:text-xl font-normal"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
