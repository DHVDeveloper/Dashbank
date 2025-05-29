import { Currency } from "../../../../domain/finance/interfaces/money.interface";
import { MovementCard } from "../../../../ui/components/movement-card";
import { OverviewBalance } from "./overview-balance";

export function Overview() {
  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <OverviewBalance balance={{ amount: 5000, currency: Currency.USD }} />
      <div className="flex flex-col min-w-full xl:min-w-[25%]  md:flex-row xl:flex-col gap-2">
        <MovementCard
          title="Total Income"
          money={{ amount: 5000, currency: Currency.USD }}
          isExpense={false}
        />
        <MovementCard
          title="Total Expenses"
          money={{ amount: 5000, currency: Currency.USD }}
          isExpense={true}
        />
      </div>
    </div>
  );
}
