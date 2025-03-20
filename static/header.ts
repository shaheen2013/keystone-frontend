interface MenuOptions {
  name: string;
  href?: string;
  items?: any[];
}

interface ServiceItem {
  title: string;
  description: string;
  href: string;
}

interface ResourceItem {
  title: string;
  description: string;
  href: string;
}

export const serviceItems: ServiceItem[] = [
  {
    title: "Disability Support",
    description:
      "Comprehensive assistance for individuals with disabilities, including mobility aids and counseling.",
    href: "/disability-support",
  },
  {
    title: "Community Integration",
    description:
      "Programs to help disabled individuals integrate into the community through social activities and support groups.",
    href: "/community-integration",
  },
  {
    title: "Educational Assistance",
    description:
      "Specialized educational support and resources for disabled students to help them achieve their academic goals.",
    href: "/educational-assistance",
  },
  {
    title: "Healthcare Access",
    description:
      "Facilitating access to essential healthcare services, therapies, and medical equipment for disabled individuals.",
    href: "/healthcare-access",
  },
];

export const resourceItems: ResourceItem[] = [
  {
    title: "Donation Guide",
    description:
      "Learn how your donations help disabled individuals and how to contribute effectively.",
    href: "/donation-guide",
  },
  {
    title: "Volunteer Opportunities",
    description:
      "Discover how you can volunteer to support disabled individuals and make a positive impact.",
    href: "/volunteer-opportunities",
  },
  {
    title: "Accessibility Resources",
    description:
      "Information on accessibility tools, mobility aids, and technology solutions for disabled people.",
    href: "/accessibility-resources",
  },
  {
    title: "Advocacy & Awareness",
    description:
      "Resources to raise awareness about disability rights and advocacy for inclusive communities.",
    href: "/advocacy-awareness",
  },
];

export const menuOptions: MenuOptions[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Services",
    items: serviceItems,
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Resources",
    items: resourceItems,
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
