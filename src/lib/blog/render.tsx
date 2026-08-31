import type { Root } from "hast";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { rehypeExtractToc, type TocItem } from "./rehype-extract-toc";

export async function renderMarkdown(body: string) {
  const toc: TocItem[] = [];

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    // note から移してきた記事は改行が意図的なので保つ
    .use(remarkBreaks)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeExtractToc, toc)
    .use(rehypePrettyCode, {
      theme: "github-dark-dimmed",
      // 背景はサイトのトークン（--color-code-surface）に合わせる
      keepBackground: false,
      defaultLang: "plaintext",
    });

  const tree = (await processor.run(processor.parse(body))) as Root;
  const content = toJsxRuntime(tree, { Fragment, jsx, jsxs });

  return { content, toc };
}
