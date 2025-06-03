export function MovementCardSkeleton() {
  return (
    <div className="bg-secondary-bg-color shadow rounded-2xl w-full h-full px-3 py-2 animate-pulse">
      <div className="flex justify-center h-full items-center gap-5">
        <div className="h-[45px] w-[45px] bg-muted-bg-color rounded-lg" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-24 bg-muted-bg-color rounded" />
          <div className="h-6 w-32 bg-muted-bg-color rounded" />
        </div>
      </div>
    </div>
  )
}