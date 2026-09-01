"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { playSound } from "@/lib/sound";

/**
 * クリック音が鳴り、ページを切り替えるときに前後をつなぐ Link。
 * 遷移する要素はこれを使い、音と繋ぎの有無を各所で判断しなくて済むようにする。
 *
 * 繋ぎはブラウザの View Transition に任せる。React が古いページを
 * 即座に消してしまうので、CSS だけでは「出ていく」動きを作れないため。
 * 実際の見た目は globals.css の ::view-transition-* 側で定義する。
 */
export function SoundLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  const router = useRouter();

  return (
    <Link
      {...props}
      onClick={(event) => {
        playSound("click");
        onClick?.(event);

        const href = typeof props.href === "string" ? props.href : null;

        // 別タブ・修飾キー・外部リンクなど、既定の挙動に任せるものは触らない
        if (
          event.defaultPrevented ||
          !href ||
          !href.startsWith("/") ||
          props.target === "_blank" ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }

        // 未対応のブラウザや、動きを減らす設定のときは素の遷移に任せる
        if (
          !document.startViewTransition ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          return;
        }

        event.preventDefault();
        document.startViewTransition(() => {
          router.push(href);
        });
      }}
    />
  );
}
