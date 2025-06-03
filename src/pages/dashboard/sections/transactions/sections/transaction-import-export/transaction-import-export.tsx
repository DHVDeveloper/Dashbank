import { useAlertContext } from '@/context/alert/alert.context.ts'
import { useBalanceOverviewContext } from '@/context/balance-overview/balance-overview.context.ts'
import { useTransactionsContext } from '@/context/transactions/transactions.context.ts'
import type { NewTransaction } from '@/domain/interfaces/transaction.ts'
import { TransactionExportButton } from './transaction-export.button.tsx'
import { TransactionImportButton } from './transaction-import.button'


export function TransactionImportExport() {
  const {transactionList, refreshTransactions,handleImportTransactions, transactionsLoading} = useTransactionsContext()
  const {refreshBalance} = useBalanceOverviewContext()
  const {showAlert} = useAlertContext()
  
  const handleImportCsv = async (transactionsToImport:NewTransaction[]) => {
    const response = await handleImportTransactions(transactionsToImport)
    if (!response.success) {
      showAlert({
        type: "danger",
        message: response.errorMessage ?? "Failed on import CSV data.",
      })
      return
    }
    refreshTransactions()
    refreshBalance()
    showAlert({ type: "success", message: "Transaction imported successfully." })
  } 

  return (
    <div className="flex w-full gap-2 md:w-fit">
      <TransactionImportButton onImport={handleImportCsv}/>
      {!transactionsLoading && transactionList.length > 0 && (
        <TransactionExportButton transactions={transactionList}/>
      )}
    </div>
  )
}
