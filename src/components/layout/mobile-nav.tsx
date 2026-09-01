"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  IconCaretDown,
  IconGear,
  IconPeace,
  IconSpeakerHigh,
  IconSpeakerSlash,
} from "@/components/icons";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { SoundLink } from "@/components/ui/sound-link";
import { playSound, useSound } from "@/lib/sound";

/**
 * 下部中央に置くのは、左右どちらの親指からも等距離にするため。
 * 設定を畳んでいるのは、項目が増えてもページ移動が上に押し上げられないようにするため。
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const { isEnabled: isSoundEnabled, toggle: toggleSound } = useSound();

  // 暗転レイヤーを置かない設計なので、外側タップの検知は自前で持つ
  useEffect(() => {
    if (!isOpen) return;

    const dismiss = () => {
      playSound("click");
      setIsOpen(false);
      setIsSettingsOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) dismiss();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const open = () => {
    playSound("click");
    setIsOpen(true);
  };

  const close = () => {
    playSound("click");
    setIsOpen(false);
    setIsSettingsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 bottom-6 z-50 flex justify-center md:hidden"
    >
      {isOpen ? (
        <div
          id={panelId}
          className="w-67 origin-bottom rounded-3xl bg-code-surface/70 p-2 text-surface shadow-lg backdrop-blur-xl anim-pop-in"
        >
          <ul>
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <SoundLink
                  href={href}
                  onClick={() => {
                    setIsOpen(false);
                    setIsSettingsOpen(false);
                  }}
                  className="flex items-center justify-between rounded-xl px-3.5 py-3 transition-colors duration-fast ease-out hover:bg-white/10 active:scale-97"
                >
                  <span className="font-display text-lg">{label}</span>
                  <Icon className="size-5 opacity-70" />
                </SoundLink>
              </li>
            ))}
          </ul>

          <div className="my-1 border-white/15 border-t" />

          <button
            type="button"
            onClick={() => {
              playSound("click");
              setIsSettingsOpen((prev) => !prev);
            }}
            aria-expanded={isSettingsOpen}
            className="flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm opacity-70 transition-colors duration-fast ease-out hover:bg-white/10"
          >
            <span className="flex items-center gap-2.5">
              <IconGear className="size-4.5" />
              Settings
            </span>
            <IconCaretDown
              className={`size-4 transition-transform duration-fast ease-out ${
                isSettingsOpen ? "" : "-rotate-90"
              }`}
            />
          </button>

          {/*
            grid-template-rows を 0fr → 1fr にすると、高さが auto のまま遷移できる。
            height: auto は補間できないため
          */}
          <div
            className={`grid text-sm opacity-70 transition-[grid-template-rows] duration-base ease-out ${
              isSettingsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <button
                type="button"
                onClick={toggleSound}
                data-sound-toggle
                aria-pressed={isSoundEnabled}
                className="flex w-full items-center justify-between rounded-xl py-2.5 pr-3.5 pl-8.5 transition-colors duration-fast ease-out hover:bg-white/10 active:scale-97"
              >
                Sound
                {isSoundEnabled ? (
                  <IconSpeakerHigh className="size-4.5" />
                ) : (
                  <IconSpeakerSlash className="size-4.5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="メニューを閉じる"
            className="mt-1 flex w-full justify-center rounded-full bg-white/8 py-2.5 transition-[background-color,transform] duration-fast ease-out hover:bg-white/15 active:scale-97"
          >
            <IconCaretDown className="size-5 opacity-70" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={open}
          aria-expanded={false}
          aria-controls={panelId}
          className="anim-pop-in flex items-center gap-2.5 rounded-full bg-code-surface/60 py-3.5 pr-5 pl-5.5 text-surface shadow-md backdrop-blur-xl transition-transform duration-fast ease-out active:scale-96"
        >
          <span className="font-display text-base">menu</span>
          <IconPeace className="size-5.5" />
        </button>
      )}
    </div>
  );
}
