import { Avatar } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-5 pb-24 md:flex-row md:gap-24 md:pb-0">
      <Avatar className="anim-pop-in anim-delay-100 size-45 md:order-2 md:size-64" />
      <div className="flex flex-col items-center gap-2 md:order-1 md:items-start">
        <h1 className="anim-slide-up anim-delay-350 font-display text-5xl text-foreground md:text-7xl">
          nkoji
        </h1>
        <p className="anim-slide-up anim-delay-600 font-bold text-accent tracking-logo md:text-2xl">
          Software Engineer / Designer
        </p>
      </div>
    </div>
  );
}
