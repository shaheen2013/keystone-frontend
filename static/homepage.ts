import bgImage from "@/public/assets/home/hero/special-education-advocacy-support.png";

import {
  EducationAdvocacy,
  Assessment,
  ResourceCoordination,
} from "@/components/icons";

import img1 from "@/public/assets/home/upcoming-events/parent-training.png";
import img2 from "@/public/assets/home/upcoming-events/parent-training2.png";
import img3 from "@/public/assets/home/upcoming-events/parent-training3.png";

import avatar1 from "@/public/assets/home/testimonials/avatar1.png";

import insightsimg1 from "@/public/assets/home/insights-and-stories/img1.png";
import insightsimg2 from "@/public/assets/home/insights-and-stories/img2.png";
import insightsimg3 from "@/public/assets/home/insights-and-stories/img3.png";

export const heroData = {
  title: "Welcome to Keystone Ability Support",
  description:
    "At Keystone Ability Support, we empower families of children with special needs to thrive. Through personalized plans, advocacy, and resource connections, we simplify special education, government programs, and community services. Together, we help children achieve their full potential and build brighter futures.",
  cta: [
    {
      text: "Join an Event",
      link: "/events",
    },
  ],
  backgroundImage: bgImage,
};

export const serviceData = {
  title: "Our Key Services",
  subtitle:
    "Comprehensive Services for Families with Children with Special Needs",
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
      icon: Assessment,
      title: "Individualized Needs Assessment",
      description:
        "Our team conducts thorough evaluations to assess your child’s educational, therapeutic, and social needs. Based on this, we develop a customized plan to meet their unique needs.",
      linkText: "View Details",
      linkUrl: "/services/needs-assessment",
    },
    {
      icon: ResourceCoordination,
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

export const WhyKeystoneData = {
  vedioUrl:
    "https://www.youtube.com/watch?v=74H-u947tOo&list=RD74H-u947tOo&start_radio=1",
  title: "Why Keystone?",
  description:
    "At Keystone Ability Support, we understand that no two children are alike, and no challenge is too big or too small. Our dedicated team is here to help you every step of the way, from answering your questions to connecting you with the right resources. Whether you’re just starting out or need ongoing support, we are committed to being your trusted partner in your child's journey.",
  cta: {
    text: "Learn More",
    link: "#",
  },
};

export const upcomingEventsData = {
  title: "Join Us for Upcoming Events",
  cta: {
    text: "See All",
    link: "#",
  },
  events: [
    {
      time: "6:00 PM, 6th Feb 2025",
      title: "Parent Training Workshop",
      description:
        "Learn practical strategies to support your child's growth and development. Learn practical strategies to support your child's growth and development.",
      image: img1,
    },
    {
      time: "6:00 PM, 6th Feb 2025",
      title: "Parent Training Workshop",
      description:
        "Learn practical strategies to support your child's growth and development. Learn practical strategies to support your child's growth and development.",
      image: img2,
    },
    {
      time: "6:00 PM, 6th Feb 2025",
      title: "Parent Training Workshop",
      description:
        "Learn practical strategies to support your child's growth and development. Learn practical strategies to support your child's growth and development.",
      image: img3,
    },
    {
      time: "6:00 PM, 6th Feb 2025",
      title: "Parent Training Workshop",
      description:
        "Learn practical strategies to support your child's growth and development. Learn practical strategies to support your child's growth and development.",
      image: img1,
    },
    {
      time: "6:00 PM, 6th Feb 2025",
      title: "Parent Training Workshop",
      description:
        "Learn practical strategies to support your child's growth and development. Learn practical strategies to support your child's growth and development.",
      image: img2,
    },
    {
      time: "6:00 PM, 6th Feb 2025",
      title: "Parent Training Workshop",
      description:
        "Learn practical strategies to support your child's growth and development. Learn practical strategies to support your child's growth and development.",
      image: img3,
    },
  ],
  // pagination: {
  //   current: 1,
  //   total: 5,
  // },
};

export const keystoneAbilitySupportData = {
  title: "Why Families Trust Keystone Ability Support",
  description:
    "We offer personalized, family-centered care designed to meet the unique needs of every child and family. With years of experience in disability rights, special education, and children's programs, our team is deeply committed to securing the resources your child needs to thrive. We believe in empowering families by offering expert guidance, advocacy, and continuous support, ensuring that your child has the tools and opportunities to lead a fulfilling, independent life.",
  cta: {
    text: "Get Started",
    link: "#",
  },
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

export const testimonialsData = {
  title: "Parents Are Saying",
  subtitle:
    "Real stories from families we've helped—because every child deserves the right support and opportunities to thrive.",
  testimonials: [
    {
      id: 1,
      quote:
        "Keystone Ability Support has been a game-changer for our family. Their guidance through the special education process gave us confidence and clarity. Now, my child is receiving the right support in school!",
      author: {
        name: "James T.",
        description: "Father of a child with autism",
        image: avatar1,
      },
      rating: 5,
    },
    {
      id: 2,
      quote:
        "Keystone Ability Support has been a game-changer for our family. Their guidance through the special education process gave us confidence and clarity. Now, my child is receiving the right support in school!",
      author: {
        name: "James T.",
        description: "Father of a child with autism",
        image: avatar1,
      },
      rating: 4,
    },
    {
      id: 3,
      quote:
        "Keystone Ability Support has been a game-changer for our family. Their guidance through the special education process gave us confidence and clarity. Now, my child is receiving the right support in school!",
      author: {
        name: "James T.",
        description: "Father of a child with autism",
        image: avatar1,
      },
      rating: 5,
    },
    {
      id: 4,
      quote:
        "Keystone Ability Support has been a game-changer for our family. Their guidance through the special education process gave us confidence and clarity. Now, my child is receiving the right support in school!",
      author: {
        name: "James T.",
        description: "Father of a child with autism",
        image: avatar1,
      },
      rating: 5,
    },
    {
      id: 5,
      quote:
        "Keystone Ability Support has been a game-changer for our family. Their guidance through the special education process gave us confidence and clarity. Now, my child is receiving the right support in school!",
      author: {
        name: "James T.",
        description: "Father of a child with autism",
        image: avatar1,
      },
      rating: 4,
    },
    {
      id: 6,
      quote:
        "Keystone Ability Support has been a game-changer for our family. Their guidance through the special education process gave us confidence and clarity. Now, my child is receiving the right support in school!",
      author: {
        name: "James T.",
        description: "Father of a child with autism",
        image: avatar1,
      },
      rating: 5,
    },
  ],
};

export const insightsAndStoriesData = {
  title: "Insights and Stories",
  cta: {
    text: "See All",
    link: "#",
  },
  articles: [
    {
      date: "6th Feb",
      readTime: "6 minute Read",
      title: "5 Ways to Build Confidence Your Child with Special Needs",
      description:
        "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
      image: insightsimg1,
      saveForLater: true,
    },
    {
      date: "6th Feb",
      readTime: "6 minute Read",
      title: "5 Ways to Build Confidence Your Child with Special Needs",
      description:
        "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
      image: insightsimg2,
      saveForLater: true,
    },
    {
      date: "6th Feb",
      readTime: "6 minute Read",
      title: "5 Ways to Build Confidence Your Child with Special Needs",
      description:
        "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
      image: insightsimg3,
      saveForLater: true,
    },
    {
      date: "6th Feb",
      readTime: "6 minute Read",
      title: "5 Ways to Build Confidence Your Child with Special Needs",
      description:
        "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
      image: insightsimg1,
      saveForLater: true,
    },
    {
      date: "6th Feb",
      readTime: "6 minute Read",
      title: "5 Ways to Build Confidence Your Child with Special Needs",
      description:
        "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
      image: insightsimg2,
      saveForLater: true,
    },
    {
      date: "6th Feb",
      readTime: "6 minute Read",
      title: "5 Ways to Build Confidence Your Child with Special Needs",
      description:
        "Empower your child to thrive by fostering self-esteem, encouraging independence, and celebrating small victories. Explore practical strategies designed for parents.",
      image: insightsimg3,
      saveForLater: true,
    },
  ],
  // pagination: {
  //   current: 1,
  //   total: 5,
  // },
};

export const supportSectionData = {
  title: "We’re Here to Help You Every Step of the Way",
  description:
    "Have questions or need support? Reach out to our team and let’s work together to empower your family.",
  cta: {
    text: "Contact Us",
    link: "#",
  },
};
