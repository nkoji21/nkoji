"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type SoundName = "click" | "hover";

const STORAGE_KEY = "nkoji:sound";
/*
 * 連続で鳴っても不快にならない音量。
 * ホバーは通り過ぎるだけでも鳴るぶん回数が多いので、クリックより控えめにする。
 */
const VOLUME: Record<SoundName, number> = {
  click: 0.6,
  hover: 0.25,
};

/*
 * 音は Web Audio で鳴らす。
 *
 * audio 要素をひとつ使い回すと、鳴らすたび currentTime を戻す必要があり、
 * その巻き戻しに時間がかかる。連打すると前の再生が打ち切られるので
 * 鳴り損ねも起きる。
 *
 * Web Audio なら、読み込んだ音を一度だけ複号しておき、鳴らすたびに
 * 使い捨ての音源を作って即座に流せる。重ねて鳴らせるので連打にも耐える。
 */
let context: AudioContext | null = null;
const decoded = new Map<SoundName, AudioBuffer>();

function getContext() {
  if (!context) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    context = new Ctor();
  }
  return context;
}

/*
 * 取得と複号は分けておく。
 *
 * 取得はページを開いた時点で済ませたいが、複号には AudioContext が要る。
 * AudioContext を作るのはオーディオ機器を掴む処理で、モバイルでは軽くない。
 * 音を鳴らさずに帰る訪問者にその負担をかけたくないので、
 * 作るのは最初に触られたときまで待つ。
 */
const fetched = new Map<SoundName, Promise<ArrayBuffer>>();

function prefetch(name: SoundName) {
  if (fetched.has(name)) return;
  fetched.set(
    name,
    fetch(`/sounds/${name}.m4a`).then((res) => res.arrayBuffer()),
  );
}

/** 複号は 1 回だけ。以後は複号済みのものを使い回す */
async function decode(name: SoundName) {
  if (decoded.has(name)) return;

  const ctx = getContext();
  if (!ctx) return;

  prefetch(name);
  const bytes = fetched.get(name);
  if (!bytes) return;

  try {
    // decodeAudioData は渡した領域を消費するので、複製を渡す
    const buffer = await ctx.decodeAudioData((await bytes).slice(0));
    decoded.set(name, buffer);
  } catch {
    // 取れなければ音を諦める。動作そのものは止めない
  }
}

/**
 * iOS などは、ユーザー操作から始まった再生でないと音を出さない。
 * AudioContext も操作の中で resume しないと止まったままになる。
 */
function unlock() {
  if (!enabled) return;

  const ctx = getContext();
  if (ctx?.state === "suspended") ctx.resume().catch(() => {});

  // 最初に触られた時点で複号しておく。次の操作には間に合う
  decode("click");
  decode("hover");
}

/* --- 有効・無効の状態。複数のトグルが同じ値を見るので外に持つ --- */

let enabled = true;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => enabled;
/** サーバーでは常に ON 扱い。実際の値はマウント後に localStorage から読む */
const getServerSnapshot = () => true;

/*
 * 同じ操作で二重に鳴らさないための印。
 *
 * ひとつの操作は pointerdown → click の順で届き、押した瞬間に鳴らすので
 * 後から来る click のぶんは捨てたい。ただ時間で判定すると、
 * 速い連打まで巻き込んで消してしまう。
 * そこで pointerdown で目印を立て、次の click 1 回だけを飛ばす。
 */
let handledByPointer = false;

function play(name: SoundName) {
  if (!enabled) return;

  const ctx = getContext();
  const buffer = decoded.get(name);
  if (!ctx || !buffer) return;

  // 使い捨ての音源を都度作る。前の音を止めないので連打しても重なって鳴る
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const gain = ctx.createGain();
  gain.gain.value = VOLUME[name];

  source.connect(gain).connect(ctx.destination);
  source.start();
}

export function playSound(name: SoundName) {
  // 押した瞬間に鳴らしていれば、その操作の click では鳴らさない
  if (handledByPointer) {
    handledByPointer = false;
    return;
  }
  play(name);
}

