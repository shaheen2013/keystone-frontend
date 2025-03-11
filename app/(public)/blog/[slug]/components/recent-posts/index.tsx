import RecentPostCard from "./components/recent-post-card";

const RecentPosts = ({ data }: { data: any }) => {
  return (
    <section className="rounded-2xl bg-primary-2 overflow-hidden">
      <h4 className="bg-primary-3 p-6 text-gray-9 font-semibold text-2xl">
        Recent Posts
      </h4>
      <div className="flex flex-col gap-4 p-6 ">
        {data.map((item, index) => (
          <RecentPostCard key={index} data={item} />
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
