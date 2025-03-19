import bgImage from "@/public/assets/home/hero/parent-guides.png";
import educationplansImage from "@/public/assets/parent-guides/education-plans/image.png";

export const heroData = {
  title: "Empowering Parents Every Step of the Way",
  description:
    "Comprehensive resources and expert insights to support you in raising children with special needs.",
  cta: [
    {
      text: "Contact Us",
      link: "/contact",
    },
  ],
  backgroundImage: bgImage,
};

export const guides = {
  title: "Our Guides",
  steps: [
    {
      title: "Education Support",
      description: "Tips and tools to support your child’s learning journey.",
    },
    {
      title: "Therapeutic Resources",
      description: "Information about therapies, exercises, and specialists.",
    },
    {
      title: "Behavioral Strategies",
      description: "Techniques to manage and encourage positive behavior.",
    },
    {
      title: "Healthcare Navigation",
      description: "Guides to medical care, insurance, and wellness.",
    },
  ],
};

export const educationPlans = {
  title: "A Parent's Guide to Individualized Education Plans",
  description:
    "IEPs can be a complex but essential part of your child’s education journey. This guide simplifies the process, explaining your rights, the key components of an IEP, and how to work collaboratively with educators to meet your child's unique needs.",
  keyPoints: [
    "Step-by-step breakdown of the IEP process.",
    "Tips for advocating for your child during meetings.",
    "Printable checklist to prepare for IEP discussions.",
  ],
  image: educationplansImage,
  btn: {
    text: "Contact Us",
  },
};

export const downloadToolkits = {
  title: "Download Toolkits and Checklists",
  description: "Download PDF Recourse",
  toolkits: [
    { title: "Education Plans", isPremium: true },
    { title: "Education Plans", isPremium: false },
    { title: "Education Plans", isPremium: true },
    { title: "Education Plans", isPremium: true },
  ],
};
