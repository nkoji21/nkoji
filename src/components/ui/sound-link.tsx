"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { playSound } from "@/lib/sound";

/**
 * クリック音の鳴る Link。
 * ページ遷移する要素はこれを使い、音の有無を各所で判断しなくて済むようにする。
 */
export function SoundLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        playSound("click");
        onClick?.(event);
      }}
    />
  );
}
