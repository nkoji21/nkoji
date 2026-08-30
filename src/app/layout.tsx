import type { Metadata } from "next";
import { Titan_One, Zen_Kaku_Gothic_New } from "next/font/google";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zen-kaku",
});

const titanOne = Titan_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-titan-one",
});

export const metadata: Metadata = {
  title: "nkoji",
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
    <html lang="ja">
      <body
        className={`${zenKaku.variable} ${titanOne.variable} flex min-h-dvh flex-col antialiased`}
      >
        <div className="pt-12">
          <SiteHeader />
        </div>
        <main className="flex flex-1 flex-col">{children}</main>
        <MobileNav />
      </body>
    </html>
  );
}
