import React, { useEffect, useState, type FC } from "react";

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));
const round1 = (n: number) => Math.round(n * 10) / 10;
const fmt = (n: number) => n.toString().replace(".", ",");

export const LaunderingControl: FC<{
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number; // e.g. 0.1
  className?: string;
}> = ({ value, onChange, min = 0, max = 100, step = 0.1, className = "" }) => {
  const [raw, setRaw] = useState<string>(fmt(value));

  useEffect(() => {
    setRaw(fmt(value));
  }, [value]);

  const parseAndCommit = () => {
    const normalized = raw
      .trim()
      .replace(",", ".")
      .replace(/[^\d.]/g, "");
    const parts = normalized.split(".");
    const fixed =
      parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : normalized;

    const num = parseFloat(fixed);
    if (isNaN(num)) {
      setRaw(fmt(value));
      return;
    }
    const next = clamp(round1(num), min, max);
    onChange(next);
    setRaw(fmt(next));
  };

  const inc = () => onChange(clamp(round1(value + step), min, max));
  const dec = () => onChange(clamp(round1(value - step), min, max));

  return (
    <div
      className={[
        "inline-flex relative items-center gap-1 bg-[var(--surface)] border border-[var(--line)] rounded-lg h-7 overflow-visible",
        className,
      ].join(" ")}
    >
      <button
        type="button"
        onClick={dec}
        className="flex justify-center items-center hover:opacity-80 focus:outline-none w-6 h-6 text-sm"
        aria-label="Moins"
        title={`-${step}`}
      >
        –
      </button>

      <input
        type="text"
        inputMode="decimal"
        pattern="[0-9]+([,.][0-9]+)?"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        onBlur={parseAndCommit}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          if (e.key === "Escape") setRaw(fmt(value));
        }}
        className={`w-8 tabular-nums text-sm text-center bg-transparent outline-none ${
          value >= 5 ? "font-bold text-[var(--important-text)]" : ""
        }`}
        aria-label="Pourcentage"
      />

      <button
        type="button"
        onClick={inc}
        className="flex justify-center items-center hover:opacity-80 focus:outline-none w-6 h-6 text-sm"
        aria-label="Plus"
        title={`+${step}`}
      >
        +
      </button>
    </div>
  );
};

export default LaunderingControl;
