import { useMemo, useState, useContext, type FC } from "react";
import "../../theme.css";
import { useI18n } from "../../i18n";
import ThemeSwitch from "../../components/ThemeSwitch";
import { currency } from "../../utils/constants";
import { GlobalContext } from "../../contexts/Context";
import Header from "../../components/Header";
import CraftList from "./Crafts/CraftList";
import IngredientList from "./Ingredients/IngredientList";
import Tabs from "../../components/Tabs";
import Dashboard from "./Dashboard/Dashboard";
import data from "../../data/items.json";

const HomeScreen: FC = () => {
  const {
    launderingPercentage,
    setCustomLaunderingPercentage,
    theme,
    setTheme,
    baseItems,
    customLaunderingPercentage,
  } = useContext(GlobalContext) || {
    launderingPercentage: 20,
    setCustomLaunderingPercentage: () => {},
    theme: "blue",
    setTheme: () => {},
    baseItems: {},
    customLaunderingPercentage: 20,
  };

  const t = useI18n();

  const [tab, setTab] = useState<"craft" | "items">("craft");

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [craftQuery, setCraftQuery] = useState("");
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<
    "all" | "vandalism" | "racket" | "robbery" | "trash"
  >("all");
  const [econOpen, setEconOpen] = useState<Record<string, boolean>>({});

  const flatItems = useMemo(
    () =>
      Object.entries(data as any).flatMap(([category, list]: any) =>
        Array.isArray(list)
          ? list.map((item: any) => ({ ...item, category }))
          : []
      ),
    []
  );

  const handleQtyChange = (craftId: string, value: number) =>
    setQuantities((q) => ({ ...q, [craftId]: value }));

  const categoriesOrder: Array<
    "all" | "vandalism" | "racket" | "robbery" | "trash"
  > = ["all", "vandalism", "racket", "robbery", "trash"];

  const appliedPct = (customLaunderingPercentage ??
    launderingPercentage) as number;

  return (
    <div
      className={[
        "min-h-screen w-full transition-colors duration-200",
        "bg-[var(--bg)] text-[var(--ink)]",
        theme === "red" ? "theme-red" : "theme-blue",
      ].join(" ")}
    >
      <header className="border-[var(--line)]/60 border-b">
        <div className="mx-auto px-4 md:px-6 py-4 w-full max-w-7xl">
          <div className="flex justify-between items-start md:items-center gap-4">
            <Header theme={theme} t={t} />
            <ThemeSwitch
              theme={theme}
              onChange={setTheme}
              labelRed={t("theme.red")}
              labelBlue={t("theme.blue")}
            />
          </div>
        </div>
      </header>

      <section className="mx-auto px-4 md:px-6 py-6 md:py-8 w-full max-w-7xl">
        <Dashboard
          t={t as any}
          quantities={quantities}
          launderingPctApplied={appliedPct}
          baseItems={baseItems as any}
          setLaunderingPct={setCustomLaunderingPercentage as any}
        />
      </section>

      <section className="mx-auto px-4 md:px-6 pb-10 w-full max-w-7xl">
        <div className="flex items-center mb-4">
          <div className="font-semibold text-[var(--muted)] text-sm">
            {t("app.subtitle", {
              recipes: t("tabs.recipes"),
              items: t("tabs.items"),
            })}
          </div>
          <Tabs
            options={[
              { id: "craft", label: t("tabs.recipes") },
              { id: "items", label: t("tabs.items") },
            ]}
            value={tab}
            onChange={(v) => setTab(v as any)}
          />
        </div>

        {tab === "craft" && (
          <CraftList
            view="craft"
            data={data}
            craftQuery={craftQuery}
            setCraftQuery={setCraftQuery}
            quantities={quantities}
            baseItems={baseItems}
            launderingPercentage={appliedPct}
            econOpen={econOpen}
            setEconOpen={setEconOpen}
            handleQtyChange={handleQtyChange}
            t={t}
          />
        )}

        {tab === "items" && (
          <IngredientList
            view="items"
            t={t}
            categoriesOrder={categoriesOrder}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
            search={search}
            setSearch={setSearch}
            flatItems={flatItems}
            launderingPercentage={appliedPct}
            currency={currency}
          />
        )}
      </section>
    </div>
  );
};

export default HomeScreen;
