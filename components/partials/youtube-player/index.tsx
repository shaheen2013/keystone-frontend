"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Youtube } from "@/components/icons";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

// Function to validate YouTube URLs
const isValidYoutubeUrl = (url: string) => {
  const patterns = [
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S*)?$/,
    /^(https?:\/\/)?(www\.)?youtu\.be\/[\w-]+$/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]+$/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/v\/[\w-]+$/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[\w-]+$/,
  ];

  return patterns.some((pattern) => pattern.test(url));
};

const YoutubeVideoPlayer = ({ url }: { url: string }) => {
  const [playing, setPlaying] = useState(false);

  if (!url || !isValidYoutubeUrl(url)) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border border-red-200 rounded-lg bg-red-50 text-center max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-3 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <h3 className="font-medium text-lg">Invalid YouTube URL</h3>
        </div>

        <Youtube className="w-10 h-10 text-red-500 mb-3" />

        <p className="text-gray-700 mb-4">
          The URL you provided is not a valid YouTube video link.
        </p>

        <div className="text-left w-full bg-white p-3 rounded border border-gray-200">
          <p className="font-medium text-sm mb-2 text-gray-800">
            Supported formats:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
            <li>https://www.youtube.com/watch?v=VIDEO_ID</li>
            <li>https://youtu.be/VIDEO_ID</li>
            <li>https://www.youtube.com/embed/VIDEO_ID</li>
            <li>https://www.youtube.com/shorts/VIDEO_ID</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden shadow-lg">
      <ReactPlayer
        url={url}
        playing={playing}
        controls
        width="100%"
        height="100%"
        onClickPreview={() => setPlaying(true)}
        style={{ aspectRatio: "16/9" }}
      />
    </div>
  );
};

export default YoutubeVideoPlayer;
