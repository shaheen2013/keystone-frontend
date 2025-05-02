import Image from "next/image";

const NotFound = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto pt-6 pb-12 md:pt-12  md:pb-28">
      <div className="max-w-[250px] md:max-w-[424px] w-full mb-6 md:mb-12">
        <Image
          src="/assets/search-not-found.svg"
          alt="No Results Found"
          width={424}
          height={424}
          className="w-full h-auto object-cover object-center mb-8"
          priority
        />
      </div>
      <h4
        className=" text-gray-9 text-2xl md:text-5xl font-bold mb-6"
        dangerouslySetInnerHTML={{ __html: data.title }}
      />
      {data.description && (
        <p className="text-gray-8 text-base md:text-2xl font-normal">
          {data.description}
        </p>
      )}
    </div>
  );
};

export default NotFound;
