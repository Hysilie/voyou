import type { FC } from "react";

const KPI: FC<{
  label: string;
  value: string;
  tone?: "good" | "bad";
}> = ({ label, value, tone }) => (
  <div className="inline-flex items-center gap-2 bg-[var(--surface)] px-2 py-1 border border-[var(--line)] rounded-xl text-xs">
    <span>{label}</span>
    <span
      className={`font-bold ${
        tone === "good"
          ? "text-[var(--good)]"
          : tone === "bad"
          ? "text-[var(--bad)]"
          : ""
      }`}
    >
      {value}
    </span>
  </div>
);

export default KPI;
