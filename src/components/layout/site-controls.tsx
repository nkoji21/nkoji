import { IconSpeakerHigh, IconTranslate } from "@/components/icons";

/**
 * サウンドと言語の切り替え。
 * この PR では見た目だけを置き、実際の切り替えは後続の PR で実装する。
 */
export function SiteControls({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      <button
        type="button"
        aria-label="効果音を切り替える"
        className="text-foreground transition-colors duration-fast ease-out hover:text-accent"
      >
        <IconSpeakerHigh className="size-5.5" />
      </button>
      <button
        type="button"
        aria-label="言語を切り替える"
        className="text-foreground transition-colors duration-fast ease-out hover:text-accent"
      >
        <IconTranslate className="size-5.5" />
      </button>
    </div>
  );
}
