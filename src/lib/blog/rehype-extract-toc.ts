import type { Element, Root } from "hast";
import { toString as hastToString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

export type TocItem = {
  id: string;
  text: string;
  depth: 2 | 3;
};

/**
 * rehype-slug が付けた id を使ってもくじを組み立てる。
 * rehype-slug より後に置くこと。
 */
export function rehypeExtractToc(toc: TocItem[]) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      const depth =
        node.tagName === "h2" ? 2 : node.tagName === "h3" ? 3 : null;
      if (depth === null) return;

      const id = node.properties?.id;
      if (typeof id !== "string") return;

      toc.push({ id, text: hastToString(node), depth });
    });
  };
}
