import {
  File,
  FileText,
  FileCode,
  FileImage,
  FileAudio,
  FileVideo,
  FileArchive,
  FileJson,
  FileSpreadsheet,
  FileSignature,
  FileKey,
  LinkIcon,
} from "lucide-react";
import { JSX } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

const Preview = ({ type }: { type: string }) => {
  const iconMap: Record<string, JSX.Element> = {
    // Link
    Link: <LinkIcon className="size-12 text-sky-500" />,
    // Text formats
    "text/plain": <FileText className="size-12 text-blue-500" />,
    "text/html": <FileCode className="size-12 text-orange-500" />,
    "text/css": <FileCode className="size-12 text-blue-400" />,
    "text/csv": <FileSpreadsheet className="size-12 text-green-500" />,

    // Image formats
    "image/jpeg": <FileImage className="size-12 text-amber-500" />,
    "image/png": <FileImage className="size-12 text-sky-500" />,
    "image/gif": <FileImage className="size-12 text-purple-400" />,
    "image/svg+xml": <FileImage className="size-12 text-pink-500" />,

    // Audio/video
    "audio/mpeg": <FileAudio className="size-12 text-red-500" />,
    "audio/wav": <FileAudio className="size-12 text-indigo-500" />,
    "video/mp4": <FileVideo className="size-12 text-rose-500" />,
    "video/quicktime": <FileVideo className="size-12 text-fuchsia-500" />,

    // Application
    "application/json": <FileJson className="size-12 text-yellow-500" />,
    "application/pdf": (
      <FontAwesomeIcon icon={faFilePdf} className="text-red-500 size-12" />
    ),
    "application/zip": <FileArchive className="size-12 text-gray-500" />,
    "application/msword": <FileSignature className="size-12 text-blue-600" />,
    "application/xml": <FileCode className="size-12 text-green-600" />,
    "application/x-msdownload": <FileKey className="size-12 text-purple-600" />,
    "application/xlsx": <FileSpreadsheet className="size-12 text-green-500" />,
  };

  // Extract base type for generic icons
  const [baseType] = type.split("/");
  const genericIcons = {
    text: <FileText className="size-12 text-gray-400" />,
    image: <FileImage className="size-12 text-gray-400" />,
    audio: <FileAudio className="size-12 text-gray-400" />,
    video: <FileVideo className="size-12 text-gray-400" />,
    application: <File className="size-12 text-gray-400" />,
  };

  return (
    iconMap[type] ||
    genericIcons[baseType as keyof typeof genericIcons] || (
      <File className="size-12 text-gray-400" />
    )
  );
};

export default Preview;
