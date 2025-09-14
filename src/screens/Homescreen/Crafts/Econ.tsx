import React, { type FC } from "react";
import KPI from "../../../components/KPI";
import { currency } from "../../../utils/constants";
import { useI18n } from "../../../i18n";

interface EconProps {
  sell: number;
}

const Econ: FC<EconProps> = ({ sell }) => {
  const t = useI18n();
  return (
    <>
      <div className="flex flex-wrap gap-2 mt-4">
        <KPI label={t("econ.sell")} value={currency(sell)} tone={"good"} />
      </div>
    </>
  );
};

export default Econ;
