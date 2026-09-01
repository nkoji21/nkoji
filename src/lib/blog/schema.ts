import { z } from "zod";

/** YAML は引用符なしの 2026-08-28 を Date にするので、どちらで書かれても受ける */
const dateString = z
  .union([z.iso.date(), z.date()])
  .transform((v) => (typeof v === "string" ? v : v.toISOString().slice(0, 10)));

export const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: dateString,
  topic: z.string().min(1),
  draft: z.boolean().default(false),
  image: z.string().optional(),
  /** OGP と検索結果に出る 1 行。本文の冒頭は挨拶で始まりがちなので手で書く */
  description: z.string().min(1).optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export type PostMeta = Frontmatter & {
  slug: string;
  /** 一覧・記事ヘッダに出す読了時間（分） */
  readingMinutes: number;
};
