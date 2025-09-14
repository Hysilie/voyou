import type { FC } from "react";

const Stepper: FC<{
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}> = ({ value, onChange, min = 0, max = 999 }) => (
  <div className="inline-flex relative items-center gap-1 bg-[var(--surface)] border border-[var(--line)] rounded-lg h-7 overflow-visible">
    <button
      onClick={() => onChange(Math.max(min, value - 1))}
      className="flex justify-center items-center hover:opacity-80 focus:outline-none w-6 h-6 text-sm"
    >
      –
    </button>
    <div
      className={`w-8 tabular-nums text-sm text-center ${
        value >= 5 ? "font-bold text-[var(--important-text)]" : ""
      }`}
    >
      {value}
    </div>
    <button
      onClick={() => onChange(Math.min(max, value + 1))}
      className="flex justify-center items-center hover:opacity-80 focus:outline-none w-6 h-6 text-sm"
    >
      +
    </button>
  </div>
);

export default Stepper;
