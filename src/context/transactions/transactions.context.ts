import type { NewTransaction, Transaction } from "@/domain/interfaces/transaction"
import type { SimpleResult } from "@/types/results"
import { createContext, useContext } from "react"

interface TransactionsContextType {
  transactionList: Transaction[]
  transactionsLoading:boolean
  newTransaction: (newTransactions:NewTransaction) => Promise<SimpleResult>
  editTransaction: (transactionId:Transaction) => Promise<SimpleResult>
  removeTransaction: (transactionId:string) => Promise<SimpleResult>
  refreshTransactions: () => void
}

export const TransactionsContext = createContext<TransactionsContextType | null>(null)

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext)
  if (!context) throw new Error("useTransactions must be used within an TransactionsProvider")
  return context
}

