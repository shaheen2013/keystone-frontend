import GetTouch from "@/components/partials/get-touch";
import Hero from "./components/hero";
import BlogContent from "./components/blog-content";
import RecentPosts from "./components/recent-posts";
import ExploreRecommendBlogs from "@/components/partials/explore-recommend-blogs";
import NotFound from "@/components/partials/dynamic-page-not-found";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getBlogBySlug(slug: any) {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    const error = new Error("Failed to fetch blog");
    (error as any).status = response.status;
    throw error;
  }

  return response.json();
}

export async function generateMetadata({ params }: PageProps) {
  const SITE_NAME = "KeyStone Ability Support";
  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://admin-staging.keystoneability.com/api";

  try {
    const { slug } = await params;
    const data = await getBlogBySlug(slug);
    const blog = data?.data?.blog;

    if (!blog) {
      return {
        title: `${SITE_NAME} Blog`,
        description: "Explore our latest articles and insights.",
      };
    }

    const shareUrl = `${SITE_URL}/blog/${slug}`;

    // Only process image if it exists
    const images = blog.banner?.path
      ? [
          {
            url: blog.banner.path.startsWith("http")
              ? blog.banner.path
              : `${SITE_URL}${blog.banner.path}`,
            width: 1200,
            height: 630,
            alt: blog.title || "Blog post thumbnail",
          },
        ]
      : undefined;

    return {
      title: blog.title || `${SITE_NAME} Blog`,
      description: blog.subtitle || "Read this insightful article.",
      alternates: {
        canonical: shareUrl,
      },
      openGraph: {
        title: blog.title || `${SITE_NAME} Blog`,
        description: blog.subtitle || "Read this insightful article.",
        url: shareUrl,
        siteName: SITE_NAME,
        type: "article",
        publishedTime: blog.created_at,
        ...(images ? { images } : {}),
      },
      twitter: {
        card: images ? "summary_large_image" : "summary",
        title: blog.title || `${SITE_NAME} Blog`,
        description: blog.subtitle || "Read this insightful article.",
        ...(images ? { images } : {}),
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      title: `${SITE_NAME} Blog`,
      description: "Explore our latest articles and insights.",
    };
  }
}

export default async function Page({ params }: PageProps) {
  let blogData: any = null;
  const { slug } = await params;
  console.log("slug", slug);
  try {
    const data = await getBlogBySlug(slug);
    blogData = data.data.blog;
  } catch (error: any) {
    if (error.status === 404) {
      return <NotFound />;
    }
    throw error;
  }

  if (!blogData) {
    return <NotFound />;
  }

  const heroData = {
    title: blogData.title,
    subtitle: blogData.subtitle,
    banner: blogData.banner?.path || "",
    readTime: blogData.reading_time,
    dateTime: blogData.created_at,
  };

  return (
    <>
      <Hero data={heroData} loading={false} />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_512px] py-12 md:py-28 container gap-8">
        <BlogContent data={blogData} loading={false} />
        <RecentPosts />
      </div>
      <ExploreRecommendBlogs />
      <GetTouch />
    </>
  );
}
