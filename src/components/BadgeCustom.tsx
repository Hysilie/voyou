import type { PropsWithChildren } from "react";
import type { FC } from "react";

const BadgeCustom: FC<PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center gap-2 bg-[var(--chip-bg)] px-3 py-1 border border-[var(--chip-border)] rounded-full text-[10px] text-[var(--chip-text)]">
    {children}
  </span>
);

export default BadgeCustom;
