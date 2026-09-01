"use client";

import { IconSpeakerHigh, IconSpeakerSlash } from "@/components/icons";
import { useSound } from "@/lib/sound";

const BUTTON_CLASS =
  "group rounded-xl p-2.5 text-foreground transition-colors duration-fast ease-out hover:bg-background-hover hover:text-accent active:scale-97";

export function SiteControls({ className }: { className?: string }) {
  const { isEnabled, toggle } = useSound();

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <button
        type="button"
        onClick={toggle}
        data-sound-toggle
        aria-label="効果音を切り替える"
        aria-pressed={isEnabled}
        className={BUTTON_CLASS}
      >
        {isEnabled ? (
          <IconSpeakerHigh className="size-5.5" />
        ) : (
          <IconSpeakerSlash className="size-5.5" />
        )}
      </button>
    </div>
  );
}
