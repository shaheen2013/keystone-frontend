interface MenuOptions {
  name: string;
  href?: string;
  items?: any[];
}

export const menuOptions: MenuOptions[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Services",
    items: [],
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Resources",
    href: "/download-toolkit",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
  {
    name: "Why us",
    href: "/why-us",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];
