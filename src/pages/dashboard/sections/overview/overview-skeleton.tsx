import { TotalBalanceSkeleton } from "./total-balance/total-balance.skeleton";
import { MovementCardSkeleton } from "@/ui/components/card/movement-card/movement-card.skeleton";

export function OverviewSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <TotalBalanceSkeleton />
      
      <div className="flex flex-col min-w-full xl:min-w-[25%] md:flex-row xl:flex-col gap-2">
        <MovementCardSkeleton />
        <MovementCardSkeleton />
      </div>
    </div>
  );
}