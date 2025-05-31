import type { ApiResponse } from "@/types/apiResponse"
import type { TransactionRequest } from "../interfaces/transaction.external"

export function createNewTransaction(
  transaction: TransactionRequest
): Promise<ApiResponse<TransactionRequest>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactionListStorage = localStorage.getItem("transactions")
      const transactionList: TransactionRequest[] = transactionListStorage ? JSON.parse(transactionListStorage) : []

      transactionList.push(transaction)

      localStorage.setItem("transactions", JSON.stringify(transactionList))

      resolve({
        success: true,
        data: transaction
      })
    }, 200)
  })
}