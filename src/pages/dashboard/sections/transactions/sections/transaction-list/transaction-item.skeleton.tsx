export function TransactionItemSkeleton() {
  return (
    <div className="flex flex-col gap-5 bg-secondary-bg-color shadow items-center p-3 rounded-lg hover:secondary-bg-color/80 sm:flex-row sm:p-4 animate-pulse">
      <div className="flex flex-1 w-full flex-col gap-4 items-start md:items-center md:flex-row sm:w-auto">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center w-full gap-2 sm:w-auto">
            <div className="h-6 w-20 bg-muted-bg-color rounded-full"></div>
            <div className="h-4 w-16 bg-muted-bg-color rounded"></div>
          </div>
          <div className="block sm:hidden">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 w-6 bg-muted-bg-color rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-4 w-full max-w-[300px] bg-muted-bg-color rounded"></div>
      </div>

      <div className="flex items-end w-full justify-end gap-4 flex-col sm:flex-row sm:w-auto sm:items-center sm:min-w-[30%]">
        <div className="h-8 w-24 bg-muted-bg-color rounded"></div>
        <div className="hidden sm:flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 w-6 bg-muted-bg-color rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}