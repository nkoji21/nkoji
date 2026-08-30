import type { Metadata } from "next";
import { IconArrowUpRight } from "@/components/icons";
import { SiteFooter } from "@/components/layout/site-footer";
import { SocialTiles } from "@/components/layout/social-links";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "About | nkoji",
  description:
    "デザインが好きなソフトウェアエンジニア。Webを中心にプロダクトをつくっています。",
};

/** 頼める仕事の単位で書く。使っている技術の一覧は GitHub の README に任せる */
const SKILLS = [
  "フロントエンドを中心としたWebプロダクト開発",
  "UIデザイン・デザインシステムの設計と実装",
  "UXリサーチからユーザー体験・要件の整理まで",
];

/** 重要度順に並べる。時系列ではない */
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
];

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-300 flex-1 px-5 pt-10 pb-24 md:pt-16 md:pb-0">
        <h1 className="font-display text-2xl text-foreground-strong md:text-3xl">
          Hi, I&apos;m Naoki Kojima.
        </h1>

        {/* 3つの短い文なので、可読幅より「1文が1行に収まる」ことを優先する */}
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
                  {/* ドットとテキストで同じ行高を共有し、その中で中央に置く。
                      固定の margin だと文字サイズが変わったときにずれる */}
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
            <ul className="mt-5 flex flex-col gap-4">
              {ACTIVITIES.map(({ name, role, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex flex-col gap-0.5"
                  >
                    <span className="inline-flex items-center gap-1.5 font-bold text-foreground-strong text-sm md:text-base">
                      {name}
                      <IconArrowUpRight className="size-3.5 text-accent transition-transform duration-fast ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-xs">{role}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-14 md:mt-20">
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
