export const SITE_URL = "https://nkoji.me";

export const SITE_AUTHOR = {
  name: "Naoki Kojima",
  /** 文の途中で折り返らないよう、文ごとに分けて改行する */
  bio: [
    "デザインが好きなソフトウェアエンジニア。",
    "Webを中心にプロダクトをつくっています。",
  ],
} as const;

/** 記事の「編集を提案」リンク先 */
export const CONTENT_REPO_EDIT_BASE =
  "https://github.com/nkoji21/nkoji/edit/main/content/blog";
