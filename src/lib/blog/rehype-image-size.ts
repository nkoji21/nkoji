import { readFileSync } from "node:fs";
import path from "node:path";
import type { Element, Root } from "hast";
import { imageSize } from "image-size";
import { visit } from "unist-util-visit";

const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * public 配下の画像から実寸を読んで width/height を付ける。
 * next/image がレイアウトシフト無しに出せるようにするため、
 * 記事側に画像サイズを書かせずに済ませる。
 */
export function rehypeImageSize() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") return;

      const src = node.properties?.src;
      if (typeof src !== "string" || !src.startsWith("/")) return;

      try {
        const { width, height } = imageSize(
          readFileSync(path.join(PUBLIC_DIR, src)),
        );
        node.properties.width = width;
        node.properties.height = height;
      } catch {
        // 読めなければ素の img のまま出す
      }
    });
  };
}
