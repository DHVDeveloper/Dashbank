import { Button } from "@/ui/components/form/button"
import type { PaginationInfo } from "@/context/transactions/transactions.provider"

interface TransactionListPaginationProps {
  children: React.ReactNode
  paginationInfo: PaginationInfo
  onPageChange: (newPage: number) => void
}

export function TransactionListPagination({
  children,
  paginationInfo,
  onPageChange,
}: TransactionListPaginationProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1">{children}</div>
      
      <div className="flex items-center gap-2 justify-end">
        {paginationInfo.page > 1 && (
          <Button onClick={() => onPageChange(paginationInfo.page - 1)}>
            {'<'}
          </Button>
        )}
        <span>{paginationInfo.page}</span>
        <Button 
          onClick={() => onPageChange(paginationInfo.page + 1)} 
          disabled={paginationInfo.totalPages === paginationInfo.page}
        >
          {'>'}
        </Button>
      </div>
    </div>
  )
}