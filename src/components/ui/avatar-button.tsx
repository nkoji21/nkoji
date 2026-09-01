"use client";

import { Avatar } from "@/components/ui/avatar";
import { playSound } from "@/lib/sound";

/**
 * 触れる・押せるアバター。
 * 遷移も開閉もしないが、トップの主役なので触ったら反応を返す。
 * ProtectedImage の中の要素はキーボードで辿れないので、
 * 反応の対象はこの button 自身に持たせる。
 */
export function AvatarButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => playSound("click")}
      aria-label="nkoji のアイコン"
      className={`anim-press rounded-full ${className ?? ""}`}
    >
      <Avatar className="size-full" />
    </button>
  );
}
