"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IconX } from "@/components/icons";

/** 本文の幅いっぱいには広げず、読みやすい大きさに抑える */
const MAX_WIDTH = 420;

/**
 * 本文中の画像。width/height は rehype-image-size が実寸を入れる。
 * クリックで原寸に近い大きさまで拡大する。
 */
export function PostImage({
  src,
  alt,
  width,
  height,
}: {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    document.addEventListener("keydown", onKeyDown);

    // 背後の記事がスクロールしないようにする
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [zoomed]);

  if (!src) return null;

  if (!width || !height) {
    // biome-ignore lint/performance/noImgElement: 実寸が取れない画像のフォールバック
    return <img src={src} alt={alt ?? ""} className="rounded-xl" />;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setZoomed(true)}
        aria-label={alt ? `${alt}を拡大する` : "画像を拡大する"}
        className="block cursor-zoom-in transition-opacity duration-fast ease-out hover:opacity-85"
        style={{ maxWidth: Math.min(width, MAX_WIDTH) }}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          width={width}
          height={height}
          sizes={`${MAX_WIDTH}px`}
          className="h-auto w-full rounded-xl"
        />
      </button>

      {zoomed && (
        <dialog
          open
          aria-label={alt || "拡大画像"}
          className="fixed inset-0 z-50 flex size-full max-h-full max-w-full items-center justify-center bg-background/95 p-4"
        >
          {/* 画像の外どこを押しても閉じる。Escape でも閉じられる */}
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="閉じる"
            className="absolute inset-0 cursor-zoom-out"
          />
          <Image
            src={src}
            alt={alt ?? ""}
            width={width}
            height={height}
            sizes="100vw"
            className="pointer-events-none relative max-h-full w-auto object-contain"
          />
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="閉じる"
            className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-surface text-foreground-strong transition-colors duration-fast ease-out hover:bg-surface-hover"
          >
            <IconX className="size-4.5" />
          </button>
        </dialog>
      )}
    </>
  );
}
