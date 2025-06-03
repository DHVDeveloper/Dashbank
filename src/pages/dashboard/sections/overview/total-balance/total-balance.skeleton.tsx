import { Wallet } from "@/ui/icons/wallet.icon";

export function TotalBalanceSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl flex-1 bg-gradient-to-br from-black to-gray-800 p-8 text-white animate-pulse">
      <div className="absolute inset-0 bg-black/5"></div>
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
          <div className="h-10 w-40 bg-white/30 rounded mb-2" />
          <div className="h-4 w-16 bg-white/20 rounded" />
        </div>
      </div>
    </div>
  );
}
