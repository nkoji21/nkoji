import Image from "next/image";

/**
 * カードにホバーすると、カードの裏から上にひょっこり顔を出すキャラ。
 * 親に group と position:relative があることが前提。
 *
 * カードより奥に置くので、出てきても体の大部分はカードに隠れ、
 * はみ出した分だけが見える。カード側に不透明な背景が要る。
 *
 * 出るときと戻るときで同じ長さ・同じ曲線にしてあるので、
 * カーソルを外しても消えるのではなく、来たときと同じ速さで帰っていく。
 * 装飾なので支援技術からは隠す。
 */
export function PeekChara() {
  return (
    <Image
      src="/chara.webp"
      alt=""
      aria-hidden="true"
      width={240}
      height={240}
      sizes="96px"
      className={[
        // カード背景(::before, -z-10)よりさらに奥。はみ出した分だけ見える
        "pointer-events-none -z-20 absolute top-0 right-5 w-16 md:w-20",
        // 待機。カードの裏に完全に潜り込ませておく
        "translate-y-0 scale-90 rotate-[4deg] opacity-0",
        // ホバー。上へ顔を出しつつ、右へさらに傾ける。
        // 傾きが増えるほうが、まっすぐ出るより「のぞき込んだ」感じになる
        "group-hover:-translate-y-[57%] group-hover:translate-x-1",
        "group-hover:scale-100 group-hover:rotate-[8deg]",
        "group-hover:opacity-100",
        // 出入りで同じ指定なので、離しても同じ速さで帰る
        "transition-[translate,scale,rotate,opacity] duration-500 ease-bounce",
        // 動きを減らす設定でも、隠れたままでは何も見えないので位置だけは動かす
        "motion-reduce:group-hover:-translate-y-[58%]",
      ].join(" ")}
    />
  );
}
