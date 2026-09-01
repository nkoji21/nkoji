import type { Metadata } from "next";
import Image from "next/image";
import { IconArrowUpRight } from "@/components/icons";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";

export const metadata: Metadata = {
  title: "Works | nkoji",
  description: "業務委託・インターンで携わったプロダクト開発。",
};

/** プロダクト名は出さない（契約で委託業務として特定されているため） */
const WORKS = [
  {
    period: "2026.06 –",
    company: "株式会社Autest",
    companyHref: "https://www.autest.co.jp/",
    role: "業務委託 · ソフトウェアエンジニア",
    isOngoing: true,
    title: "テスト自動化プロダクトの立ち上げ開発",
    body: "立ち上げ初期のプロダクト開発に参加。抽象度の高いタスクを要件と前提から整理し、仕様そのものを検討したうえで実装しています。非同期で進むチームなので、決定の経緯が後から追える形で残すことも意識しています。",
    tags: ["TypeScript", "Next.js"],
  },
  {
    period: "2026.02 –",
    company: "株式会社StepAI",
    companyHref: "https://www.stepai.co.jp/",
    role: "業務委託 · フロントエンド / デザイン",
    isOngoing: true,
    title: "音声AIプロダクトのフロントエンド開発",
    body: "Next.js と TypeScript でフロントエンド全体を設計・実装しています。Figma でデザインシステムを構築し、Lean Canvas や Jobs To Be Done を使った UX リサーチ、CI/CD の整備まで担当しました。",
    tags: ["TypeScript", "Next.js", "Figma", "GitHub Actions"],
  },
  {
    period: "2025.12",
    company: "個人からの受託",
    role: "グラフィックデザイン",
    isOngoing: false,
    title: "麻雀アプリの OGP 画像デザイン",
    body: "対局結果を SNS でシェアするための OGP 画像をデザイン。タイムラインの小さな表示でも順位とスコアが一目で分かるよう、順位ごとに配色を変えて情報に強弱をつけました。",
    tags: ["Figma"],
    image: {
      src: "/works/mahjong-ogp.webp",
      alt: "対局結果の OGP 画像。1位から4位までの順位・スコア・増減が並んでいる",
    },
  },
  {
    period: "2025.10 – 2026.02",
    company: "燈株式会社",
    companyHref: "https://akariinc.co.jp/",
    role: "インターン · バックエンド",
    isOngoing: false,
    title: "建築業界向け LLM チャットアプリケーション",
    body: "BtoB 向け LLM チャットアプリのバックエンドを担当。Go と Python で API を設計・実装し、表形式のデータをエージェントが扱いやすい形に整える仕組みをつくりました。",
    tags: ["Go", "Python"],
  },
  {
    period: "2025.03 – 2025.10",
    company: "株式会社オスリー",
    companyHref: "https://osuly.jp/",
    role: "インターン · フロントエンド",
    isOngoing: false,
    title: "CtoC マッチングアプリ",
    body: "React でフロントエンド開発を担当。楽観的更新などで操作後の待ち時間をなくし、ユーザーの行動ログを見ながら改善を重ねました。",
    tags: ["React", "TypeScript"],
  },
  {
    period: "2024.08 – 2025.06",
    company: "チームラボエンジニアリング",
    companyHref: "https://www.team-lab.com/",
    role: "アルバイト · ソリューションカタリスト",
    isOngoing: false,
    title: "ソリューションカタリストのアシスタント",
    body: "競合サービスのリサーチや提案資料の作成、Figma でのワイヤーフレーム制作を担当。現地に足を運んでのインタビューや、GAS での定型作業の自動化もしていました。コードを書く以外にもプロジェクトが前に進まなくなる理由があることを知った時期です。",
    tags: ["Figma", "GAS"],
  },
  {
    period: "2023.12 – 2024.06",
    company: "株式会社ウフル",
    companyHref: "https://uhuru.co.jp/",
    role: "インターン · フロントエンド",
    isOngoing: false,
    title: "DX プロダクトの 0→1 開発",
    body: "Next.js と Supabase で、立ち上げ段階のプロダクト開発を経験しました。メンターについてもらいながら、何もないところから形にしていく過程を一通り見られたのが大きかったです。",
    tags: ["Next.js", "Supabase"],
  },
  {
    period: "2023.08 – 2023.10",
    company: "株式会社メディロム",
    companyHref: "https://medirom.co.jp/",
    role: "インターン · Web開発",
    isOngoing: false,
    title: "はじめてのインターン",
    body: "専門学校1年の夏、まだ制作物が何もない状態で受け入れてもらった最初の会社です。Progate で基礎を学ぶところから始めて、Ruby on Rails で成果物をつくり発表まで見てもらいました。",
    tags: ["Ruby on Rails"],
  },
];

export default function WorksPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-190 flex-1 px-5 pt-10 md:pt-16">
        <SectionHeading as="h1" eyebrow="やってきたこと">
          Works
        </SectionHeading>

        <ul className="mt-8 md:mt-10">
          {WORKS.map(
            (
              {
                period,
                company,
                companyHref,
                role,
                isOngoing,
                title,
                body,
                tags,
                image,
              },
              index,
            ) => (
              <li key={title} className="flex gap-5">
                {/* 左のレール。ドットの位置は日付行の中心に合わせる */}
                <div
                  aria-hidden="true"
                  className="relative flex w-2 shrink-0 justify-center"
                >
                  <span
                    className={`absolute top-2 size-2.5 rounded-full ${
                      isOngoing
                        ? "bg-accent"
                        : "border-2 border-line bg-background"
                    }`}
                  />
                  {index < WORKS.length - 1 ? (
                    <span className="absolute top-6.5 bottom-0 w-px bg-line" />
                  ) : null}
                </div>

                <div
                  className={`flex flex-col gap-2 ${index === WORKS.length - 1 ? "" : "pb-10"}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-accent text-xs">
                      {period}
                    </span>
                    {isOngoing ? (
                      <span className="rounded-xl bg-accent px-2 py-0.5 text-on-accent text-xs">
                        継続中
                      </span>
                    ) : null}
                  </div>

                  {companyHref ? (
                    <a
                      href={companyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 self-start font-bold text-foreground-strong text-lg md:text-xl"
                    >
                      {company}
                      <IconArrowUpRight className="size-3.5 text-accent transition-transform duration-fast ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <p className="font-bold text-foreground-strong text-lg md:text-xl">
                      {company}
                    </p>
                  )}

                  <p className="text-xs">{role}</p>
                  <p className="font-bold text-foreground-strong text-sm">
                    {title}
                  </p>
                  <p className="text-sm leading-relaxed">{body}</p>

                  {tags.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <li key={tag}>
                          <Tag>{tag}</Tag>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={630}
                      sizes="(min-width: 48rem) 28rem, 100vw"
                      className="mt-1 h-auto w-full max-w-112 rounded-xl border border-line"
                    />
                  ) : null}
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
      <SiteFooter />
    </>
  );
}
