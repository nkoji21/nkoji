/**
 * サイト共通のフッター。コピーライトだけを置く。
 *
 * ソーシャルへの導線は About と Contact が持っているので、ここには置かない。
 * トップページではこのフッター自体を出さない（削ぎ落とした1枚にするため）。
 */
export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-300 px-5 pt-16 pb-10">
      <p className="text-xs text-foreground">© 2026 Naoki Kojima</p>
    </footer>
  );
}
