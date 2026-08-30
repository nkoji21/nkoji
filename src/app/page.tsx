import { ProtectedImage } from "@/components/ProtectedImage";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-5 md:flex-row md:gap-24">
      <ProtectedImage
        src="/na.webp"
        alt="nkoji"
        width={256}
        height={256}
        className="anim-pop-in anim-delay-150 size-45 rounded-full md:order-2 md:size-64"
      />
      <div className="flex flex-col items-center gap-2 md:order-1 md:items-start">
        <h1 className="anim-slide-up anim-delay-300 font-display text-5xl text-foreground md:text-7xl">
          nkoji
        </h1>
        <p className="anim-slide-up anim-delay-450 font-bold text-accent tracking-logo md:text-2xl">
          Software Engineer / Designer
        </p>
      </div>
    </div>
  );
}
