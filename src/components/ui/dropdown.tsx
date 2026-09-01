"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IconCaretDown, IconCheck } from "@/components/icons";
import { playSound } from "@/lib/sound";

export type DropdownOption = {
  value: string;
  label: string;
  count: number;
};

export function Dropdown({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => {
          playSound("click");
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={label}
        className="flex h-11.5 w-full items-center justify-between gap-2.5 rounded-xl border border-line bg-surface pr-3.5 pl-4 text-left text-sm transition-colors duration-fast ease-out hover:bg-surface-hover"
      >
        <span className="truncate">{selected?.label}</span>
        <IconCaretDown
          className={`size-4 shrink-0 text-accent transition-transform duration-fast ease-out ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          className="anim-pop-in absolute top-full right-0 left-0 z-10 mt-2 flex origin-top flex-col gap-0.5 rounded-2xl border border-line bg-surface p-2 shadow-[0_6px_20px_rgb(0_0_0/0.08)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    playSound("click");
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors duration-fast ease-out ${
                    isSelected
                      ? "bg-surface-hover text-foreground-strong"
                      : "hover:bg-surface-hover"
                  }`}
                >
                  <span className="truncate">
                    {option.label}{" "}
                    <span className="text-foreground">({option.count})</span>
                  </span>
                  {isSelected && (
                    <IconCheck className="size-3.75 shrink-0 text-accent" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
