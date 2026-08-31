import type { TocItem } from "@/lib/blog";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="もくじ"
      className="flex flex-col gap-3 rounded-2xl bg-surface px-6 py-5"
    >
      <p className="font-bold text-accent text-xs tracking-[0.16em]">もくじ</p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.depth === 3 ? "pl-5 text-xs" : "text-sm"}
          >
            <a
              href={`#${item.id}`}
              className="flex items-center gap-2.5 text-accent hover:underline"
            >
              <span
                aria-hidden="true"
                className={`shrink-0 rounded-full bg-accent ${item.depth === 3 ? "size-1" : "size-1.25"}`}
              />
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
