import Image from "next/image";
import { Heart } from "../icons";
import { cn } from "@/lib/utils";

const BlogCard = ({
  article,
  className,
}: {
  article: any;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-primary-2 p-4 md:p-6 rounded-2xl flex flex-col gap-4 md:gap-6 items-start",
        className
      )}
    >
      <div className="relative">
        <Image
          src={article.image}
          width={1000}
          height={760}
          alt={article.title}
        />
        <div className="absolute top-4 right-4 bg-white rounded-xl py-2.5 px-6 flex gap-2 cursor-pointer">
          <Heart className="text-gray-9" />
          <span className="text-gray-9 text-sm font-semibold">
            Save for Later
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex gap-2 justify-between text-secondary-6 font-medium text-base">
          <span>{article.date}</span>
          <span>{article.readTime}</span>
        </div>
        <h3 className="text-gray-9 text-xl md:text-3xl font-bold">
          {article.title}
        </h3>
        <p className="text-gray-9 text-sm md:text-lg line-clamp-3">
          {article.description}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
