"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type SoundName = "click";

const STORAGE_KEY = "nkoji:sound";
/** 連続で鳴っても不快にならない音量 */
const VOLUME = 0.6;

/**
 * 音源は先に読み込んでおく。押されてから取りに行くと、
 * モバイル回線では取得を待つあいだ音が遅れて聞こえるため。
 * 15KB 程度なので、鳴らさない訪問者にかかる負担よりも遅延の解消を取る。
 */
const buffers = new Map<SoundName, HTMLAudioElement>();

function getAudio(name: SoundName) {
  let audio = buffers.get(name);
  if (!audio) {
    audio = new Audio(`/sounds/${name}.wav`);
    audio.preload = "auto";
    audio.volume = VOLUME;
    buffers.set(name, audio);
  }
  return audio;
}

/**
 * iOS などは、ユーザー操作から始まった再生でないと音を出さない。
 * 最初の操作で一度だけ無音のまま再生して解錠しておかないと、
 * 1 回目のタップが鳴らずに終わる。
 */
let unlocked = false;

function unlock() {
  if (unlocked) return;
  unlocked = true;

  const audio = getAudio("click");
  const { volume } = audio;
  audio.volume = 0;
  audio
    .play()
    .then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = volume;
    })
    .catch(() => {
      audio.volume = volume;
    });
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

/**
 * 直前に pointerdown で鳴らした時刻。
 * click はタップから最大 300ms ほど遅れて来るので、押した瞬間に鳴らし、
 * 後から来る click の分を捨てて二重に鳴らないようにする。
 */
let lastPlayedAt = 0;
const DOUBLE_PLAY_MS = 400;

function play(name: SoundName) {
  if (!enabled) return;

  const audio = getAudio(name);
  // 連打しても鳴り始めを揃える
  audio.currentTime = 0;
  // 解錠前はブラウザに拒否される。無視してよい
  audio.play().catch(() => {});
  lastPlayedAt = performance.now();
}

export function playSound(name: SoundName) {
  // 押した時点で既に鳴っているなら、後続の click では鳴らさない
  if (performance.now() - lastPlayedAt < DOUBLE_PLAY_MS) return;
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

  getAudio("click");

  document.addEventListener("pointerdown", (event) => {
    unlock();
    const target = event.target as Element | null;
    if (target?.closest?.(SOUND_TOGGLE)) return;
    if (target?.closest?.(PRESSABLE)) play("click");
  });
  document.addEventListener("keydown", unlock, { once: true });
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
    // ON にした瞬間だけ鳴らす。OFF にするときは無音が自然。
    // ここは押した合図なので、直前に鳴っていても必ず鳴らす
    if (enabled) play("click");
    emit();
  }, []);

  return { isEnabled, toggle, play: playSound };
}
