import { ProtectedImage } from "@/components/ProtectedImage";

export function Avatar({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <ProtectedImage
      src="/na.webp"
      alt="nkoji"
      width={256}
      height={256}
      className={`rounded-full ${className ?? ""}`}
      style={style}
    />
  );
}
