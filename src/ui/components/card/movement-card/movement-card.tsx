import type { Money } from "../../../../domain/interfaces/money";
import { formatMoney } from "../../../../utils/formatMoney";
import { ArrowUpRight } from "../../../icons/arrow-up-right.icon";

interface MovementsCardProps {
  title: string;
  isExpense: boolean;
  money: Money;
}

export function MovementCard({
  isExpense,
  money,
  title,
}: MovementsCardProps) {
  const amountColor = isExpense ? "text-red-500" : "text-green-500"
  const iconColor = isExpense
    ? "text-red-500  bg-red-100"
    : "text-green-500 bg-green-100"
  const iconRotation = isExpense ? "rotate-90" : ""

  return (
    <div className="bg-secondary-bg-color transition-colors text-primary-text-color/60 shadow  rounded-2xl w-full h-full px-3 py-2 items-center">
      <div className="flex justify-start w-full h-full items-center gap-5">
        <ArrowUpRight
          className={`h-[45px] w-[45px] ${iconColor} dark:bg-[#2c2c2c] p-2 rounded-lg transform ${iconRotation}`}
        />
        <div className="flex flex-col justify-center items-start">
          <p className="text-xs ">{title}</p>
          <div className={`text-2xl font-semibold w-full text-start ${amountColor}`}>
            {formatMoney(money)}
          </div>
        </div>
      </div>
    </div>
  )
}
