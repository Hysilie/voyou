import { type FC, useEffect, useMemo, useState } from "react";
import Card from "../../../components/Card";
import { currency } from "../../../utils/constants";
import data from "../../../data/items.json";
import LaunderingControl from "./LaunderingControl";

const Dashboard: FC<{
  t: (k: string, p?: Record<string, string | number>) => string;
  quantities: Record<string, number>;
  launderingPctApplied: number;
  baseItems: Record<string, any>;
  setLaunderingPct?: (n: number) => void;
}> = ({ t, quantities, launderingPctApplied, baseItems, setLaunderingPct }) => {
  const shoppingList = useMemo(() => {
    const map: Record<
      string,
      { item: any; qty: number; unitDirty: number; unitClean: number }
    > = {};
    (data as any).craft.forEach((craft: any) => {
      const q = quantities[craft.id] || 0;
      if (!q) return;
      craft.recipe.forEach((r: any) => {
        const it = baseItems[r.itemId];
        if (!it) return;
        const add = (r.qty || 0) * q;
        const unitDirty = it.dirtyValue || 0;
        const unitClean = Math.floor(unitDirty * (launderingPctApplied / 100));
        if (map[r.itemId]) map[r.itemId].qty += add;
        else map[r.itemId] = { item: it, qty: add, unitDirty, unitClean };
      });
    });
    const rows = Object.values(map);
    rows.sort((a, b) => (a.item?.name || "").localeCompare(b.item?.name || ""));
    return rows;
  }, [quantities, baseItems, launderingPctApplied]);

  type BagRow = { id: number; bagId: string | null; qty: number };

  // Liste des types de sacs (depuis ton JSON)
  // Liste des types de sacs : uniquement ceux de "robbery"
  const bagOptions = useMemo(() => {
    const src: any = data as any;
    const list: any[] = Array.isArray(src.robbery) ? src.robbery : [];

    const seen = new Set<string>();
    return list
      .filter(
        (it) => it && it.id && !seen.has(it.id) && (seen.add(it.id), true)
      )
      .map((it) => ({
        id: it.id,
        name: it.name,
        emoji: it.emoji,
        dirtyValue: Number(it.dirtyValue) || 0,
      }));
  }, []);

  const bagMap = useMemo(
    () => Object.fromEntries(bagOptions.map((b: any) => [b.id, b])),
    [bagOptions]
  );

  const [bags, setBags] = useState<BagRow[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      bagId: null,
      qty: 0,
    }))
  );

  useEffect(() => {
    if (!bagOptions.length) return;
    setBags((rows) =>
      rows.map(
        (row, idx) =>
          row.bagId && bagMap[row.bagId] // déjà défini et valide -> on garde
            ? row
            : { ...row, bagId: bagOptions[idx % bagOptions.length].id } // on assigne
      )
    );
  }, [bagOptions, bagMap]);

  return (
    <div className="gap-4 grid grid-cols-1 xl:grid-cols-3">
      {/* Shopping list */}
      <Card className="xl:col-span-1">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">
            {t("dashboard.shoppingList", { default: "Liste de courses" })}
          </h2>

          <div className="flex items-center gap-2"></div>
        </div>

        {shoppingList.length === 0 ? (
          <div className="text-[var(--muted)] text-sm">
            {t("dashboard.noSelection", {
              default: "Aucune recette sélectionnée (qté = 0).",
            })}
          </div>
        ) : (
          <div className="border border-[var(--line)] rounded-2xl overflow-hidden">
            <div className="max-h-[420px] overflow-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr className="text-[11px] text-[var(--muted)] text-left uppercase tracking-wider">
                    {[
                      t("table.item"),
                      t("labels.qty"),
                      t("table.done", { default: "Fait" }),
                    ].map((h) => (
                      <th
                        key={h}
                        className={`top-0 sticky bg-[var(--surface)] px-3 py-2 border-[var(--line)] border-b ${
                          h === t("table.item") ? "text-left" : "text-right"
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shoppingList
                    .sort((a, b) => b.qty - a.qty)
                    .map((r) => (
                      <tr
                        key={r.item.id}
                        className="border-[var(--line)] border-b"
                      >
                        <td className="px-3 py-2">
                          <span className="inline-flex items-center gap-2 bg-[var(--chip-bg)] px-3 py-1 border border-[var(--chip-border)] rounded-full text-[var(--chip-text)] text-xs">
                            <span className="text-base">{r.item.emoji}</span>
                            <span>{r.item.name}</span>
                          </span>
                        </td>
                        <td className="px-3 py-2 tabular-nums text-right">
                          {r.qty}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-[var(--brand)]"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>

      <Card className="xl:col-span-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">
            {t("dashboard.bagCalc", { default: "Calculette de sacs" })}
          </h2>
          <LaunderingControl
            value={launderingPctApplied}
            onChange={setLaunderingPct ?? (() => {})}
          />
        </div>

        <div className="border border-[var(--line)] rounded-2xl overflow-hidden">
          <div className="max-h-[420px] overflow-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="text-[11px] text-[var(--muted)] text-left uppercase tracking-wider">
                  {[
                    t("bag.label", { default: "Sac" }),
                    t("bag.qty", { default: "Qté" }),
                    t("bag.dirtyUnit", { default: "Valeur sale / sac" }),
                    t("bag.lineDirty", { default: "Ligne sale" }),
                    t("bag.lineClean", { default: "Ligne propre" }),
                  ].map((h) => (
                    <th
                      key={h}
                      className="top-0 sticky bg-[var(--surface)] px-3 py-2 border-[var(--line)] border-b"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bags.map((row, idx) => {
                  const unitDirty = row.bagId
                    ? bagMap[row.bagId]?.dirtyValue || 0
                    : 0;
                  const lineDirty = (Number(row.qty) || 0) * unitDirty;
                  const lineClean = Math.floor(
                    lineDirty * (launderingPctApplied / 100)
                  );

                  return (
                    <tr key={row.id} className="border-[var(--line)] border-b">
                      <td className="px-3 py-2">
                        <select
                          value={row.bagId ?? ""}
                          onChange={(e) =>
                            setBags((rows) =>
                              rows.map((r, i) =>
                                i === idx
                                  ? { ...r, bagId: e.target.value || null }
                                  : r
                              )
                            )
                          }
                          className="bg-[var(--surface)] px-3 border border-[var(--line)] rounded-xl outline-none w-full h-9"
                        >
                          {bagOptions.length === 0 && (
                            <option value="">
                              {t("bag.noTypes", {
                                default: "Aucun type de sac",
                              })}
                            </option>
                          )}
                          {bagOptions.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {`${opt.emoji ? opt.emoji + " " : ""}${opt.name}`}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-3 py-2">
                        <input
                          type="number"
                          className="bg-[var(--surface)] px-2 border border-[var(--line)] rounded-xl outline-none w-24 h-9 tabular-nums text-right"
                          value={row.qty}
                          onChange={(e) =>
                            setBags((rows) =>
                              rows.map((r, i) =>
                                i === idx
                                  ? { ...r, qty: Number(e.target.value || 0) }
                                  : r
                              )
                            )
                          }
                        />
                      </td>

                      <td className="px-3 py-2 tabular-nums text-[var(--muted)] text-right">
                        {currency(unitDirty)}
                      </td>

                      <td className="px-3 py-2 tabular-nums text-[var(--muted)] text-right">
                        {currency(lineDirty)}
                      </td>

                      <td className="px-3 py-2 tabular-nums text-[var(--good)] text-right">
                        {currency(lineClean)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                {(() => {
                  const totalDirty = bags.reduce((s, r) => {
                    const unit = r.bagId ? bagMap[r.bagId]?.dirtyValue || 0 : 0;
                    return s + (Number(r.qty) || 0) * unit;
                  }, 0);
                  const totalClean = Math.floor(
                    totalDirty * (launderingPctApplied / 100)
                  );
                  return (
                    <>
                      <tr>
                        <td
                          className="border-[var(--line)] border-t text-right"
                          colSpan={6}
                        />
                      </tr>
                      <tr className="border-[var(--line)] border-t font-semibold">
                        <td className="px-3 py-2 text-right" colSpan={3}>
                          {t("dashboard.totals", { default: "Totaux" })}:
                        </td>
                        <td className="px-3 py-2 tabular-nums text-[var(--muted)]">
                          {currency(totalDirty)}
                        </td>
                        <td className="px-3 py-2 tabular-nums text-[var(--good)]">
                          {currency(totalClean)}
                        </td>
                        <td />
                      </tr>
                    </>
                  );
                })()}
              </tfoot>
            </table>
          </div>
          <div className="px-3 py-2 text-[var(--muted)] text-xs text-right">
            {t("table.note", { pct: launderingPctApplied })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
