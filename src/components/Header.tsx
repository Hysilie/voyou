import React, { type FC } from "react";

interface HeaderProps {
  theme: string;
  t: (key: string) => string;
}

const Header: FC<HeaderProps> = ({ theme, t }) => {
  return (
    <div>
      <h1
        className={[
          "font-extrabold text-[var(--important-text)] text-4xl md:text-5xl leading-tight",
          theme === "blue" ? "text-white" : "",
        ].join(" ")}
      >
        <span className="text-[var(--muted)]">
          {theme === "blue" ? "🌑" : "🩸"}
        </span>
      </h1>
    </div>
  );
};

export default Header;