/** 押せる要素。ここに乗っているときだけ、押した瞬間に鳴らす */
const PRESSABLE =
  'a[href], button:not(:disabled), [role="button"], label[for], summary';

/**
 * 音の ON / OFF ボタンだけは押した瞬間に鳴らさない。
 * pointerdown の時点ではまだ ON のままなので、
 * OFF にする操作で音が出てしまい「消したのに鳴った」と見える。
 * 切り替えたあとに鳴らすかどうかは toggle 側が決める。
 */
const SOUND_TOGGLE = "[data-sound-toggle]";

/** ホバー音を鳴らす対象。付けたものだけが鳴る */
const HOVER_SOUND = "[data-hover-sound]";

/**
 * 音源の先読みと、押した瞬間に鳴らす仕掛けを一度だけ用意する。
 *
 * click はタップから遅れて届くので、pointerdown の時点で鳴らす。
 * 各所の playSound は後から来る click で呼ばれるが、
 * 直前に鳴っていれば捨てられるので二重にはならない。
 *
 * あわせて最初の操作で解錠しておく（iOS は操作の中でしか音を出せない）。
 */
let didSetup = false;

function setupSound() {
  if (didSetup) return;
  didSetup = true;

  // 消している人には取りに行かない
  if (enabled) {
    prefetch("click");
    prefetch("hover");
  }

  document.addEventListener("pointerdown", (event) => {
    unlock();
    const target = event.target as Element | null;
    if (target?.closest?.(SOUND_TOGGLE)) return;
    if (target?.closest?.(PRESSABLE)) {
      play("click");
      handledByPointer = true;
    }
  });
  document.addEventListener("keydown", unlock);

  /*
   * ホバー音。
   *
   * 押せるもの全部で鳴らすとうるさいので、data-hover-sound が付いた
   * ものだけを対象にする。鳴らしたい場所で明示的に付ける。
   *
   * pointerover は指のタップでも飛んでくるので、マウスのときだけ鳴らす。
   * そうしないとスマホで、触るたびホバー音とクリック音が重なる。
   *
   * 同じ要素の中で子から子へ移ったときは鳴らさない。
   * 文字からアイコンへ移っただけで鳴り直すと、うるさく感じるため。
   */
  let hovered: Element | null = null;

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType !== "mouse") return;

    const target = event.target as Element | null;
    const wanted = target?.closest?.(HOVER_SOUND) ?? null;
    if (wanted === hovered) return;

    hovered = wanted;
    if (wanted) play("hover");
  });

  // 押せるものから外れたら、次に戻ってきたとき鳴るように印を消す
  document.addEventListener("pointerout", (event) => {
    if (event.pointerType !== "mouse") return;
    const next = (event as PointerEvent).relatedTarget as Element | null;
    if (!next?.closest?.(HOVER_SOUND)) hovered = null;
  });
}

/**
 * 効果音の ON / OFF。
 * 既定は ON だが、ブラウザの autoplay 制約で最初のクリックまでは鳴らない。
 */
export function useSound() {
  const isEnabled = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // localStorage は client でしか読めないので、mount 後に反映する
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return;

    const next = stored === "on";
    if (next !== enabled) {
      enabled = next;
      emit();
    }
  }, []);

  // 準備は 1 回だけ。useSound はヘッダーとモバイルナビの両方で使われるので、
  // ここで登録するとリスナが 2 つになり、1 タップで二重に鳴ってしまう
  useEffect(() => {
    setupSound();
  }, []);

  const toggle = useCallback(() => {
    enabled = !enabled;
    localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
    if (enabled) {
      // OFF で開いた人が ON にした場合、まだ取りに行っていないので今から用意する。
      // ON にした合図は鳴らしたいが、複号を待つ必要があるので終わってから鳴らす
      prefetch("click");
      prefetch("hover");
      unlock();
      decode("click").then(() => play("click"));
    }
    emit();
  }, []);

  return { isEnabled, toggle, play: playSound };
}
