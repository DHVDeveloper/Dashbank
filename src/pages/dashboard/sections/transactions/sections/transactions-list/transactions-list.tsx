import { useTransactionsContext } from "@/context/transactions/transactions.context";
import { TransactionItem } from "./transaction-item";
import { TransactionItemSkeleton } from "./transaction-item.skeleton";
import { useAlertContext } from "@/context/alert/alert.context";

export function TransactionsList() {
  const { transactionList, transactionsLoading, removeTransaction } = useTransactionsContext();
  const {showAlert} = useAlertContext()
  
  const handleEditTransaction = (id: string) => {
    
  };

  const handleRemoveTransaction = async (transactionId: string) => {
    const response = await removeTransaction(transactionId)
    if(!response.success){
      showAlert({type: 'danger', message: response.errorMessage ?? 'Failed to delete the transaction.'})
      return
    }
    showAlert({type: 'success', message: 'Transaction deleted successfully.'})
  };

  const handleReuseTransaction = (id: string) => {

  };

  return (
    <div className="flex flex-col h-[400px] overflow-y-auto p-2 gap-2 py-2">
      {transactionsLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <TransactionItemSkeleton key={index} />
          ))
        : transactionList.length > 0 &&
          transactionList.map((transaction, key) => (
            <TransactionItem
              key={key}
              transaction={transaction}
              handleEditTransaction={handleEditTransaction}
              handleRemoveTransaction={handleRemoveTransaction}
              handleReuseTransaction={handleReuseTransaction}
            />
          ))}
    </div>
  );
}
