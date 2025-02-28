import EventCard from "@/components/shadcn/event-card";

const AllUpComingEvents = ({ data }: { data: any }) => {
  const { title, description, events } = data;
  return (
    <section className="bg-primary-2 py-12 md:py-28">
      <div className="container flex flex-col gap-6 md:gap-12">
        <div className="flex flex-col gap-4 md:gap-6 justify-between items-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-5xl font-bold text-gray-9 grow">
            {title}
          </h3>
          <p className="text-base md:text-2xl text-gray-9 text-center ">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          {events.map((event, index) => (
            <EventCard event={event} key={index} className="bg-white" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllUpComingEvents;
