import GetTouch from "@/components/partials/get-touch";
import Hero from "./components/hero";
import BlogContent from "./components/blog-content";
import RecentPosts from "./components/recent-posts";
import ExploreRecommendBlogs from "@/components/partials/explore-recommend-blogs";
import NotFound from "@/components/partials/dynamic-page-not-found";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import ErrorComponent from "@/components/partials/errorPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getBlogBySlug(slug: string) {
  const response: any = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${slug}`,
    {
      cache: "no-store",
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

    const images = blog.feature_image?.path
      ? [
          {
            url: blog.feature_image.path.startsWith("http")
              ? blog.feature_image.path
              : `${SITE_URL}${blog.feature_image.path}`,
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
  try {
    const { slug } = await params;
    const data = await getBlogBySlug(slug);
    const blogData = data.data.blog;

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
  } catch (error: any) {
    if (error.status === 404) {
      return <NotFound />;
    }

    // For other errors, show a generic error page
    return (
      <ErrorComponent
        title="Error Loading Blog Post"
        message="We encountered an issue while loading this blog post. Please try again later."
      />
    );
  }
}
