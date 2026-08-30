import {
  IconBriefcase,
  IconHouse,
  IconNotePencil,
  IconPaperPlane,
  IconUser,
} from "@/components/icons";

/**
 * サイト内のナビゲーション。全ページで同じ項目・同じ並びを出す。
 * 現在地の項目を消したり並べ替えたりすると、ページを移動するたびに
 * リンクの位置が動いて操作しづらくなるため。
 */
export const NAV_ITEMS = [
  { href: "/", label: "Home", icon: IconHouse },
  { href: "/about", label: "About", icon: IconUser },
  { href: "/works", label: "Works", icon: IconBriefcase },
  { href: "/blog", label: "Blog", icon: IconNotePencil },
  { href: "/contact", label: "Contact", icon: IconPaperPlane },
] as const;
