import type { FC, PropsWithChildren } from "react";

const Card: FC<
  PropsWithChildren<{
    className?: string;
    elevated?: boolean;
    glow?: boolean;
  }>
> = ({ children, className = "", elevated = true, glow = true }) => (
  <div
    className={[
      "relative overflow-hidden rounded-2xl p-4 border bg-[var(--surface)] border-[var(--line)]",
      elevated
        ? "shadow-[0_10px_30px_rgba(var(--brand-rgb),0.16),0_2px_6px_rgba(0,0,0,0.25)]"
        : "shadow",
      className,
    ].join(" ")}
  >
    {glow && (
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 pointer-events-none" />
    )}
    {glow && (
      <div className="-top-1/2 -left-1/3 absolute bg-[radial-gradient(60%_60%_at_20%_10%,rgba(var(--brand-rgb),0.45),transparent_55%)] opacity-[0.18] blur-2xl w-[140%] h-[140%] pointer-events-none" />
    )}
    {children}
  </div>
);

export default Card;
