"use client";

import { Play } from "@/components/icons";
import dynamic from "next/dynamic";
import { useState } from "react";

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

  if (!url || !isValidYoutubeUrl(url)) return null;

  return (
    <>
      <ReactPlayer
        url={url}
        playing={playing}
        controls
        light
        width="100%"
        height="100%"
        playIcon={<Play className="size-16 md:size-24 " />}
        onClickPreview={() => setPlaying(true)}
      />
    </>
  );
};

export default YoutubeVideoPlayer;
