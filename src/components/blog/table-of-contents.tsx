"use client";

import { useId, useState } from "react";
import { IconCaretDown } from "@/components/icons";
import type { TocItem } from "@/lib/blog";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(true);
  const listId = useId();

  if (items.length === 0) return null;

  return (
    <nav aria-label="もくじ" className="rounded-2xl bg-surface px-6 py-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={listId}
        className="-mx-2 flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors duration-fast ease-out hover:bg-surface-hover"
      >
        <span className="font-bold text-accent text-xs tracking-[0.16em]">
          もくじ
        </span>
        <IconCaretDown
          className={`size-4 shrink-0 text-accent transition-transform duration-fast ease-out ${open ? "" : "-rotate-90"}`}
        />
      </button>

      {open ? (
        <ul id={listId} className="mt-3 flex flex-col gap-1">
          {items.map((item) => (
            <li key={item.id} className="text-sm">
              <a
                href={`#${item.id}`}
                className="-mx-2 flex items-center gap-2.5 rounded-lg px-2 py-1 text-accent transition-colors duration-fast ease-out hover:bg-surface-hover"
              >
                <span
                  aria-hidden="true"
                  className="size-1.25 shrink-0 rounded-full bg-accent"
                />
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}
