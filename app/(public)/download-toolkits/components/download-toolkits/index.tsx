import DownloadToolkit from "@/components/shadcn/download-toolkit";

const DownloadToolkits = ({ data }: { data: any }) => {
  const { title, description, toolkits } = data;
  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container flex flex-col gap-6 md:gap-12">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <h3 className="text-gray-9 text-2xl md:text-5xl font-bold text-center">
            {title}
          </h3>
          <span className="text-gray-8 text-base md:text-xl">
            {description}
          </span>
        </div>
        {toolkits.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-4 md:gap-8">
            {toolkits.map((toolkit: any, index: number) => (
              <DownloadToolkit key={index} data={toolkit} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DownloadToolkits;
