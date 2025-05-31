import type { Money } from "@/domain/interfaces/finance/money";
import { Wallet } from "@/ui/icons/wallet.icon";
import { formatMoney } from "@/utils/formatMoney";


interface OverviewBalanceProps {
  balance: Money;
}

export function OverviewBalance({ balance }: OverviewBalanceProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl flex-1 bg-gradient-to-br from-black to-gray-800 p-8 text-white">
      <div className="absolute inset-0 bg-black/1"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg opacity-90">Available Balance</h2>
              <p className="text-sm opacity-70">Updated just now</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className={`text-5xl font-bold mb-2 text-white`}>
            {formatMoney(balance)}
          </div>
          <div className="flex items-center space-x-4 text-sm opacity-80">
            <span>{balance.currency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
