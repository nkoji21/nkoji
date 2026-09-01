import {
  BrandDiscord,
  BrandGitHub,
  BrandInstagram,
  BrandVRChat,
  BrandX,
} from "@/components/icons/brand";

type SocialLink = {
  label: string;
  href: string;
  icon: (props: { className?: string }) => React.JSX.Element;
  isWide?: boolean;
};

/** メールは含めない。連絡手段は Contact に一本化している */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/nkoji21", icon: BrandGitHub },
  { label: "X", href: "https://x.com/nkoji21", icon: BrandX },
  {
    label: "Discord",
    href: "https://discord.com/users/nkoji21",
    icon: BrandDiscord,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nkoji21",
    icon: BrandInstagram,
  },
  {
    label: "VRChat",
    href: "https://vrchat.com/home/user/nkoji21",
    icon: BrandVRChat,
    isWide: true,
  },
];

export function SocialTiles() {
  return (
    <ul className="anim-stagger grid grid-cols-2 gap-2.5 md:grid-cols-5 md:gap-3">
      {SOCIAL_LINKS.map(({ label, href, icon: Icon, isWide }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-16 items-center justify-center gap-3 rounded-2xl border border-line bg-surface transition-[background-color,transform] duration-slow ease-out hover:bg-surface-hover active:scale-97 md:h-19"
          >
            <Icon className={isWide ? "w-11" : "size-6"} />
            <span className="text-sm">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
