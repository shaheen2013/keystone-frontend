const Agenda = () => {
  return (
    <section className="py-12 md:py-28 bg-primary-2">
      <div className="container flex flex-col gap-6 md:gap-12">
        <h3 className="text-2xl md:text-5xl font-bold text-center">
          {"Agenda at a Glance"}
        </h3>
        <div className="flex flex-col gap-4 md:gap-6">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="p-4 md:p-6 rounded-xl bg-white flex flex-col md:flex-row md:justify-between gap-2"
            >
              <h4 className="text-gray-9 text-base md:text-xl font-semibold">
                Parent Training Workshop
              </h4>
              <span className="text-secondary-6 text-base md:text-xl font-medium">
                06:00 PM - 06:30 PM
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agenda;
