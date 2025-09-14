import { type FC } from "react";
import SearchInput from "../../../components/SearchInput";
import Card from "../../../components/Card";
import Stepper from "../../../components/Stepper";
import type { Item } from "../../../contexts/Context";
import Econ from "./Econ";
import ItemList from "./ItemList";
import { ChevronDown } from "feather-icons-react";
import { ChevronUp } from "feather-icons-react";

interface CraftListProps {
  view: string;
  data: any;
  craftQuery: string;
  setCraftQuery: (value: string) => void;
  quantities: Record<string, number>;
  baseItems: Record<string, Item>;
  launderingPercentage: number;
  econOpen: Record<string, boolean>;
  setEconOpen: (value: Record<string, boolean>) => void;
  handleQtyChange: (id: string, value: number) => void;
  t: (key: string) => string;
}

const CraftList: FC<CraftListProps> = ({
  view,
  data,
  craftQuery,
  setCraftQuery,
  quantities,
  baseItems,
  econOpen,
  setEconOpen,
  handleQtyChange,
  t,
}) => {
  if (view !== "craft") return null;

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center mb-6">
        <SearchInput
          placeholder={t("placeholders.searchRecipe")}
          value={craftQuery}
          onChange={(e) => setCraftQuery(e.target.value)}
        />
      </div>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        {(data as any).craft
          .filter((c: any) =>
            craftQuery.trim()
              ? (c.name || "").toLowerCase().includes(craftQuery.toLowerCase())
              : true
          )
          .map((craft: any) => {
            const chosenQty = quantities[craft.id] || 0;

            const totals = craft.recipe.map((r: any) => ({
              ...r,
              totalNeeded: r.qty * chosenQty,
              item: (baseItems as Record<string, Item>)[r.itemId],
            }));

            const sell = (craft.sellPriceClean || 0) * chosenQty;
            const isEcon = !!econOpen[craft.id];

            return (
              <Card key={craft.id}>
                <div className="items-center grid grid-cols-[1fr_auto] pb-4 border-b border-b-[var(--line)]">
                  <div className="flex items-center gap-2 font-bold text-base">
                    <span className="text-base">{craft.emoji}</span>
                    <span>{craft.name}</span>
                  </div>
                  <div className="flex justify-self-end items-center gap-6">
                    <Stepper
                      value={chosenQty}
                      onChange={(n) => handleQtyChange(craft.id, n)}
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        setEconOpen({
                          ...econOpen,
                          [craft.id]: !econOpen[craft.id],
                        })
                      }
                    >
                      {isEcon ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2"></div>
                <ItemList {...{ totals }} />
                {isEcon && <Econ {...{ sell }} />}
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default CraftList;
