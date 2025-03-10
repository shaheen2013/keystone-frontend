import Image from "next/image";

import image from "@/public/icons/download-toolkit.svg";
import premium from "@/public/icons/premium.svg";
import { Download } from "@/components/icons";

const DownloadToolkit = ({ data }: { data: any }) => {
  const { title, isPremium } = data;
  return (
    <div className="bg-primary-2 w-fit p-5 md:p-6 rounded-2xl relative flex flex-col gap-6">
      {isPremium && (
        <span className="absolute top-8 right-8">
          <Image
            src={premium}
            alt="premium"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </span>
      )}
      <div>
        <Image
          src={image}
          width={328}
          height={264}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between items-center gap-4">
        <span className="text-2xl font-semibold text-gray-9">{title}</span>
        <Download className="size-8 text-gray-9" />
      </div>
    </div>
  );
};

export default DownloadToolkit;
