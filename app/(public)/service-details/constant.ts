import { Collaboration, EducationAdvocacy, Guidance, Support, SupportPlan } from "@/components/icons";
import bgImage from "@/public/assets/home/hero/special-education-advocacy-support.png"
import thumbnail from "@/public/assets/home/why-keystone/thumbnail.png";

export const heroData = {
 title: "Special Education Advocacy and Support",
 description:
   "We provide expert advocacy and guidance to help families navigate special education. By offering coaching and resources, we empower parents to confidently advocate for their child’s needs. From IEPs to educational placement, we ensure access, rights, and the support every child deserves.",
 cta: {
   text: "Contact Us",
   link: "/contact",
 },
 backgroundImage: bgImage,
};

export const ourServiceData = {
 thumbnail: thumbnail,
 url:"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
 title:"About Our Service",
 description:"We help families navigate the complexities of the special education system with expert advocacy and guidance. We empower parents and caregivers to become strong, confident advocates for their child’s needs by providing coaching and resources to build their capacity. Whether it's understanding Individualized Education Programs (IEPs), ensuring access to the Least Restrictive Environment (LRE), or finding the right educational placement, we are here to help solve challenges and secure the support your child deserves. Whether you need assistance with specific issues or long-term support, we will guide you through the process, ensuring your child’s rights are upheld and your voice is heard.",
}

export const keyBenefitsData = {
 title: "Key Benefits",
 benefits: [
   {
     title: "Expert Guidance",
     description:
       "Our specialists simplify complex special education laws, ensuring you understand your rights and options.",
     icon: Guidance,
   },
   {
     title: "IEP & 504 Plan Support",
     description:
       "We help review, develop, and advocate for effective Individualized Education Programs (IEPs) and 504 Plans tailored to your child's needs.",
     icon: SupportPlan,
   },
   {
     title: "Ongoing Support",
     description:
       "Whether you need one-time advice or long-term assistance, we provide continuous guidance through every stage of your child’s education.",
     icon: Support,
   },
   {
     title: "Personalized Support",
     description:
       "We empower parents and caregivers with the knowledge and tools to confidently advocate for their child’s educational success.",
     icon: Support,
   },
   {
     title: "Empowering Advocacy",
     description:
       "Gain the skills and resources needed to effectively advocate for your child's education.",
     icon: EducationAdvocacy,
   },
   {
     title: "School Collaboration",
     description:
       "We work directly with schools to ensure proper accommodations and services are provided.",
     icon: Collaboration,
   },
 ],
};

