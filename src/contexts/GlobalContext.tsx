import { useState, useMemo, type FC, type ReactNode } from "react";
import data from "../data/items.json";
import { GlobalContext, type Item } from "./Context";

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Record<string, Item[]>>({});
  const [customLaunderingPercentage, setCustomLaunderingPercentage] =
    useState<number>(20);
  const launderingPercentage = 20;

  const [theme, setTheme] = useState<"red" | "blue">("blue");

  const baseItems = useMemo(
    () => ({
      ...(data as any).vandalism.reduce(
        (a: any, i: any) => ({ ...a, [i.id]: i }),
        {}
      ),
      ...(data as any).racket.reduce(
        (a: any, i: any) => ({ ...a, [i.id]: i }),
        {}
      ),
      ...(data as any).robbery.reduce(
        (a: any, i: any) => ({ ...a, [i.id]: i }),
        {}
      ),
      ...(data as any).trash.reduce(
        (a: any, i: any) => ({ ...a, [i.id]: i }),
        {}
      ),
    }),
    []
  );

  return (
    <GlobalContext.Provider
      value={{
        items,
        setItems,
        customLaunderingPercentage,
        launderingPercentage,
        setCustomLaunderingPercentage,
        baseItems,
        theme,
        setTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
