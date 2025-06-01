import { useTransactionsContext } from "@/context/transactions/transactions.context"
import { TransactionItem } from "./transaction-item"
import { TransactionItemSkeleton } from "./transaction-item.skeleton"
import { useAlertContext } from "@/context/alert/alert.context"
import { Modal } from "@/ui/components/modal/modal"
import { TransactionForm } from "../transaction-create/transaction-form"
import { useEffect, useState } from "react"
import type { NewTransaction, Transaction } from "@/domain/interfaces/transaction"

type ModalMode = "edit" | "reuse" | null

export function TransactionsList() {
  const {
    transactionList,
    transactionsLoading,
    refreshTransactions,
    removeTransaction,
    editTransaction,
    newTransaction,
  } = useTransactionsContext()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [transactionModal, setTransactionModal] = useState<Transaction | null>(null)
  const [modalMode, setModalMode] = useState<ModalMode>(null)

  const { showAlert } = useAlertContext()

  useEffect(() => {
    if (transactionModal && modalMode) {
      setIsModalOpen(true)
    }
  }, [transactionModal, modalMode])


  const openModal = (transaction: Transaction, mode: ModalMode) => {
    setTransactionModal(transaction)
    setModalMode(mode)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalMode(null)
    setIsModalLoading(false)
  }

  const handleEditTransaction = (id: string) => {
    const transaction = transactionList.find((t) => t.id === id)
    if (transaction) {
      openModal(transaction, "edit")
    }
  }

  const handleReuseTransaction = (id: string) => {
    const transaction = transactionList.find((t) => t.id === id)
    if (transaction) {
      openModal(transaction, "reuse")
    }
  }

  const handleRemoveTransaction = async (transactionId: string) => {
    const response = await removeTransaction(transactionId)
    if (!response.success) {
      showAlert({
        type: "danger",
        message: response.errorMessage ?? "Failed to delete the transaction.",
      })
      return
    }
    refreshTransactions()
    showAlert({ type: "success", message: "Transaction deleted successfully." })
  }

  const handleSubmit = async (data: NewTransaction) => {
    if (!transactionModal || !modalMode) return
    setIsModalLoading(true)

    if (modalMode === "edit") {
      const updated: Transaction = { ...transactionModal, ...data }
      const response = await editTransaction(updated)

      if (!response.success) {
        showAlert({
          type: "danger",
          message: response.errorMessage ?? "Failed to edit the transaction.",
        })
        return
      }

      showAlert({ type: "success", message: "The transaction has been edited successfully." })
    }

    if (modalMode === "reuse") {
      const response = await newTransaction(data)
      if (!response.success) {
        showAlert({
          type: "danger",
          message: response.errorMessage ?? "Failed to create the transaction.",
        })
        return
      }
      showAlert({ type: "success", message: "The transaction has been created successfully." })
    }

    refreshTransactions()
    closeModal()
  }

  return (
    <div className="flex flex-col h-[400px] overflow-y-auto p-2 gap-2 py-2">
      {transactionsLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <TransactionItemSkeleton key={index} />
          ))
        : transactionList.length > 0 &&
          transactionList.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              handleEditTransaction={handleEditTransaction}
              handleRemoveTransaction={handleRemoveTransaction}
              handleReuseTransaction={handleReuseTransaction}
            />
          ))}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClosed={closeModal}
        title={modalMode === "edit" ? "Edit Transaction" : "Reuse Transaction"}
      >
        <TransactionForm
          transaction={transactionModal ?? undefined}
          isLoading={isModalLoading}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </Modal>
    </div>
  )
}
