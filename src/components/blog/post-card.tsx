import Image from "next/image";
import { SoundLink } from "@/components/ui/sound-link";
import { Tag } from "@/components/ui/tag";
import type { PostMeta } from "@/lib/blog";

export function formatDate(date: string) {
  return date.replaceAll("-", ".");
}

/** 3 カラム → 2 カラム → 1 カラムで切り替わる一覧に合わせる */
const CARD_SIZES = "(min-width: 64rem) 24rem, (min-width: 48rem) 50vw, 100vw";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <SoundLink
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-3 active:scale-99"
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-surface">
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            fill
            sizes={CARD_SIZES}
            /*
             * 枠は動かさず中の画像だけ寄る。はみ出しは overflow で切る。
             * 序盤で一気に寄ってから減速しきる ease-settle にして、
             * 止まる瞬間に速度が残らないようにする（急に止まって見えない）
             */
            className="object-cover transition-transform duration-1000 ease-settle group-hover:scale-109"
          />
        ) : (
          <span className="text-xs">画像</span>
        )}
      </div>

      <p className="text-xs">
        {formatDate(post.date)}
        <span className="ml-2">{post.readingMinutes} min</span>
      </p>

      <h2 className="font-bold text-[1.0625rem] text-foreground-strong leading-[1.55] transition-colors duration-fast ease-out group-hover:text-accent">
        {post.title}
      </h2>

      <div className="flex gap-2">
        <Tag>{post.topic}</Tag>
      </div>
    </SoundLink>
  );
}
