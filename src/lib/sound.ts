"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type SoundName = "click";

const STORAGE_KEY = "nkoji:sound";
/** 連続で鳴っても不快にならない音量 */
const VOLUME = 0.6;

/**
 * 音源は初回再生時に読む。全ページで先読みすると、
 * 一度も音を鳴らさない訪問者にも転送量がかかるため。
 */
const buffers = new Map<SoundName, HTMLAudioElement>();

function getAudio(name: SoundName) {
  let audio = buffers.get(name);
  if (!audio) {
    audio = new Audio(`/sounds/${name}.wav`);
    audio.volume = VOLUME;
    buffers.set(name, audio);
  }
  return audio;
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

export function playSound(name: SoundName) {
  if (!enabled) return;

  const audio = getAudio(name);
  // 連打しても鳴り始めを揃える
  audio.currentTime = 0;
  // 最初のクリックまではブラウザに拒否される。無視してよい
  audio.play().catch(() => {});
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

  const toggle = useCallback(() => {
    enabled = !enabled;
    localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
    // ON にした瞬間だけ鳴らす。OFF にするときは無音が自然
    if (enabled) playSound("click");
    emit();
  }, []);

  return { isEnabled, toggle, play: playSound };
}
