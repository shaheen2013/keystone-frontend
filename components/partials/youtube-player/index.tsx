"use client";

import { Play } from "@/components/icons";
import dynamic from "next/dynamic";
import { useState } from "react";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

const YoutubeVideoPlayer = ({ url }: { url: string }) => {
  const [playing, setPlaying] = useState(false);
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
