import { AvatarButton } from "@/components/ui/avatar-button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-5 pb-24 md:flex-row md:gap-24 md:pb-0">
      {/*
        名前 → 肩書き → アイコン の順に視線を送る。
        画面上の並びは md で左右が入れ替わるが、遅延は見せたい順に振る。
        入場（translate）と反応（scale）は別の要素に載せる。
        同じ要素に置くと、ホバーの scale が入場の translate を巻き戻してしまう
      */}
      <div className="anim-float-up-spring anim-delay-700 size-45 md:order-2 md:size-64">
        <AvatarButton className="size-full" />
      </div>
      <div className="flex flex-col items-center gap-2 md:order-1 md:items-start">
        <h1 className="anim-hero-up font-display text-5xl text-foreground md:text-7xl">
          nkoji
        </h1>
        <p className="anim-hero-up anim-delay-350 font-bold text-accent tracking-logo md:text-2xl">
          Software Engineer / Designer
        </p>
      </div>
    </div>
  );
}
