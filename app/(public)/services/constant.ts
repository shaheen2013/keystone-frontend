import heroImage from "@/public/assets/services/hero/services-hero.png";
import { EducationAdvocacy, Assessment, ResourceCoordination } from "@/components/icons";

export const heroData = {
 title: "Explore Our Services",
 description:
  "Designed to support families and children with special needs, our services empower you with the tools and resources to thrive.",
 backgroundImage: heroImage,
};

export const serviceData = {
  title: "Our Services",
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

export const keystoneAbilitySupportData = {
 title: "Why Families Trust Keystone Ability Support",
 description:
   "We offer personalized, family-centered care designed to meet the unique needs of every child and family. ",
 features: [
   {
     title: "Personalized Support Plans",
     description:
       "We collaborate with families to create a tailored plan that integrates educational and community resources, providing ongoing guidance throughout the process.",
   },
   {
     title: "Expert Advocacy",
     description:
       "Our knowledge of special education laws, government programs, and disability services ensures that families receive the best possible advocacy in securing resources for their children.",
   },
   {
     title: "Commitment to Long-Term Success",
     description:
       "We are here for the long haul. Our focus is not just on immediate needs but on helping children and families thrive in the future, with sustainable plans and continuous support.",
   },
 ],
};

export const contactInfo = {
  title: "Get In Touch",
  description:
    "We are here to answer your questions and support you in every step of the way. If you’re ready to learn more or would like to schedule a consultation, please reach out to us.",
  contactInfo: {
    availability: {
      mondayFriday: {
        start: "09:00 AM",
        end: "09:00 PM",
      },
      saturdaySunday: {
        start: "11:00 AM",
        end: "05:00 PM",
      },
    },
    location: "123 Keystone Drive, Cityville, State, 45678",
    email: "support@keystone.com",
    phone: "+1 (123) 456-7890",
  },
};

console.log(contactInfo);




