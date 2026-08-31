import { BrandX } from "@/components/icons/brand";
import { SITE_URL } from "@/lib/site";

export function ShareButton({ title, slug }: { title: string; slug: string }) {
  const url = `${SITE_URL}/blog/${slug}`;
  const href = `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.25 text-foreground-strong text-xs transition-colors duration-fast ease-out hover:bg-surface-hover"
    >
      <BrandX className="size-4" />X でシェア
    </a>
  );
}
