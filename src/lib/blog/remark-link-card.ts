import type { Paragraph, Root } from "mdast";
import { visit } from "unist-util-visit";

/**
 * カードに出す内容。取得は実行時に行わず content/blog/_links.json から引く。
 * リンク先が消えても記事から内容が欠けないようにするため。
 */
export type LinkCardData = {
  title: string;
  description?: string;
  site?: string;
  image?: string;
  /** X の投稿など、本文そのものを引用として見せたいとき */
  quote?: string;
  author?: { name: string; handle?: string; avatar?: string };
  date?: string;
};

export type LinkCardMap = Record<string, LinkCardData>;

/** 段落が URL ひとつだけで出来ているならその URL を返す */
function soleUrl(node: Paragraph): string | null {
  const children = node.children.filter(
    (c) => !(c.type === "text" && c.value.trim() === ""),
  );
  if (children.length !== 1) return null;

  const [child] = children;

  // 自動リンク（<url> や素の URL が link 化されたもの）
  if (child.type === "link" && child.children.length === 1) {
    const [inner] = child.children;
    return inner.type === "text" && inner.value.trim() === child.url
      ? child.url
      : null;
  }

  if (child.type === "text") {
    const value = child.value.trim();
    return /^https?:\/\/\S+$/.test(value) ? value : null;
  }

  return null;
}

/**
 * 1行に URL だけを書いた段落をカードに変える。
 * データが無い URL はふつうのリンクのまま残す。
 */
export function remarkLinkCard(links: LinkCardMap) {
  return (tree: Root) => {
    visit(tree, "paragraph", (node: Paragraph, index, parent) => {
      if (!parent || index === undefined) return;

      const url = soleUrl(node);
      if (!url) return;

      const card = links[url];
      if (!card) return;

      // hName で rehype 側に渡し、レンダリング時に React コンポーネントへ差し替える
      node.data = {
        hName: "link-card",
        hProperties: { url, card: JSON.stringify(card) },
      };
      node.children = [];
    });
  };
}
