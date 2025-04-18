import Image from "next/image";
import { Heart, HeartFilled } from "../icons";
import { cn } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";

const BlogCard = ({
  article,
  className,
}: {
  article: any;
  className?: string;
}) => {
  return (
    <Link
      className={cn(
        "bg-primary-2 p-4 md:p-6 rounded-2xl flex flex-col gap-4 md:gap-6 items-start h-full",
        className
      )}
      href={`/blogs/${article.slug}`}
    >
      <div className="relative w-full">
        <Image
          src={article?.feature_image?.path || ""}
          width={1000}
          height={760}
          alt={article.title}
          className="w-full h-[230px] md:h-[314px] object-cover rounded-xl"
        />
        <div className="absolute top-4 right-4 rounded-xl py-2.5 px-6 flex gap-2 cursor-pointer transition-all bg-white text-gray-9">
          {article.isSaveForLater ? (
            <HeartFilled className="text-red-500 size-5" />
          ) : (
            <Heart className=" text-gray-9 size-5" />
          )}
          <span className="text-gray-9 text-sm font-semibold">
            {article.isSaveForLater ? "Saved" : " Save for Later"}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-4 w-full">
        <div className="flex gap-2 justify-between text-secondary-6 font-medium text-base">
          <span>{moment(article.created_at).format("Do MMM")}</span>
          <span>{article.reading_time} minute read</span>
        </div>
        <h3 className="text-gray-9 text-xl md:text-3xl font-bold">
          {article.title}
        </h3>
        <p className="text-gray-9 text-sm md:text-lg line-clamp-3">
          {article.subtitle}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
