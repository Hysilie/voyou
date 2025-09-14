export type BaseItem = {
  id: string;
  name: string;
  emoji: string;
  dirtyValue: number;
};
export type CraftRecipeRow = { itemId: string; qty: number };
export type Craft = {
  id: string;
  name: string;
  emoji: string;
  sellPriceClean: number;
  recipe: CraftRecipeRow[];
};
export type InventoryData = {
  vandalism: BaseItem[];
  racket: BaseItem[];
  robbery: BaseItem[];
  trash: BaseItem[];
  craft: Craft[];
};