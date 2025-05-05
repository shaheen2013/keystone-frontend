import type { Metadata } from "next";
import GetTouch from "@/components/partials/get-touch";
import Hero from "./components/hero";
import BlogContent from "./components/blog-content";
import RecentPosts from "./components/recent-posts";
import ExploreRecommendBlogs from "@/components/partials/explore-recommend-blogs";
import NotFound from "@/components/partials/dynamic-page-not-found";

interface BlogData {
  id: string;
  title: string;
  subtitle?: string;
  seo_title?: string;
  seo_description?: string;
  banner?: {
    path: string;
  };
  reading_time: string;
  created_at: string;
  content: string;
  tags?: string[];
  slug: string;
}

interface ApiResponse {
  data: {
    blog: BlogData;
  };
}

async function getBlogBySlug(slug: string): Promise<ApiResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${apiUrl}/blogs/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const error = new Error("Failed to fetch blog");
    (error as any).status = response.status;
    throw error;
  }

  return response.json();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const { slug } = params;
    const data = await getBlogBySlug(slug);
    const blog = data.data.blog;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const shareUrl = `${siteUrl}/blog/${slug}`;
    // const defaultImage = `${siteUrl}/default-social-image.jpg`;
    const defaultImage = "https://dummyimage.com/600x400/000/fff";

    return {
      title: blog.seo_title || blog.title || "Loading...",
      description: blog.seo_description || blog.subtitle || "",
      alternates: {
        canonical: shareUrl,
      },
      openGraph: {
        title: blog.seo_title || blog.title || "Loading...",
        description: blog.seo_description || blog.subtitle || "",
        url: shareUrl,
        siteName: "Your Site Name",
        type: "article",
        publishedTime: blog.created_at,
        images: [
          {
            url: blog.banner?.path
              ? absoluteUrl(blog.banner.path)
              : defaultImage,
            width: 1200,
            height: 630,
            alt: blog.title || "Post image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.seo_title || blog.title || "Loading...",
        description: blog.seo_description || blog.subtitle || "",
        images: {
          url: blog.banner?.path ? absoluteUrl(blog.banner.path) : defaultImage,
          alt: blog.title || "Post image",
        },
      },
      other: {
        "og:image:width": "1200",
        "og:image:height": "630",
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      title: "Blog Post",
      description: "Read this informative blog post",
    };
  }
}

function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  return path.startsWith("http")
    ? path
    : `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default async function BlogDetails({
  params,
}: {
  params: { slug: string };
}) {
  let blogData: BlogData | null = null;

  try {
    const data = await getBlogBySlug(params.slug);
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
