import type { FC, InputHTMLAttributes } from "react";

const SearchInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <div className="relative">
    <span className="top-2.5 left-3 absolute">🔎</span>
    <input
      {...props}
      className={[
        "h-9 w-80 pl-9 pr-3 rounded-xl border outline-none",
        "bg-[var(--surface)] border-[var(--line)] text-[var(--ink)]",
        "placeholder:text-[var(--muted)]",
        props.className || "",
      ].join(" ")}
    />
  </div>
);

export default SearchInput;
