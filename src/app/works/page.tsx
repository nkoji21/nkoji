import type { Metadata } from "next";
import Image from "next/image";
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
    role: "業務委託 · ソフトウェアエンジニア",
    isOngoing: true,
    title: "テスト自動化プロダクトの立ち上げ開発",
    body: "立ち上げ初期のプロダクト開発に参加。抽象度の高いタスクを要件と前提から整理し、仕様そのものを検討したうえで実装しています。非同期で進むチームなので、決定の経緯が後から追える形で残すことも意識しています。",
    tags: ["TypeScript", "Next.js"],
  },
  {
    period: "2026.02 –",
    company: "株式会社StepAI",
    role: "業務委託 · フロントエンド / デザイン",
    isOngoing: true,
    title: "音声AIプロダクトのフロントエンド開発",
    body: "Next.js と TypeScript でフロントエンド全体を設計・実装しています。Figma でデザインシステムを構築し、Lean Canvas や Jobs To Be Done を使った UX リサーチ、CI/CD の整備まで担当しました。",
    tags: ["TypeScript", "Next.js", "Figma", "GitHub Actions"],
  },
  {
    period: "2025.12",
    role: "受託 · グラフィックデザイン",
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
    role: "インターン · バックエンド",
    isOngoing: false,
    title: "建築業界向け LLM チャットアプリケーション",
    body: "BtoB 向け LLM チャットアプリのバックエンドを担当。Go と Python で API を設計・実装し、表形式のデータをエージェントが扱いやすい形に整える仕組みをつくりました。",
    tags: ["Go", "Python"],
  },
  {
    period: "2025.03 – 2025.10",
    company: "株式会社オスリー",
    role: "インターン · フロントエンド",
    isOngoing: false,
    title: "CtoC マッチングアプリ",
    body: "React でフロントエンド開発を担当。楽観的更新などで操作後の待ち時間をなくし、ユーザーの行動ログを見ながら改善を重ねました。",
    tags: ["React", "TypeScript"],
  },
];

export default function WorksPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-300 flex-1 px-5 pt-10 md:pt-16">
        <SectionHeading as="h1" eyebrow="やってきたこと">
          Works
        </SectionHeading>

        <ul className="mt-8 md:mt-10">
          {WORKS.map(
            ({
              period,
              company,
              role,
              isOngoing,
              title,
              body,
              tags,
              image,
            }) => (
              <li
                key={title}
                className="border-line border-t py-8 first:border-t-0 first:pt-0 md:grid md:grid-cols-[15rem_1fr] md:gap-12 md:py-9"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-foreground-strong text-sm">
                      {period}
                    </span>
                    {isOngoing ? (
                      <span className="rounded-xl bg-accent px-2.5 py-0.5 text-on-accent text-xs">
                        継続中
                      </span>
                    ) : null}
                  </div>
                  <span className="text-xs">
                    {company ? `${company} · ` : ""}
                    {role}
                  </span>
                </div>

                <div className="mt-3 flex flex-col gap-3 md:mt-0">
                  <h2 className="font-bold text-foreground-strong md:text-lg">
                    {title}
                  </h2>
                  <p className="text-sm leading-relaxed">{body}</p>
                  <ul className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>
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
