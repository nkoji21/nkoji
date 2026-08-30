import { SiteFooter } from "@/components/layout/site-footer";

export default function BlogPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-300 flex-1 px-5 pt-12">
        <h1 className="font-display text-3xl text-foreground-strong">Blog</h1>
      </div>
      <SiteFooter />
    </>
  );
}
