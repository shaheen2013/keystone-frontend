import type { StaticImageData } from "next/image";

export type HeroData = {
  title: string;
  subtitle: string;
  banner: string | StaticImageData;
};
