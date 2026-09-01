import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/blog/author-card";
import { formatDate } from "@/components/blog/post-card";
import { PostNav } from "@/components/blog/post-nav";
import { ShareButton } from "@/components/blog/share-button";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { IconArrowLeft } from "@/components/icons";
import { SiteFooter } from "@/components/layout/site-footer";
import { Tag } from "@/components/ui/tag";
import { getAllPostMeta, getPost } from "@/lib/blog";
import { renderMarkdown } from "@/lib/blog/render";
import { CONTENT_REPO_EDIT_BASE } from "@/lib/site";

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

  const { description } = post.meta;
  const path = `/blog/${post.meta.slug}`;

  return {
    title: post.meta.title,
    // 未設定ならルートの説明文が継承される
    ...(description && { description }),
    // ルートの "/" を記事ごとの URL で上書きする
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: post.meta.title,
      ...(description && { description }),
      url: path,
      type: "article",
      publishedTime: post.meta.date,
    },
    // 記事の OGP は横長なので、正方形前提で summary にしている
    // ルートの設定をここで戻す
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { content, toc } = await renderMarkdown(post.body);
  const { meta } = post;

  return (
    <>
      <div className="mx-auto flex w-full max-w-170 flex-1 flex-col px-5 pt-12">
        <Link
          href="/blog"
          className="-mx-3.5 inline-flex items-center gap-2 self-start rounded-xl px-3.5 py-2.5 text-accent text-sm transition-colors duration-fast ease-out hover:bg-background-hover"
        >
          {/* アイコンは行の中央に揃える。そのままだと文字より上にずれる */}
          <span className="flex h-[1lh] items-center">
            <IconArrowLeft className="size-4.5 shrink-0" />
          </span>
          記事一覧にもどる
        </Link>

        <article className="mt-6 flex flex-col">
          <header className="flex flex-col">
            <div className="relative flex aspect-[2/1] items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface">
              {meta.image ? (
                <Image
                  src={meta.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 42.5rem) 42.5rem, 100vw"
                  className="object-cover"
                />
              ) : (
                <span className="text-xs">画像</span>
              )}
            </div>

            <h1 className="mt-7 font-bold text-2xl text-foreground-strong leading-[1.4] md:text-[2rem]">
              {meta.title}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <p className="text-xs">
                {formatDate(meta.date)}
                <span className="ml-2">{meta.readingMinutes} min</span>
              </p>
              <Tag>{meta.topic}</Tag>
            </div>
          </header>

          <div className="mt-12">
            <TableOfContents items={toc} />
          </div>

          <div className="prose mt-10">{content}</div>
        </article>

        <hr className="mt-14 border-line" />

        <div className="mt-8 flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-3">
            <ShareButton title={meta.title} slug={meta.slug} />
            <a
              href={`${CONTENT_REPO_EDIT_BASE}/${meta.slug}.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-line px-4 py-2.25 text-foreground-strong text-xs transition-colors duration-fast ease-out hover:bg-surface-hover"
            >
              この記事を編集する
            </a>
          </div>

          <AuthorCard />
          <PostNav newer={post.newer} older={post.older} />
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
