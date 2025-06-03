import type {
  NewTransaction,
  Transaction,
  TransactionFilters,
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
  const [filters, setFilters] = useState<TransactionFilters>({
    description: "",
    dateFrom: null,
    dateTo: null,
    transactionType: null,
  })
  const [transactionList, setTransactionList] = useState<Transaction[]>([])
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    page: 1,
    pageSize: 20,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getTransactionHistory()
  }, [paginationInfo.page, paginationInfo.pageSize])

  useEffect(() => {
    if (paginationInfo.page !== 1) {
      setPaginationInfo(prev => ({ ...prev, page: 1 }))
    } else {
      getTransactionHistory()
    }
  }, [filters])

  const handlePage = (newPage: number) => {
    if (newPage > paginationInfo.totalPages || newPage < 1) return
    setPaginationInfo(prev => ({ ...prev, page: newPage }))
  }

  const getTransactionHistory = async (): Promise<SimpleResult> => {
    setIsLoading(true)
    try {
      const response = await transactionService.getTransactionHistory(
        paginationInfo.page,
        paginationInfo.pageSize,
        filters
      )
      
      setTransactionList(response?.data?.data ?? [])
      setPaginationInfo(prev => ({
        ...prev,
        page: response.data?.page ?? prev.page,
        totalPages: response.data?.totalPages ?? 0,
      }))
      
      return {
        success: response.success,
        errorMessage: response?.error,
      }
    } finally {
      setIsLoading(false)
    }
  }

  const refreshTransactions = async () => {
    return await getTransactionHistory()
  }

  const editTransaction = async (transaction: Transaction): Promise<SimpleResult> => {
    const result = await transactionService.editTransaction(transaction)
    if(result.success) refreshTransactions()
    return {
      success: result.success,
      errorMessage: result?.error,
    }
  }

  const removeTransaction = async (transactionId: string): Promise<SimpleResult> => {
    const result = await transactionService.removeTransaction(transactionId)
    if(result.success) refreshTransactions()
    return {
      success: result.success,
      errorMessage: result?.error,
    }
  }

  const newTransaction = async (newTransactionData: NewTransaction): Promise<SimpleResult> => {
    const result = await transactionService.newTransaction(newTransactionData)
    
    if (paginationInfo.page !== 1) {
      setPaginationInfo(prev => ({ ...prev, page: 1 }))
    } else {
      await refreshTransactions()
    }
    
    return {
      success: result.success,
      errorMessage: result.error,
    }
  }

  const revertLastTransaction = async () => {
    const result = await transactionService.revertLastTransaction()
    if (paginationInfo.page !== 1) {
      setPaginationInfo(prev => ({ ...prev, page: 1 }))
    } else {
      await refreshTransactions()
    }
    return result
  }

  const handleFilters = (newFilter: Partial<TransactionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilter }))
  }

  const resetFilters = () => {
    setFilters({
      description: "",
      dateFrom: null,
      dateTo: null,
      transactionType: null,
    })
  }

  const handleImportTransactions = async (transactions:NewTransaction[]) => {
    setIsLoading(true)
    const result = await transactionService.importTransactions(transactions)
    setIsLoading(false)
    return result
  }

  return (
    <TransactionsContext.Provider
      value={{
        currentFilters: filters,
        transactionsLoading: isLoading,
        paginationInfo,
        transactionList,
        editTransaction,
        newTransaction,
        removeTransaction,
        refreshTransactions,
        revertLastTransaction,
        handlePage,
        handleFilters,
        handleImportTransactions,
        resetFilters,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}