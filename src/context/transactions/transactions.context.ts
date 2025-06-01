import type { NewTransaction, Transaction } from "@/domain/interfaces/transaction"
import type { SimpleResult } from "@/types/results"
import { createContext, useContext } from "react"
import type { PaginationInfo } from "./transactions.provider"

interface TransactionsContextType {
  transactionList: Transaction[]
  transactionsLoading:boolean
  paginationInfo: PaginationInfo
  newTransaction: (newTransactions:NewTransaction) => Promise<SimpleResult>
  editTransaction: (transactionId:Transaction) => Promise<SimpleResult>
  removeTransaction: (transactionId:string) => Promise<SimpleResult>
  handlePage: (newPage:number) => void
  refreshTransactions: () => void
}

export const TransactionsContext = createContext<TransactionsContextType | null>(null)

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext)
  if (!context) throw new Error("useTransactions must be used within an TransactionsProvider")
  return context
}

