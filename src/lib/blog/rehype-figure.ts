import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

/**
 * 画像だけの段落を figure にして、alt をキャプションとして見せる。
 * Markdown には画像の説明を書く場所が alt しかないため、
 * 記事を素の .md に保ったままキャプションを出せるようにする。
 */
export function rehypeFigure() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "p" || !parent || index === undefined) return;

      const children = node.children.filter(
        (c) => !(c.type === "text" && c.value.trim() === ""),
      );
      if (children.length !== 1) return;

      const [img] = children;
      if (img.type !== "element" || img.tagName !== "img") return;

      const alt =
        typeof img.properties?.alt === "string" ? img.properties.alt : "";

      parent.children[index] = {
        type: "element",
        tagName: "figure",
        properties: {},
        children: alt
          ? [
              img,
              {
                type: "element",
                tagName: "figcaption",
                properties: {},
                children: [{ type: "text", value: alt }],
              },
            ]
          : [img],
      };
    });
  };
}
