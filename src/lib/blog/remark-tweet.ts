import type { Paragraph, Root } from "mdast";
import { visit } from "unist-util-visit";

const TWEET_URL = /^https:\/\/(?:x|twitter)\.com\/[^/]+\/status\/\d+/;

/** 段落が URL ひとつだけで出来ているならその URL を返す */
function soleUrl(node: Paragraph): string | null {
  const children = node.children.filter(
    (c) => !(c.type === "text" && c.value.trim() === ""),
  );
  if (children.length !== 1) return null;

  const [child] = children;

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

/** 1行に X の投稿 URL だけを書いた段落を埋め込みに変える */
export function remarkTweet() {
  return (tree: Root) => {
    visit(tree, "paragraph", (node: Paragraph) => {
      const url = soleUrl(node);
      if (!url || !TWEET_URL.test(url)) return;

      node.data = { hName: "tweet-embed", hProperties: { url } };
      node.children = [];
    });
  };
}
