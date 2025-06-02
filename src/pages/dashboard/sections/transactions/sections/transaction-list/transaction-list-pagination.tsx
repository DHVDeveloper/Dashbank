import { Button } from "@/ui/components/form/button"
import type { PaginationInfo } from "@/context/transactions/transactions.provider"
import { ChevronIcon } from "@/ui/icons/chevron.icon"

interface TransactionListPaginationProps {
  children: React.ReactNode
  paginationInfo: PaginationInfo
  isLoading: boolean
  onPageChange: (newPage: number) => void
}

export function TransactionListPagination({
  children,
  paginationInfo,
  isLoading,
  onPageChange,
}: TransactionListPaginationProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1">{children}</div>
      
      <div className="flex items-center gap-2 justify-end">
        {paginationInfo.page > 1 && (
          <Button disabled={isLoading} onClick={() => onPageChange(paginationInfo.page - 1)}>
            <ChevronIcon className="rotate-90"/>
          </Button>
        )}
        <span className="select-none">{paginationInfo.page}</span>
        <Button 
          onClick={() => onPageChange(paginationInfo.page + 1)} 
          disabled={paginationInfo.totalPages <= paginationInfo.page ||  isLoading}
        >
          <ChevronIcon className="-rotate-90"/>
        </Button>
      </div>
    </div>
  )
}