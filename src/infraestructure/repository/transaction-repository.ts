import type { Transaction } from "@/domain/interfaces/transaction"
import type { ApiResponse, PaginatedResponse } from "@/types/apiResponse"
import type { NewTransactionRequest, TransactionRequest, TransactionResponse } from "../interfaces/transaction.external"

export function createNewTransaction(
  transaction: NewTransactionRequest
): Promise<ApiResponse<NewTransactionRequest>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactionListStorage = localStorage.getItem("transactions")
      const transactionList: TransactionResponse[] = transactionListStorage
        ? JSON.parse(transactionListStorage)
        : []
      const id = Date.now().toString(36) + Math.random().toString(36).substring(2)
      transactionList.push({id: id,...transaction})

      localStorage.setItem("transactions", JSON.stringify(transactionList))

      resolve({
        success: true,
        data: transaction,
      })
    }, 200)
  })
}

export function getTransactionHistoryData(
  page: number,
  size: number
): Promise<ApiResponse<PaginatedResponse<TransactionResponse>>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactionListStorage = localStorage.getItem("transactions")
      const allTransactions: TransactionResponse[] = transactionListStorage
        ? JSON.parse(transactionListStorage)
        : []

      const startItemIndex = (page - 1) * size
      const endItemIndex = startItemIndex + size
      const paginatedData = allTransactions.slice(startItemIndex, endItemIndex)
      const total = allTransactions.length
      const totalPages = Math.ceil(total / size)

      if (page > totalPages && totalPages > 0) {
        resolve({
          success: false,
          error: `Page ${page} does not exist. Total pages: ${totalPages}`,
        })
        return
      }

      resolve({
        success: true,
        data: {
          data: paginatedData,
          total,
          page,
          pageSize: size,
          totalPages,
        },
      })
    }, 200)
  })
}

export function removeTransactionById(
  transactionId: string
): Promise<ApiResponse<Transaction>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactionListStorage = localStorage.getItem("transactions")
      const transactionList: TransactionResponse[] = transactionListStorage
        ? JSON.parse(transactionListStorage)
        : []
        
      const transactionListEdited = transactionList.filter((transaction) => transaction.id !== transactionId)

      localStorage.setItem("transactions", JSON.stringify(transactionListEdited))

      resolve({
        success: true,
      })
    }, 200)
  })
}

export function editTransactionByTransaction(
  transactionToEdit: TransactionRequest
): Promise<ApiResponse<Transaction>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactionListStorage = localStorage.getItem("transactions")
      const transactionList: TransactionResponse[] = transactionListStorage
        ? JSON.parse(transactionListStorage)
        : []
        
      const transactionListEdited = transactionList.map((transaction) => {
        if(transaction.id === transactionToEdit.id) {
          return {...transaction, ...transactionToEdit}
        } 
        return transaction
      })

      localStorage.setItem("transactions", JSON.stringify(transactionListEdited))

      resolve({
        success: true,
      })
    }, 200)
  })
}