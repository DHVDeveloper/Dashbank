import { useEffect, useRef, useState } from "react"
import { useTransactionsContext } from "@/context/transactions/transactions.context"
import { TransactionItem } from "./transaction-item"
import { TransactionItemSkeleton } from "./transaction-item.skeleton"
import { useAlertContext } from "@/context/alert/alert.context"
import { Modal } from "@/ui/components/modal/modal"
import { TransactionForm } from "../transaction-create/transaction-form"
import type { NewTransaction, Transaction } from "@/domain/interfaces/transaction"
import { useBalanceOverviewContext } from "@/context/balance-overview/balance-overview.context"

type ModalMode = "edit" | "reuse" | null

interface TransactionsListProps {
  transactionList: Transaction[]
  transactionsLoading: boolean
}

export function TransactionsList({ transactionList, transactionsLoading}: TransactionsListProps) {
  const {
    refreshTransactions,
    removeTransaction,
    editTransaction,
    newTransaction,
  } = useTransactionsContext()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [transactionModal, setTransactionModal] = useState<Transaction | null>(null)
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const {refreshBalance} = useBalanceOverviewContext()
  const containerRef = useRef<HTMLDivElement>(null)
  const { showAlert } = useAlertContext()

  useEffect(() => {
    if (transactionModal && modalMode) {
      setIsModalOpen(true)
    }
  }, [transactionModal, modalMode])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [transactionList])

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
    refreshBalance()
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
      refreshBalance()
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
      refreshBalance()
      showAlert({ type: "success", message: "The transaction has been created successfully." })
    }
    closeModal()
  }

  return (
    <>
      <div ref={containerRef} className="flex flex-col h-[25rem] overflow-y-auto p-2 gap-2 py-2">
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
      </div>
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
    </>
  )
}