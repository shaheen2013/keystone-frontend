"use client";

import CenteredHero from "@/components/partials/Hero/centered-hero";
import { Link } from "react-scroll";
import { useGetDynamicPageContentQuery } from "@/features/public/dynamicPagesSlice";
import { use } from "react";
import { Skeleton } from "@/components/shadcn/skeleton";
import NotFound from "@/components/partials/dynamic-page-not-found";

export default function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data, isLoading, isFetching, isError, error }: any =
    useGetDynamicPageContentQuery({
      slug,
    });

  // Show skeletons while loading
  const loading = isLoading || isFetching;

  // Handle 404 errors using your custom component
  if (isError && error?.status === 404) {
    return <NotFound />;
  }

  const tableOfContents = data?.data?.page?.sections?.map(
    (item: any, index: number) => ({
      id: `section${index + 1}`,
      title: item.title,
    })
  );
  const pageData = data?.data?.page || {};

  const heroData = {
    title: pageData?.title,
    subtitle: pageData?.subtitle,
    banner: pageData?.banner || "",
  };

  return (
    <>
      {/* Hero Section Skeleton */}
      {loading ? (
        <div className="w-full h-[400px] relative">
          <Skeleton className="absolute inset-0 w-full h-full" />
        </div>
      ) : (
        <CenteredHero data={heroData} />
      )}

      <div className="container py-12 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[512px_1fr] gap-8">
          {/* Table of Contents Skeleton */}
          <div className="hidden md:block bg-primary-2 rounded-2xl overflow-hidden h-fit sticky top-28">
            <div className="p-6 bg-primary-3">
              <h3 className="text-gray-9 text-2xl font-semibold">
                {loading ? (
                  <Skeleton className="w-1/2 h-8" />
                ) : (
                  "Table of Content"
                )}
              </h3>
            </div>
            {loading ? (
              <ul className="flex flex-col gap-4 p-6">
                {[...Array(4)].map((_, i) => (
                  <li key={i}>
                    <Skeleton className="w-full h-6" />
                  </li>
                ))}
              </ul>
            ) : (
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
            )}
          </div>

          {/* Main Content Skeleton */}
          <div className="flex flex-col gap-8 md:gap-16">
            {loading
              ? [...Array(3)].map((_, i) => (
                  <section key={i} className="flex flex-col gap-6">
                    <Skeleton className="w-3/4 h-10" />
                    <Skeleton className="w-full h-32" />
                  </section>
                ))
              : pageData?.sections?.map((item: any, index: number) => (
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
