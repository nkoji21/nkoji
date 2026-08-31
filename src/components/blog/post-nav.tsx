import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

function NavCard({
  post,
  label,
  align,
}: {
  post: PostMeta;
  label: string;
  align: "start" | "end";
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col gap-2 rounded-2xl border border-line px-5 py-4 transition-colors duration-fast ease-out hover:bg-surface-hover"
    >
      {/* 見出しだけ端に寄せる。タイトルは左揃えのまま */}
      <span
        className={`text-accent text-xs ${align === "end" ? "self-end" : ""}`}
      >
        {label}
      </span>
      <span className="text-foreground-strong text-sm">{post.title}</span>
    </Link>
  );
}

export function PostNav({
  newer,
  older,
}: {
  newer: PostMeta | null;
  older: PostMeta | null;
}) {
  if (!newer && !older) return null;

  return (
    <nav aria-label="前後の記事" className="grid gap-4 sm:grid-cols-2">
      {/* 片方しか無いときも位置を保つ */}
      {older ? (
        <NavCard post={older} label="← まえの記事" align="start" />
      ) : (
        <div />
      )}
      {newer && <NavCard post={newer} label="つぎの記事 →" align="end" />}
    </nav>
  );
}
