import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight, IconCaretRight } from "@/components/icons";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Activity",
  description: "仕事や学びなど、これまでやってきたことの記録。",
};

/** プロダクト名は出さない（契約で委託業務として特定されているため） */
const ACTIVITIES = [
  {
    period: "2026.06 –",
    name: "株式会社Autest",
    href: "https://www.autest.co.jp/",
    role: "業務委託 · ソフトウェアエンジニア",
    isOngoing: true,
    body: "テスト自動化プロダクトの立ち上げに参加しています。",
  },
  {
    period: "2026.03 –",
    name: "Yamada UI",
    href: "https://yamada-ui.com/ja/docs/community",
    role: "OSS · メンテナー",
    isOngoing: true,
    body: "OSS のメンテナーになりました。",
  },
  {
    period: "2026.02 – 2026.07",
    name: "株式会社StepAI",
    href: "https://www.stepai.co.jp/",
    role: "業務委託 · フロントエンド / デザイン",
    isOngoing: false,
    body: "音声AIプロダクトのフロントエンドをつくっていました。",
  },
  {
    period: "2025.12",
    name: "麻雀アプリの OGP 画像",
    role: "受託 · グラフィックデザイン",
    isOngoing: false,
    body: "対局結果をシェアするための OGP 画像をデザインしました。",
    image: {
      src: "/activity/mahjong-ogp.webp",
      alt: "対局結果の OGP 画像。1位から4位までの順位・スコア・増減が並んでいる",
    },
  },
  {
    period: "2025.10 – 2026.02",
    name: "燈株式会社",
    href: "https://akariinc.co.jp/",
    role: "インターン · バックエンド",
    isOngoing: false,
    body: "建築業界向け LLM チャットアプリのバックエンドを担当しました。",
  },
  {
    period: "2025.04 –",
    name: "42 Tokyo",
    href: "/blog/42tokyo-piscine",
    role: "学生",
    isOngoing: true,
    body: "1ヶ月間の入学試験 Piscine を経て入学しました。",
  },
  {
    period: "2025.03 – 2025.10",
    name: "株式会社オスリー",
    href: "https://osuly.jp/",
    role: "インターン · フロントエンド",
    isOngoing: false,
    body: "CtoC マッチングアプリのフロントエンドを担当しました。",
  },
  {
    period: "2024.08 – 2025.06",
    name: "チームラボエンジニアリング",
    href: "https://www.team-lab.com/",
    role: "アルバイト · ソリューションカタリスト",
    isOngoing: false,
    body: "競合リサーチや提案資料の作成を担当しました。",
  },
  {
    period: "2024.08 – 2025.04",
    name: "InTech",
    href: "https://intech-site.vercel.app/",
    role: "Founder",
    isOngoing: false,
    body: "専門学校でサークルを立ち上げました。",
  },
  {
    period: "2023.12 – 2024.06",
    name: "株式会社ウフル",
    href: "https://uhuru.co.jp/",
    role: "インターン · フロントエンド",
    isOngoing: false,
    body: "DX プロダクトの 0→1 開発を経験しました。",
  },
  {
    period: "2023.08 – 2023.10",
    name: "株式会社メディロム",
    href: "https://medirom.co.jp/",
    role: "インターン · Web開発",
    isOngoing: false,
    body: "はじめてのインターンでした。",
  },
  {
    period: "2023.04 –",
    name: "東京デザインテクノロジーセンター専門学校",
    href: "https://www.tech.ac.jp/",
    role: "UI/UX デザイナー専攻",
    isOngoing: true,
    body: "UI/UX デザインを専攻しています。",
  },
];

function isExternal(href: string) {
  return href.startsWith("http");
}

/** リンクがある項目はカード全体を押せるようにする */
function Card({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  const className = "mt-2 block rounded-2xl bg-surface px-5 py-5 md:px-5.5";

  if (!href) return <div className={className}>{children}</div>;

  const hoverClassName = `group ${className} transition-colors duration-fast ease-out hover:bg-surface-hover`;

  if (!isExternal(href)) {
    return (
      <Link href={href} className={hoverClassName}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={hoverClassName}
    >
      {children}
    </a>
  );
}

/** 年をまたぐものは開始年に置く */
function groupByYear(items: typeof ACTIVITIES) {
  const groups: { year: string; items: typeof ACTIVITIES }[] = [];
  for (const item of items) {
    const year = item.period.slice(0, 4);
    const last = groups.at(-1);
    if (last?.year === year) last.items.push(item);
    else groups.push({ year, items: [item] });
  }
  return groups;
}

export default function ActivityPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-190 flex-1 px-5 pt-10 md:pt-16">
        <SectionHeading as="h1" eyebrow="やってきたこと">
          Activity
        </SectionHeading>

        <div className="mt-8 flex flex-col gap-7 md:mt-10">
          {groupByYear(ACTIVITIES).map(({ year, items }) => (
            <section key={year}>
              <h2 className="font-bold text-foreground-strong text-sm tracking-wider">
                {year}
              </h2>

              <ul className="mt-3.5">
                {items.map(
                  (
                    { period, name, href, role, isOngoing, body, image },
                    index,
                  ) => (
                    <li key={name} className="flex gap-4">
                      {/* 左のレール。ドットは日付行に合わせる */}
                      <div
                        aria-hidden="true"
                        className="relative flex w-2 shrink-0 justify-center"
                      >
                        <span
                          className={`absolute top-1.5 size-2.5 rounded-full ${
                            isOngoing
                              ? "bg-accent"
                              : "border-2 border-line bg-background"
                          }`}
                        />
                        {index < items.length - 1 ? (
                          <span className="absolute top-6 bottom-0 w-px bg-line" />
                        ) : null}
                      </div>

                      <div
                        className={`min-w-0 flex-1 ${index === items.length - 1 ? "" : "pb-5"}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-accent text-xs">
                            {period}
                          </span>
                          {isOngoing ? (
                            <span className="rounded-xl bg-accent px-2 py-0.5 text-on-accent text-xs">
                              現在
                            </span>
                          ) : null}
                        </div>

                        <Card href={href}>
                          {/* アイコンは inline で置く。flex にすると長い名前が折り返せない */}
                          <p className="font-bold text-foreground-strong text-lg md:text-xl">
                            {name}
                            {href ? (
                              isExternal(href) ? (
                                <IconArrowUpRight className="ml-1.5 inline size-3.5 align-middle text-accent transition-transform duration-fast ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                              ) : (
                                <IconCaretRight className="ml-1.5 inline size-3.5 align-middle text-accent transition-transform duration-fast ease-out group-hover:translate-x-0.5" />
                              )
                            ) : null}
                          </p>
                          <p className="mt-2 text-xs">{role}</p>
                          <p className="mt-2 text-sm leading-relaxed">{body}</p>

                          {image ? (
                            <Image
                              src={image.src}
                              alt={image.alt}
                              width={1200}
                              height={630}
                              sizes="(min-width: 48rem) 28rem, 100vw"
                              className="mt-3 h-auto w-full max-w-112 rounded-xl border border-line"
                            />
                          ) : null}
                        </Card>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
