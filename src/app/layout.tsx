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
        className={`${mplus.variable} ${titanOne.variable} flex min-h-dvh flex-col`}
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
