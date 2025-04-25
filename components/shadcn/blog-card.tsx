import Image from "next/image";
import { Delete, Heart, HeartFilled } from "../icons";
import { cn } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";

const BlogCard = ({
  userPanel,
  article,
  classes,
  handleToggle,
}: {
  userPanel?: boolean;
  article: any;
  handleToggle: (id: string) => void;
  classes?: {
    root?: string;
    image?: string;
    title?: string;
  };
}) => {
  return (
    <div
      className={cn(
        "bg-primary-2 p-4 md:p-6 rounded-2xl flex flex-col gap-4 md:gap-6 items-start h-full",
        classes?.root
      )}
    >
      <div className="relative w-full">
        {article?.feature_image?.path && (
          <Link href={`/blogs/${article.slug}`}>
            <Image
              src={article?.feature_image?.path}
              width={1000}
              height={760}
              alt={article.title}
              className={cn(
                "w-full h-[230px] md:h-[314px] object-cover rounded-xl",
                classes?.image
              )}
            />
          </Link>
        )}
        <div
          className="absolute top-4 right-4 rounded-xl py-2.5 px-6 flex gap-2 items-center cursor-pointer transition-all bg-white"
          onClick={() => handleToggle(article.id)}
        >
          {userPanel ? (
            <>
              <Delete className="text-gray-9 size-5" />
              <span className="text-gray-900 text-sm font-semibold">
                Remove
              </span>
            </>
          ) : article.is_saved ? (
            <>
              <HeartFilled className="text-red-500 size-5" />
              <span className="text-gray-900 text-sm font-semibold">Saved</span>
            </>
          ) : (
            <>
              <Heart className="text-gray-900 size-5" />
              <span className="text-gray-900 text-sm font-semibold">
                Save for Later
              </span>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-4 w-full">
        <div className="flex gap-2 justify-between text-secondary-6 font-medium text-base">
          <span>{moment(article.created_at).format("Do MMM")}</span>
          <span>{article.reading_time} minute read</span>
        </div>
        <Link
          className={cn(
            "text-gray-9 text-xl md:text-3xl font-bold",
            classes?.title
          )}
          href={`/blogs/${article.slug}`}
        >
          {article.title}
        </Link>
        <p className="text-gray-9 text-sm md:text-lg line-clamp-3">
          {article.subtitle}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
