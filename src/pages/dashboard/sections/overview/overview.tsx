import { useBalanceOverviewContext } from "@/context/balance-overview/balance-overview.context";
import { MovementCard } from "@/ui/components/card/movement-card/movement-card";
import { OverviewSkeleton } from "./overview-skeleton";
import { TotalBalance } from "./total-balance/total-balance";

export function Overview() {
  const {balance, balanceIsLoading} = useBalanceOverviewContext()

  if (balanceIsLoading)  {
    return <OverviewSkeleton />;
  }

  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <TotalBalance balance={balance.totalBalance} />
      
      <div className="flex flex-col min-w-full xl:min-w-[25%] md:flex-row xl:flex-col gap-2">
        <MovementCard
          title="Total Income"
          money={balance.incomeBalance}
          isExpense={false}
        />
        <MovementCard
          title="Total Expenses"
          money={balance.expensesBalance}
          isExpense={true}
        />
      </div>
    </div>
  );
}

