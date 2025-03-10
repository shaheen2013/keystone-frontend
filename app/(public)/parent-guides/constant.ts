import bgImage from "@/public/assets/home/hero/parent-guides.png"
import educationplansImage from "@/public/assets/parent-guides/education-plans/image.png";

export const heroData = {
 title: "Empowering Parents Every Step of the Way",
 description:
   "Comprehensive resources and expert insights to support you in raising children with special needs.",
 cta: {
   text: "Contact Us",
   link: "/contact",
 },
 backgroundImage: bgImage,
};


export const guides = {
 title: "Our Guides",
 steps: [
   {
     title: "Education Support",
     description: "Tips and tools to support your child’s learning journey."
   },
   {
     title: "Therapeutic Resources",
     description: "Information about therapies, exercises, and specialists."
   },
   {
     title: "Behavioral Strategies",
     description: "Techniques to manage and encourage positive behavior."
   },
   {
     title: "Healthcare Navigation",
     description: "Guides to medical care, insurance, and wellness."
   }
 ]
};

export const educationPlans = {
 title: "Education Plans",
 description:
   "Discover the educational pathways that align with your child's unique needs and aspirations.",
   keyPoints: [
    "Understand the basics of Individualized Education Plans (IEPs) and 504 Plans.",
    "Learn how to collaborate with schools and professionals."
  ]  ,
  image : educationplansImage
}