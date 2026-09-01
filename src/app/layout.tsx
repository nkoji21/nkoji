import type { Metadata } from "next";
import { M_PLUS_1, Titan_One } from "next/font/google";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const mplus = M_PLUS_1({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mplus",
});

const titanOne = Titan_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-titan-one",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "nkoji",
    template: "%s / nkoji",
  },
  description: "nkoji's website",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // フォント変数は html に置く。Tailwind の preflight が html で参照するため
    <html lang="ja" className={`${mplus.variable} ${titanOne.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* ヘッダーはモバイルでは出さないので、余白ごと隠す */}
        <div className="sticky top-0 z-40 hidden bg-background/80 py-4 backdrop-blur-md md:block">
          <SiteHeader />
        </div>
        <main className="flex flex-1 flex-col">{children}</main>
        <MobileNav />
      </body>
    </html>
  );
}
