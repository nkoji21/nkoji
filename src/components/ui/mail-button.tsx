"use client";

import { IconEnvelope } from "@/components/icons";

/**
 * アドレスを静的な HTML に残さないため、クリック時に組み立てる。
 * mailto: を href に書くとスパムボットに収集されるため。
 */
const USER = "nka21dev";
const DOMAIN = "gmail.com";

export function MailButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = `mailto:${USER}@${DOMAIN}`;
      }}
      className="inline-flex w-full items-center justify-center gap-3.5 rounded-xl bg-accent py-4 font-bold text-on-accent transition-[background-color,transform] duration-fast ease-out hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0 active:scale-97"
    >
      <IconEnvelope className="size-5.5" />
      メールで連絡する
    </button>
  );
}
