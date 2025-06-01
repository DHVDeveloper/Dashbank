import { useTransactionsContext } from "@/context/transactions/transactions.context"
import { TransactionsList } from "./transaction-list"
import { TransactionListPagination } from "./transaction-list-pagination"

export function TransactionListSection() {
  const { transactionList, paginationInfo, transactionsLoading, handlePage } =
    useTransactionsContext()
  const handlePagination = (newPage: number) => {
    handlePage(newPage)
  }

  return (
    <div className="flex-1 pb-4">
      <TransactionListPagination
        paginationInfo={paginationInfo}
        onPageChange={handlePagination}
      >
        <TransactionsList
          transactionList={transactionList}
          transactionsLoading={transactionsLoading}
        />
      </TransactionListPagination>
    </div>
  )
}
