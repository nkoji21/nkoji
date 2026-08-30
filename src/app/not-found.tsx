import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { Avatar } from "@/components/ui/avatar";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-5 py-16">
        <Avatar className="size-35 md:size-45" />

        <div className="flex flex-col items-center gap-3">
          <p className="font-display text-5xl text-foreground md:text-7xl">
            404
          </p>
          <p className="text-center text-sm md:text-base">
            ページが見つかりませんでした
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex rounded-xl bg-accent px-9 py-3.5 font-bold text-on-accent transition-[background-color,transform] duration-fast ease-out hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0 active:scale-97"
        >
          ホームにもどる
        </Link>
      </div>
      <SiteFooter />
    </>
  );
}
