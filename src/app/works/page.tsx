import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";

export const metadata: Metadata = {
  title: "Works | nkoji",
  description: "業務委託・インターンで携わったプロダクト開発。",
};

/** 社名とプロダクト名は出さない（契約上の制約） */
const WORKS = [
  {
    period: "2026.06 –",
    role: "業務委託 · フロントエンド",
    isOngoing: true,
    title: "テスト自動化プロダクトの立ち上げ開発",
    body: "立ち上げ初期の開発に参加。抽象度の高いタスクを要件・前提・ユーザー体験から整理して具体化し、仕様を批判的に検討しながら実装しています。非同期チームでの情報共有の仕組みづくりにも取り組んでいます。",
    tags: ["TypeScript", "Next.js"],
  },
  {
    period: "2026.02 –",
    role: "業務委託 · フロントエンド / デザイン",
    isOngoing: true,
    title: "音声AIプロダクトのフロントエンド開発",
    body: "Next.js・TypeScript でフロントエンド全体を設計・実装。デジタル庁デザインシステムや shadcn/ui を参考に Figma でデザインシステムを構築し、UXリサーチ、CI/CD 整備まで担当しています。",
    tags: ["TypeScript", "Next.js", "Figma", "GitHub Actions"],
  },
  {
    period: "2025.12",
    role: "受託 · グラフィックデザイン",
    isOngoing: false,
    title: "麻雀アプリの OGP 画像デザイン",
    body: "対局結果を SNS シェアするための OGP 画像をデザイン。縮小表示でも順位とスコアが一目で伝わるよう、順位ごとの配色と情報の階層を設計しました。",
    tags: ["Figma"],
  },
  {
    period: "2025.10 – 2026.02",
    role: "インターン · バックエンド",
    isOngoing: false,
    title: "BtoB向け LLM チャットアプリケーション",
    body: "建築業界の DX を目的とした LLM チャットアプリのバックエンドを担当。Go / Python による API 設計・実装と、表形式データをエージェントが効率的に扱う仕組みを開発しました。",
    tags: ["Go", "Python"],
  },
  {
    period: "2025.03 – 2025.10",
    role: "インターン · フロントエンド",
    isOngoing: false,
    title: "CtoC マッチングアプリ",
    body: "React によるフロントエンド開発を担当。楽観的更新など、操作後の待ち時間や違和感を減らすインタラクションの実装と、ユーザー行動分析に基づく改善に取り組みました。",
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
          {WORKS.map(({ period, role, isOngoing, title, body, tags }) => (
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
                <span className="text-xs">{role}</span>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
      <SiteFooter />
    </>
  );
}
