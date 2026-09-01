import {
  IconBriefcase,
  IconHouse,
  IconNotePencil,
  IconPaperPlane,
  IconUser,
} from "@/components/icons";

/** 全ページで同じ項目・同じ並びを保つ（現在地でも項目を消さない） */
export const NAV_ITEMS = [
  { href: "/", label: "Home", icon: IconHouse },
  { href: "/about", label: "About", icon: IconUser },
  { href: "/activity", label: "Activity", icon: IconBriefcase },
  { href: "/blog", label: "Blog", icon: IconNotePencil },
  { href: "/contact", label: "Contact", icon: IconPaperPlane },
] as const;
