import { Button } from "@/components/shadcn/button";
import { supportSectionData } from "./constant";
import Link from "next/link";
const Support = () => {
  const { title, description, cta } = supportSectionData;
  return (
    <section className="container my-12 md:my-28 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12  bg-primary-8 rounded-2xl p-6 md:p-16">
      <div className="flex flex-col gap-4 md:gap-6">
        <h4 className="text-white text-2xl md:text-4xl font-bold">{title}</h4>
        <p className=" text-sm md:text-lg text-white"> {description}</p>
      </div>
      <Button variant="secondary" size="lg" className="w-full md:w-fit" asChild>
        <Link href={cta.link}>{cta.text}</Link>
      </Button>
    </section>
  );
};

export default Support;
