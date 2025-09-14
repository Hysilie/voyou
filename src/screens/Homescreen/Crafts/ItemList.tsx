import type { FC, PropsWithChildren } from "react";
import BadgeCustom from "../../../components/BadgeCustom";

interface ItemListProps extends PropsWithChildren {
  totals: Array<{
    itemId: string;
    totalNeeded: number;
    item?: {
      emoji?: string;
      name?: string;
      dirtyValue?: number;
    };
  }>;
}

const ItemList: FC<ItemListProps> = ({ totals = [] }) => {
  return (
    <div className="flex gap-2 bg-[var(--surface)] mt-3 w-full">
      {totals?.map((tRow: any) => (
        <div key={tRow.itemId} className="flex items-center gap-2">
          <BadgeCustom>
            <span className="text-[10px]">
              <span className="justify-self-end pr-1 tabular-nums text-[var(--muted)] pr">
                × {tRow.totalNeeded}
              </span>
              {tRow.item?.emoji}{" "}
              <span className="hidden xl:inline-block">{tRow.item?.name}</span>
            </span>
          </BadgeCustom>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
