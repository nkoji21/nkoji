import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllPostMeta, getPost } from "@/lib/blog";
import { SITE_AUTHOR } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "";

export async function generateStaticParams() {
  return (await getAllPostMeta()).map(({ slug }) => ({ slug }));
}

/**
 * Satori は Tailwind の oklch もフォント変数も解釈しないので、
 * globals.css のトークンを 16 進で持ち直す。Figma の OGP ページと同じ値。
 */
const COLOR = {
  background: "#e1eaeb",
  surface: "#f1f6f7",
  line: "#c5d0d2",
  foreground: "#555d5d",
  foregroundStrong: "#2d3435",
} as const;

/** Google Fonts の CSS から実ファイルの URL を取り出す */
async function loadFont(family: string, weight: number) {
  const query = `family=${family.replace(/ /g, "+")}:wght@${weight}`;
  const css = await fetch(
    `https://fonts.googleapis.com/css2?${query}&subset=japanese`,
    // 既定の UA だと woff2 を返してくるが、Satori は ttf しか読めない
    { headers: { "User-Agent": "Mozilla/5.0" } },
  ).then((res) => res.text());

  const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!url)
    throw new Error(`${family} ${weight} の URL を取り出せませんでした`);

  return fetch(url).then((res) => res.arrayBuffer());
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPost((await params).slug);
  const title = post?.meta.title ?? "";

  const [fontBold, avatar] = await Promise.all([
    loadFont("M PLUS 1", 700),
    // Satori は webp を読めないので、public の na.webp ではなく隣の jpg を使う
    readFile(path.join(process.cwd(), "src/app/blog/[slug]/avatar.jpg")),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 56,
        background: COLOR.background,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
          borderRadius: 24,
          border: `1px solid ${COLOR.line}`,
          background: COLOR.surface,
          padding: "64px 72px 56px",
        }}
      >
        {/* タイトルはカード内で縦中央に置く。1 行でも 3 行でも重心を変えない */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "block",
              // 4 行以上は著者行を押し出すので、3 行で省略する
              lineClamp: 3,
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.5,
              color: COLOR.foregroundStrong,
            }}
          >
            {title}
          </div>
        </div>

        {/* 署名はタイトルと左端を揃える。行数が変わっても表情を保つ */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* biome-ignore lint/performance/noImgElement: Satori は next/image を解釈しない */}
          <img
            src={`data:image/jpeg;base64,${avatar.toString("base64")}`}
            width={60}
            height={60}
            style={{ borderRadius: 999 }}
            alt=""
          />
          <div
            style={{ fontSize: 22, fontWeight: 700, color: COLOR.foreground }}
          >
            {SITE_AUTHOR.name}
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "M PLUS 1", data: fontBold, weight: 700, style: "normal" },
      ],
    },
  );
}
