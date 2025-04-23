"use client";

import { Skeleton } from "@/components/shadcn/skeleton";

export default function FooterSkeleton() {
  return (
    <footer className="text-gray-600 bg-primary-2">
      <div className="container lg:py-24 py-12 mx-auto flex lg:flex-row md:flex-nowrap flex-wrap flex-col gap-6">
        {/* Left Column */}
        <div className="xl:w-80 lg:w-60">
          <Skeleton className="h-12 w-[110px] lg:mb-6 mb-5" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-5/6 mb-8" />

          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        {/* Middle Column */}
        <div className="grid lg:grid-cols-3 grid-cols-2 flex-wrap flex-1 gap-6">
          {/* Quick Links */}
          <div>
            <Skeleton className="h-6 w-32 lg:mb-6 mb-4" />
            <div className="space-y-2 lg:mb-10 mb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Support & Legal */}
          <div>
            <Skeleton className="h-6 w-40 lg:mb-6 mb-4" />
            <div className="space-y-2 lg:mb-10 mb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Get in Touch */}
          <div className="lg:col-span-1 col-span-2">
            <Skeleton className="h-6 w-32 lg:mb-6 mb-4" />
            <div className="space-y-4 lg:mb-10 mb-4">
              <div className="flex gap-2 items-center">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex gap-2 items-center">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:w-80 lg:w-60">
          <Skeleton className="h-6 w-32 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-6" />

          <div className="flex gap-3">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-24" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-primary-3">
        <div className="container mx-auto py-8 px-5">
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </div>
    </footer>
  );
}
