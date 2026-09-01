import type { MetadataRoute } from "next";
import { getAllPostMeta } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

/** 記事以外の固定ページ。記事と違って更新日を持たないので lastModified は付けない */
const STATIC_PATHS = ["/", "/about", "/activity", "/blog", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 下書きは getAllPostMeta が本番で除いてくれる
  const posts = await getAllPostMeta();

  return [
    ...STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
