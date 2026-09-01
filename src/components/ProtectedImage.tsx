"use client";

import Image, { type ImageProps } from "next/image";

interface ProtectedImageProps extends Omit<ImageProps, "draggable"> {}

export function ProtectedImage({ className, ...props }: ProtectedImageProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      <Image
        {...props}
        className="block select-none [-webkit-touch-callout:none]"
        draggable={false}
      />
      {/*
        右クリックを受け止めるためだけの層。押せる要素ではないので div にする。
        button にすると、この画像を button で包んだときに入れ子になって
        HTML として不正になる（hydration エラー）
      */}
      <div
        className="absolute inset-0 z-10"
        onContextMenu={handleContextMenu}
        aria-hidden="true"
      />
    </div>
  );
}
