import Image from "next/image";

/**
 * 本文中の画像。width/height は rehype-image-size が実寸を入れる。
 * 実寸が取れなかったときは素の img にフォールバックする。
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
  if (!src) return null;

  if (!width || !height) {
    // biome-ignore lint/performance/noImgElement: 実寸が取れない画像のフォールバック
    return <img src={src} alt={alt ?? ""} className="w-full rounded-xl" />;
  }

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      sizes="(min-width: 42.5rem) 42.5rem, 100vw"
      className="h-auto w-full rounded-xl"
    />
  );
}
