import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostMeta, getPost } from "@/lib/blog";
import { renderMarkdown } from "@/lib/blog/render";

export async function generateStaticParams() {
  return (await getAllPostMeta()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return { title: `${post.meta.title} | nkoji` };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const { content } = await renderMarkdown(post.body);

  return (
    <div className="mx-auto w-full max-w-180 flex-1 px-5 pt-12">
      <h1 className="font-display text-3xl text-foreground-strong">
        {post.meta.title}
      </h1>
      {content}
    </div>
  );
}
