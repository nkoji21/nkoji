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
      <button
        type="button"
        className="absolute inset-0 z-10"
        onContextMenu={handleContextMenu}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
