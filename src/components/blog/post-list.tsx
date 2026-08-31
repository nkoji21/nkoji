"use client";

import { useMemo, useState } from "react";
import { PostCard } from "@/components/blog/post-card";
import { IconMagnifyingGlass } from "@/components/icons";
import { Dropdown, type DropdownOption } from "@/components/ui/dropdown";
import type { PostMeta } from "@/lib/blog";

const ALL = "all";

/** 出現順を保ったまま値ごとの件数を数える */
function countBy(posts: PostMeta[], pick: (p: PostMeta) => string) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    const key = pick(post);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function toOptions(
  counts: Map<string, number>,
  allLabel: string,
  total: number,
): DropdownOption[] {
  return [
    { value: ALL, label: allLabel, count: total },
    ...[...counts].map(([value, count]) => ({ value, label: value, count })),
  ];
}

export function PostList({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState(ALL);
  const [year, setYear] = useState(ALL);

  const topicOptions = useMemo(
    () =>
      toOptions(
        countBy(posts, (p) => p.topic),
        "すべてのトピック",
        posts.length,
      ),
    [posts],
  );

  const yearOptions = useMemo(
    () =>
      toOptions(
        countBy(posts, (p) => p.date.slice(0, 4)),
        "すべての年",
        posts.length,
      ),
    [posts],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (topic !== ALL && post.topic !== topic) return false;
      if (year !== ALL && !post.date.startsWith(year)) return false;
      if (q && !post.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [posts, query, topic, year]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <label className="flex h-11.5 items-center gap-2.5 rounded-xl border border-line bg-surface px-4.5 md:w-130">
          <IconMagnifyingGlass className="size-4.5 shrink-0 text-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="記事を検索"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground-strong outline-none placeholder:text-foreground"
          />
        </label>

        <div className="flex gap-3">
          <Dropdown
            label="トピックで絞り込む"
            options={topicOptions}
            value={topic}
            onChange={setTopic}
            className="flex-1 md:w-45"
          />
          <Dropdown
            label="年で絞り込む"
            options={yearOptions}
            value={year}
            onChange={setYear}
            className="flex-1 md:w-40"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm">
          条件に合う記事が見つかりませんでした
        </p>
      ) : (
        <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
