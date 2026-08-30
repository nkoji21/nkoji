import { IconSpeakerHigh, IconTranslate } from "@/components/icons";

// TODO: 見た目のみ。切り替えの実装は後続の PR で行う
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
