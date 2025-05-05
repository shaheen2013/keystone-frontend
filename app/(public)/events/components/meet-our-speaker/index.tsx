import Image from "next/image";
import { MeetOurSpeakerSkeleton } from "./MeetOurSpeakerSkeleton";
const MeetOurSpeaker = ({ data, loading }: { data: any; loading: boolean }) => {
  if (loading) {
    return <MeetOurSpeakerSkeleton />;
  }
  return (
    <section className="bg-white py-12 md:py-32">
      <div className="container flex flex-col items-center justify-center gap-4 md:gap-12">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9">
          Meet our Speaker
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 md:gap-8">
          {data?.length === 0 && (
            <div className="col-span-full text-center text-gray-5">
              No Speaker Found
            </div>
          )}
          {data?.map((item: any, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-primary-2"
            >
              <div className="max-h-[400px] w-full rounded-xl overflow-hidden">
                {item?.profile_picture && (
                  <Image
                    src={item?.profile_picture?.path}
                    width={1000}
                    height={760}
                    alt={item.name}
                    className="w-full h-80 md:h-[400px] object-cover object-center rounded-xl"
                  />
                )}
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                <h3 className="text-gray-9 text-xl md:text-2xl font-bold">
                  {item.name}
                </h3>
                <p className="text-gray-8 text-sm md:text-lg">{item.about}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurSpeaker;
