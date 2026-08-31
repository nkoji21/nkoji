import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { type Frontmatter, frontmatterSchema, type PostMeta } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/** 日本語は空白で区切られないので単語数ではなく文字数で見積もる */
const CHARS_PER_MINUTE = 500;

type RawPost = {
  slug: string;
  frontmatter: Frontmatter;
  body: string;
};

function readingMinutes(body: string) {
  return Math.max(1, Math.round(body.length / CHARS_PER_MINUTE));
}

function toMeta({ slug, frontmatter, body }: RawPost): PostMeta {
  return { ...frontmatter, slug, readingMinutes: readingMinutes(body) };
}

async function readPost(fileName: string): Promise<RawPost> {
  const slug = fileName.replace(/\.md$/, "");
  const source = await readFile(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(source);

  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `content/blog/${fileName} の frontmatter が不正です:\n${JSON.stringify(parsed.error.issues, null, 2)}`,
    );
  }

  return { slug, frontmatter: parsed.data, body: content };
}

async function readAllPosts(): Promise<RawPost[]> {
  const entries = await readdir(CONTENT_DIR).catch(() => []);
  const posts = await Promise.all(
    entries.filter((f) => f.endsWith(".md")).map(readPost),
  );

  return posts
    .filter(
      (p) => process.env.NODE_ENV === "development" || !p.frontmatter.draft,
    )
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export async function getAllPostMeta(): Promise<PostMeta[]> {
  return (await readAllPosts()).map(toMeta);
}

export async function getPost(slug: string) {
  const posts = await readAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  return {
    meta: toMeta(posts[index]),
    body: posts[index].body,
    // 日付降順なので、次に新しい記事が前・古い記事が後ろに来る
    newer: posts[index - 1] ? toMeta(posts[index - 1]) : null,
    older: posts[index + 1] ? toMeta(posts[index + 1]) : null,
  };
}

export type { PostMeta, Frontmatter };
export type { TocItem } from "./rehype-extract-toc";
