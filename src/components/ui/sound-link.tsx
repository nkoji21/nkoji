"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { playSound } from "@/lib/sound";

/** globals.css の --duration-slow と揃える */
const LEAVE_MS = 600;

/**
 * クリック音が鳴り、ページを離れるときに下へ流して消える Link。
 * 遷移する要素はこれを使い、音と繋ぎの有無を各所で判断しなくて済むようにする。
 *
 * 退場は body にクラスを付けて自分で動かし、終わってから遷移する。
 * View Transition に任せると、スナップショットを撮る関数が同期で呼ばれる一方
 * router.push は非同期なので、ページが変わる前に繋ぎが終わってしまう。
 */
export function SoundLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const pathname = usePathname();

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

        /*
         * いま開いているページ自身へのリンクは、退場させずその場に留める。
         * パスが変わらないと遷移先の LeaveReset が動かないので、
         * 消えたまま戻ってこなくなるため。
         * クエリやハッシュが付いていれば移動が起きるので、そのまま通す。
         */
        if (href === pathname) {
          event.preventDefault();
          return;
        }

        // 動きを減らす設定のときは、待たせずそのまま遷移する
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return;
        }

        event.preventDefault();
        document.documentElement.dataset.leaving = "true";
        window.setTimeout(() => router.push(href), LEAVE_MS);
        // 属性は遷移先の LeaveReset が外す。
        // ここで消すと、新しいページが描かれる前に古い本文が戻ってしまう
      }}
    />
  );
}
