import type { StaticImageData } from 'next/image';

export type HeroData = {
 title: string;
 description: string;
 backgroundImage: string | StaticImageData; 
};