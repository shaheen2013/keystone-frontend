interface CarouselContent {
  name: string;
  role: string;
  description: string;
  ratings: number;
  image: string;
}

export const carouselContent: CarouselContent[] = [
  {
    name: "Emily R",
    role: "Mother of a child with autism",
    description:
      "“Keystone Ability Support has been a game-changer for our family. Their guidance through the special education process gave us confidence and clarity.",
    ratings: 5,
    image: "/assets/auth/carousel/item-1.png",
  },

  {
    name: "John Doe",
    role: "Father of a child with autism",
    description:
      "“Keystone Ability Support has been a game-changer for our family. Their guidance through the special education process gave us confidence and clarity. ",
    ratings: 5,
    image: "/assets/auth/carousel/item-2.png",
  },
];
