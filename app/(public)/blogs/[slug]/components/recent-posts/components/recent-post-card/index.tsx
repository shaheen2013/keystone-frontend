import moment from "moment";
import Image from "next/image";
const RecentPostCard = ({ data }: { data: any }) => {
  const { title, subtitle, reading_time, created_at, feature_image } = data;
  return (
    <div className="grid grid-cols-[124px_1fr] md:grid-cols-[144px_1fr] rounded-2xl overflow-hidden">
      <Image
        src={feature_image?.path}
        alt="recent post image"
        width={400}
        height={300}
        className="w-full h-full object-cover object-center"
      />

      <div className="p-4 bg-white flex flex-col gap-2">
        <div className="flex items-center gap-2 justify-between">
          <span className="text-secondary-6 text-xs md:text-sm font-semibold">
            {moment(created_at).format("Do MMM")}
          </span>
          <span className="text-secondary-6 text-xs md:text-sm font-semibold">
            {reading_time}
          </span>
        </div>
        <h3 className="text-gray-9 text-sm md:text-base font-semibold line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-9 text-xs md:text-sm line-clamp-2">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default RecentPostCard;
