import React, { type Dispatch, type SetStateAction } from "react";
import BadgeCustom from "../../../components/BadgeCustom";
import Card from "../../../components/Card";
import SearchInput from "../../../components/SearchInput";

interface IngredientListProps {
  view: string;
  t: (key: string, options?: any) => string;
  categoriesOrder: ("all" | "vandalism" | "racket" | "robbery" | "trash")[];
  activeCat: string;
  setActiveCat: Dispatch<
    SetStateAction<"all" | "vandalism" | "racket" | "robbery" | "trash">
  >;
  search: string;
  setSearch: (value: string) => void;
  flatItems: any[];
  launderingPercentage: number;
  currency: (value: number) => string;
}

const IngredientList: React.FC<IngredientListProps> = ({
  view,
  t,
  categoriesOrder,
  activeCat,
  setActiveCat,
  search,
  setSearch,
  flatItems,
  launderingPercentage,
  currency,
}) => {
  if (view !== "items") return null;

  return (
    <>
      <div className="flex items-center gap-2 mb-2 font-semibold text-[var(--muted)]">
        {t("sections.items")}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        <SearchInput
          placeholder={t("placeholders.searchItem")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {categoriesOrder.map((id) => (
            <button
              key={id}
              className={[
                "px-3 h-9 rounded-xl border text-sm",
                "bg-[var(--surface)] border-[var(--line)]",
                activeCat === id
                  ? "bg-[var(--brand)] text-white border-transparent"
                  : "text-[var(--muted)] hover:opacity-90",
              ].join(" ")}
              onClick={() =>
                setActiveCat(
                  id as "all" | "vandalism" | "racket" | "robbery" | "trash"
                )
              }
            >
              {id === "all" ? t("filters.all") : t(`categories.${id}`)}
            </button>
          ))}
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="max-h-[520px] overflow-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-[11px] text-[var(--muted)] text-left uppercase tracking-wider">
                {[
                  t("table.category"),
                  t("table.item"),
                  t("table.dirty"),
                  t("table.clean"),
                ].map((h) => (
                  <th
                    key={h}
                    className="top-0 sticky bg-[var(--surface)] px-4 py-2 border-[var(--line)] border-b"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flatItems
                .filter((it: any) => it.category !== "craft")
                .filter((it: any) =>
                  activeCat === "all" ? true : it.category === activeCat
                )
                .filter((it: any) =>
                  search.trim()
                    ? (it.name || "")
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    : true
                )
                .map((item: any) => (
                  <tr key={item.id} className="border-[var(--line)] border-b">
                    <td className="px-4 py-2 capitalize">
                      {t(`categories.${item.category}`)}
                    </td>
                    <td className="px-4 py-2">
                      <BadgeCustom>
                        <span className="text-base">{item.emoji}</span>
                        <span>{item.name}</span>
                      </BadgeCustom>
                    </td>
                    <td className="px-4 py-2 tabular-nums text-[var(--muted)]">
                      {currency(item.dirtyValue)}
                    </td>
                    <td className="px-4 py-2 tabular-nums text-[var(--good)]">
                      {currency(
                        Math.floor(
                          (item.dirtyValue || 0) * (launderingPercentage / 100)
                        )
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="px-3 py-2 text-[var(--muted)] text-xs text-right">
          {t("table.note", { pct: launderingPercentage })}
        </div>
      </Card>
    </>
  );
};

export default IngredientList;
