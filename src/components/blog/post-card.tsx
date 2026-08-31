import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import type { PostMeta } from "@/lib/blog";

export function formatDate(date: string) {
  return date.replaceAll("-", ".");
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-3">
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-surface transition-transform duration-base ease-out group-hover:-translate-y-1">
        {post.image ? (
          // biome-ignore lint/performance/noImgElement: 記事画像の最適化は後続の PR で行う
          <img
            src={post.image}
            alt=""
            className="size-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-xs">画像</span>
        )}
      </div>

      <p className="text-xs">
        {formatDate(post.date)}
        <span className="ml-2">{post.readingMinutes} min</span>
      </p>

      <h2 className="font-bold text-[1.0625rem] text-foreground-strong leading-[1.55] group-hover:text-accent">
        {post.title}
      </h2>

      <div className="flex gap-2">
        <Tag>{post.topic}</Tag>
      </div>
    </Link>
  );
}
