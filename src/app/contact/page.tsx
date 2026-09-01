import type { Metadata } from "next";
import { BrandDiscord, BrandX } from "@/components/icons/brand";
import { SiteFooter } from "@/components/layout/site-footer";
import { Avatar } from "@/components/ui/avatar";
import { MailButton } from "@/components/ui/mail-button";

export const metadata: Metadata = {
  title: "Contact",
  description: "お仕事のご相談・お問い合わせはこちらから。",
};

const DM_CHANNELS = [
  { label: "X", href: "https://x.com/nkoji21", icon: BrandX },
  {
    label: "Discord",
    href: "https://discord.com/users/nkoji21",
    icon: BrandDiscord,
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-9 px-5 py-16">
        <Avatar className="size-37 md:size-63" />

        <div className="flex flex-col items-center gap-5">
          <MailButton />

          <div className="flex flex-col items-center gap-4">
            <p className="text-xs">DM でも受け付けています</p>
            <ul className="flex gap-3">
              {DM_CHANNELS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-28 items-center justify-center gap-2 rounded-xl border border-line transition-colors duration-fast ease-out hover:bg-surface-hover"
                  >
                    <Icon className="size-4.5" />
                    <span className="text-sm">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
