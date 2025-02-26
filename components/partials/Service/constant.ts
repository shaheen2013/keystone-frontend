import { EducationAdvocacy, Assessment, ResourceCoordination } from "@/components/icons";

export const serviceData = {
  title: "Our Key Services",
  subtitle: "Comprehensive Services for Families with Children with Special Needs",
  services: [
    {
      icon: EducationAdvocacy,
      title: "Special Education Advocacy and Support",
      description:
        "We help families navigate the complexities of the special education system with expert advocacy and guidance. We empower parents and caregivers to make informed decisions.",
      linkText: "View Details",
      linkUrl: "/services/special-education",
    },
    {
      icon: Assessment ,
      title: "Individualized Needs Assessment",
      description:
        "Our team conducts thorough evaluations to assess your child’s educational, therapeutic, and social needs. Based on this, we develop a customized plan to meet their unique needs.",
      linkText: "View Details",
      linkUrl: "/services/needs-assessment",
    },
    {
      icon: ResourceCoordination ,
      title: "Resource Coordination",
      description:
        "Navigating services for children with disabilities can be overwhelming. We help families connect with the right resources—whether it’s early intervention services, special education programs, or support groups.",
      linkText: "View Details",
      linkUrl: "/services/resource-coordination",
    },
  ],
  cta: {
    text: "Explore All",
    url: "/services",
  },
};
