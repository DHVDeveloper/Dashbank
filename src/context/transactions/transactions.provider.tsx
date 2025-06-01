import type {
  NewTransaction,
  Transaction,
} from "@/domain/interfaces/transaction"
import { transactionService } from "@/services/transaction-service"
import type { SimpleResult } from "@/types/results"
import { useEffect, useState } from "react"
import { TransactionsContext } from "./transactions.context"

export interface PaginationInfo {
  page: number
  pageSize: number
  totalPages: number
}

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [transactionList, setTransactionList] = useState<Transaction[]>([])
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    page: 1,
    pageSize: 20,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getTransactionHistory()
  }, [paginationInfo.page])

  const handlePage = (newActualPage: number) => {
    if (newActualPage > paginationInfo.totalPages) return
    setPaginationInfo({ ...paginationInfo, page: newActualPage })
  }

  const getTransactionHistory = async (): Promise<SimpleResult> => {
    setIsLoading(true)
    const response = await transactionService.getTransactionHistory(paginationInfo.page, paginationInfo.pageSize)
    setTransactionList(response?.data?.data ?? [])
    setPaginationInfo({
      ...paginationInfo,
      totalPages: response.data?.totalPages ?? 0,
    })
    setIsLoading(false)
    return {
      success: response.success,
      errorMessage: response?.error,
    }
  }

  const refreshTransactions = () => {
    getTransactionHistory()
  }

  const editTransaction = async (
    transaction: Transaction
  ): Promise<SimpleResult> => {
    setIsLoading(true)
    const response = await transactionService.editTransaction(transaction)
    setIsLoading(false)
    return {
      success: response.success,
      errorMessage: response?.error,
    }
  }

  const removeTransaction = async (
    transactionId: string
  ): Promise<SimpleResult> => {
    setIsLoading(true)
    const response = await transactionService.removeTransaction(transactionId)
    setIsLoading(false)
    return {
      success: response.success,
      errorMessage: response?.error,
    }
  }

  const newTransaction = async (
    newTransaction: NewTransaction
  ): Promise<SimpleResult> => {
    setIsLoading(true)
    const response = await transactionService.newTransaction(newTransaction)
    setIsLoading(false)
    return {
      success: response.success,
      errorMessage: response.error,
    }
  }
  return (
    <TransactionsContext.Provider
      value={{
        transactionsLoading: isLoading,
        paginationInfo,
        transactionList,
        editTransaction,
        newTransaction,
        removeTransaction,
        refreshTransactions,
        handlePage,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
