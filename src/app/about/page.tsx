import type { Metadata } from "next";
import { IconArrowUpRight } from "@/components/icons";
import { SiteFooter } from "@/components/layout/site-footer";
import { SocialTiles } from "@/components/layout/social-links";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "デザインが好きなソフトウェアエンジニア。Webを中心にプロダクトをつくっています。",
};

const SKILLS = [
  "フロントエンドを中心としたWebプロダクト開発",
  "UIデザイン・デザインシステムの設計と実装",
  "UXリサーチからユーザー体験・要件の整理まで",
];

/** 重要度順。時系列ではない */
const ACTIVITIES = [
  {
    name: "Yamada UI",
    role: "OSS Maintainer",
    href: "https://yamada-ui.com/ja/docs/community",
  },
  {
    name: "42 Tokyo",
    role: "Student · 2025.04–",
    href: "https://42tokyo.jp/",
  },
  {
    name: "東京デザインテクノロジーセンター専門学校",
    role: "Student · 2023.04–",
    href: "https://www.tech.ac.jp/",
  },
  {
    name: "InTech",
    role: "Founder · 2024.08 – 2025.04",
    href: "https://intech-site.vercel.app/",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-300 flex-1 px-5 pt-10 md:pt-16">
        <h1 className="font-display text-2xl text-foreground-strong md:text-3xl">
          Hi, I&apos;m Naoki Kojima.
        </h1>

        <div className="mt-6 flex max-w-200 flex-col gap-4 md:mt-8 md:text-lg">
          <p>デザインが好きなソフトウェアエンジニアです！</p>
          <p>Webを中心に、さまざまなプロダクトをつくっています。</p>
          <p>
            使う人にとって心地よく、「また使いたい」と思える体験をつくることを大切にしています。
          </p>
        </div>

        <div className="mt-14 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-16">
          <section>
            <SectionHeading eyebrow="できること">Skills</SectionHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="flex gap-2.5 text-sm leading-relaxed md:text-base"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-[1lh] shrink-0 items-center"
                  >
                    <span className="size-1.5 rounded-full bg-accent" />
                  </span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeading eyebrow="いるところ">Activities</SectionHeading>
            <ul className="mt-3 flex flex-col gap-1">
              {ACTIVITIES.map(({ name, role, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-mx-3 group flex flex-col gap-0.5 rounded-xl px-3 py-2 transition-colors duration-fast ease-out hover:bg-background-hover"
                  >
                    {/* アイコンは inline で置く。flex にすると長い名前が折り返せない */}
                    <span className="font-bold text-foreground-strong text-sm md:text-base">
                      {name}
                      <IconArrowUpRight className="ml-1.5 inline size-3.5 align-middle text-accent transition-transform duration-fast ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-xs">{role}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-10 md:mt-12">
          <SectionHeading eyebrow="つながる">Socials</SectionHeading>
          <div className="mt-5">
            <SocialTiles />
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  );
}
