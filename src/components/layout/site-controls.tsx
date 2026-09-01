import {
  IconSpeakerHigh,
  IconSpeakerSlash,
  IconTranslate,
} from "@/components/icons";

const BUTTON_CLASS =
  "group rounded-xl p-2.5 text-foreground transition-colors duration-fast ease-out hover:bg-background-hover hover:text-accent";

// TODO: 見た目のみ。切り替えの実装は後続の PR で行う
export function SiteControls({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <button
        type="button"
        aria-label="効果音を切り替える"
        className={BUTTON_CLASS}
      >
        {/* ホバー中は切り替え後の状態を見せる */}
        <IconSpeakerHigh className="size-5.5 group-hover:hidden" />
        <IconSpeakerSlash className="hidden size-5.5 group-hover:block" />
      </button>
      <button
        type="button"
        aria-label="言語を切り替える"
        className={BUTTON_CLASS}
      >
        <IconTranslate className="size-5.5" />
      </button>
    </div>
  );
}
