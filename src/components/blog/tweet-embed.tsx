"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    twttr?: { widgets: { load: (el?: HTMLElement) => void } };
  }
}

/**
 * X 公式の埋め込み。
 * https://publish.x.com が出すのと同じ blockquote + widgets.js。
 */
export function TweetEmbed({ url }: { url: string }) {
  useEffect(() => {
    // ページ遷移で戻ってきたときは script が既に読み込み済みなので、
    // 明示的に再描画させないと blockquote のまま残る
    window.twttr?.widgets.load();
  }, []);

  return (
    <div className="flex justify-center">
      <blockquote className="twitter-tweet" data-lang="ja" data-dnt="true">
        <a href={url}>{url}</a>
      </blockquote>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
