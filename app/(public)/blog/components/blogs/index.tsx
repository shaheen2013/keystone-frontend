"use client";

import { ChevronDown, Search } from "@/components/icons";
import BlogCard from "@/components/shadcn/blog-card";
import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Input } from "@/components/shadcn/input";
import { useState } from "react";

const Blogs = ({ data }: { data: any }) => {
  const [search, setSearch] = useState("");
  return (
    <section className="py-12 md:py-28">
      <div className="container flex flex-col gap-6 md:gap-12">
        {/* filter area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h4 className="text-gray-9 text-2xl md:text-4xl font-semibold">
            {search ? "Search Results" : " All Blogs"}
          </h4>
          <div className="flex gap-4">
            <Input
              placeholder="Search by blog name"
              endIcon={<Search className="text-gray-7 size-6" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto font-semibold text-gray-5 px-4 py-3"
                >
                  Select Category
                  <ChevronDown className="ml-10 size-6 text-gray-7" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Frontend Development</DropdownMenuItem>
                <DropdownMenuItem>Backend Development</DropdownMenuItem>
                <DropdownMenuItem>UI/UX Design</DropdownMenuItem>
                <DropdownMenuItem>JavaScript Tips</DropdownMenuItem>
                <DropdownMenuItem>React & Next.js</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* blogs area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((blog: any) => (
            <BlogCard key={blog.id} article={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
