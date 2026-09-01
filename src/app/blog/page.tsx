import type { Metadata } from "next";
import { PostList } from "@/components/blog/post-list";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "つくったものや学んだことの記録。",
};

export default async function BlogPage() {
  const posts = await getAllPostMeta();

  return (
    <>
      <div className="mx-auto flex w-full max-w-300 flex-1 flex-col gap-10 px-5 pt-12">
        <SectionHeading as="h1" eyebrow="かんがえたこと">
          Blog
        </SectionHeading>
        <PostList posts={posts} />
      </div>
      <SiteFooter />
    </>
  );
}
