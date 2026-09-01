"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * 退場中の印を、新しいページが描かれた時点で外す。
 *
 * 消す役目を SoundLink 側に持たせると、router.push が非同期なぶん
 * 新しいページが出る前に古い本文が元の位置へ戻ってしまう。
 * ここでパスの変化を見て外すことで、入れ替わったあとに解除できる。
 */
export function LeaveReset() {
  const pathname = usePathname();

  // pathname は中で使わないが、パスが変わるたび実行させるために依存に置く
  // biome-ignore lint/correctness/useExhaustiveDependencies: 遷移の検知が目的
  useEffect(() => {
    delete document.documentElement.dataset.leaving;
  }, [pathname]);

  return null;
}
