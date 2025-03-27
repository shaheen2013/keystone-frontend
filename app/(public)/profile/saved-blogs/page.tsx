"use client";

import PaginationWrapper from "@/components/partials/pagination-wrapper";
import Image from "next/image";
import React, { useState } from "react";

export default function AccountSavedBlogs() {
  const [page, setPage] = useState(1);
  return (
    <div className="bg-primary-1 rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4  bg-primary-2 rounded-t-2xl">
        Saved Blogs
      </div>

      {/* content */}
      <div className="lg:p-8 p-4">
        {/* events */}
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 mb-4 md:mb-6">
          {Array(5)
            .fill(0)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className="bg-primary-2 p-5 rounded-xl relative"
                >
                  {/* remove */}
                  <button className="absolute bg-white flex gap-2 items-center px-6 py-2 right-8 top-8 rounded-xl">
                    <Image
                      src="/icons/delete.svg"
                      alt="close"
                      width={20}
                      height={20}
                    />

                    <span className="font-semibold">Remove</span>
                  </button>

                  <Image
                    src="https://dummyimage.com/720x480"
                    alt="event"
                    height={480}
                    width={720}
                    className="rounded-2xl mb-4 w-full"
                  />

                  {/* time/read min */}
                  <div className="flex gap-2 items-center justify-between mb-4">
                    <div className="text-secondary-6 text-base font-semibold">
                      6th Feb
                    </div>
                    <div className="text-secondary-6 text-base font-semibold">
                      6 minute Read
                    </div>
                  </div>

                  {/* title */}
                  <h2 className="text-gray-900 text-xl font-semibold mb-4">
                    5 Ways to Build Confidence Your Child with Special Needs
                  </h2>

                  {/* description */}
                  <p className="text-gray-900 line-clamp-3">
                    Empower your child to thrive by fostering self-esteem,
                    encouraging independence, and celebrating small victories.
                    Explore practical strategies designed for parents navigating
                    unique challenges.
                  </p>
                </div>
              );
            })}
        </div>
        <hr className="bg-primary-2 mb-4 md:mb-7" />
        {/* pagination area */}
        <PaginationWrapper
          page={page}
          setPage={setPage}
          total={200}
          className="col-span-full"
        />
      </div>
    </div>
  );
}
