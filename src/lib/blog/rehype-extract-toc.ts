import type { Element, Root } from "hast";
import { toString as hastToString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

export type TocItem = {
  id: string;
  text: string;
};

/**
 * rehype-slug が付けた id を使ってもくじを組み立てる。
 * rehype-slug より後に置くこと。
 *
 * h2 だけを拾う。h3 まで入れると節の多い記事で本文の写しになってしまい、
 * 全体像を掴むというもくじの役割を果たさなくなるため。
 */
export function rehypeExtractToc(toc: TocItem[]) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2") return;

      const id = node.properties?.id;
      if (typeof id !== "string") return;

      toc.push({ id, text: hastToString(node) });
    });
  };
}
