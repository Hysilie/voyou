import type { FC } from "react";

const ThemeSwitch: FC<{
  theme: "red" | "blue";
  onChange: (t: "red" | "blue") => void;
  labelRed: string;
  labelBlue: string;
}> = ({ theme, onChange, labelRed, labelBlue }) => (
  <button
    onClick={() => onChange(theme === "red" ? "blue" : "red")}
    className={[
      "px-3 py-2 rounded-xl text-sm",
      "bg-[var(--brand)] text-white hover:opacity-90",
    ].join(" ")}
  >
    {theme === "red" ? labelRed : labelBlue}
  </button>
);

export default ThemeSwitch;
