import Image from "next/image";
import img1 from "@/public/assets/home/upcoming-events/parent-training.png";
const MeetOurSpeaker = () => {
  return (
    <section className="bg-white py-12 md:py-32">
      <div className="container flex flex-col items-center justify-center gap-4 md:gap-12">
        <h3 className="text-2xl md:text-5xl font-bold text-gray-9">
          Meet our Speaker
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 md:gap-8">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-primary-2"
            >
              <div className="max-h-[400px] w-full rounded-xl overflow-hidden">
                {img1 && (
                  <Image
                    src={img1}
                    width={1000}
                    height={760}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                <h3 className="text-gray-9 text-xl md:text-2xl font-bold">
                  Dr. Nathaniel Brooks
                </h3>
                <p className="text-gray-8 text-sm md:text-lg">
                  Educational Psychologist, Special Needs Advocate, and Child
                  Development Specialist
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurSpeaker;
