import { useAlertContext } from "@/context/alert/alert.context"
import { useTransactionsContext } from "@/context/transactions/transactions.context"
import type { NewTransaction } from "@/domain/interfaces/transaction"
import { Button } from "@/ui/components/form/button"
import { Modal } from "@/ui/components/modal/modal"
import { useState } from "react"
import { TransactionForm } from "./transaction-form"

export function TransactionsCreate() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { showAlert } = useAlertContext()
  const {newTransaction} = useTransactionsContext()

  const handleCreateTransaction = async (transaction:NewTransaction) => {
    setIsLoading(true)
    const response = await newTransaction(transaction)
    if(!response.success) {
      showAlert({type: 'danger',message:response.errorMessage ?? 'Failed to create the transaction.'})
      return
    }
    showAlert({type: 'success',message: 'The transaction has been made successfully.'})
    setIsModalOpen(false)
    setIsLoading(false)
  }
  return (
    <div className="bg-red-500 flex-1 md:flex-0">
      <div className="flex justify-end w-full items-center">
        <Button
          className="w-full"
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          <span className="text-nowrap">+ New Transaction</span>
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New transaction"
      >
        <TransactionForm onClose={() => setIsModalOpen(false)} isLoading={isLoading} onSubmit={handleCreateTransaction}/>
      </Modal>
    </div>
  )
}
