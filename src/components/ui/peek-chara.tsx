import Image from "next/image";

/**
 * カードにホバーすると、カードの裏からひょっこり出てくるキャラ。
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
        "pointer-events-none -z-20 absolute right-4 bottom-0 w-16 md:w-20",
        // 待機。カードの裏に完全に潜り込ませておく
        "translate-y-0 scale-90 rotate-[-6deg] opacity-0",
        // ホバー。下からせり上がって顔を出す
        "group-hover:translate-y-[62%] group-hover:scale-100",
        "group-hover:rotate-0 group-hover:opacity-100",
        // 出入りで同じ指定なので、離しても同じ速さで帰る
        "transition-[translate,scale,rotate,opacity] duration-spring ease-spring",
        // 動きを減らす設定では出入りだけにして、位置は動かさない
        "motion-reduce:group-hover:translate-y-[62%]",
      ].join(" ")}
    />
  );
}
