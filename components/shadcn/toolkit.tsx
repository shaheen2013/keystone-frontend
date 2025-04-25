import { Download, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import Preview from "./preview";
import formatSize from "@/lib/formatSize";

const Toolkit = ({ data }: any) => {
  const { title, file, type, link } = data;
  const fileType = type === "File" ? file.mime_type : "Link";
  const actionIcon = type === "Link" ? <LinkIcon /> : <Download />;

  const Content = () => (
    <div className="bg-primary-2 w-full p-5 md:p-6 rounded-2xl cursor-pointer group">
      <div className="bg-gray-50 rounded-xl flex items-center justify-center h-48 w-full mb-4 overflow-hidden relative">
        {type === "File" ? (
          <div className="flex flex-col items-center gap-1">
            <Preview type={fileType} />
            <div className="mt-2 text-xs text-gray-500 font-mono truncate">
              {formatSize(file.size)}
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <LinkIcon className="size-12 text-blue-500 mx-auto mb-2" />
            <span className="text-sm text-gray-600">Visit Link</span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center gap-2">
        <span className="text-lg font-semibold text-gray-9 line-clamp-1">
          {title}
        </span>
        <div className="text-gray-500 group-hover:text-blue-500 transition-colors">
          {actionIcon}
        </div>
      </div>
    </div>
  );

  return type === "Link" ? (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Content />
    </Link>
  ) : (
    <a href={file.path} download className="block" title="Download">
      <Content />
    </a>
  );
};

export default Toolkit;
