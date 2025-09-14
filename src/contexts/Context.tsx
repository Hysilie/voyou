import { createContext, type Dispatch, type SetStateAction } from "react";

export interface Item {
  id: number;
  name: string;
  emoji: string;
  dirtyValue: number;
  cleanValue: number;
  category: string;
}

interface GlobalContextProps {
  items: Record<string, Item[]>;
  setItems: Dispatch<SetStateAction<Record<string, Item[]>>>;
  launderingPercentage: number;
  customLaunderingPercentage: number;
  setCustomLaunderingPercentage: Dispatch<SetStateAction<number>>;
  baseItems: Record<string, Item>;
  theme: "red" | "blue";
  setTheme: Dispatch<SetStateAction<"red" | "blue">>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);
