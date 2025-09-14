import type { FC } from "react";

const Tabs: FC<{
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}> = ({ options, value, onChange }) => (
  <div className="flex gap-1 bg-[var(--surface)] p-1 border border-[var(--line)] rounded-2xl">
    {options.map((o) => {
      const active = o.id === value;
      return (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={[
            "px-3 py-2 rounded-xl text-sm",
            active
              ? "bg-[var(--brand)] text-white"
              : "text-[var(--muted)] hover:opacity-90",
          ].join(" ")}
        >
          {o.label}
        </button>
      );
    })}
  </div>
);
export default Tabs;
