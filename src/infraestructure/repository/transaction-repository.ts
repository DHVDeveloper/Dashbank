import type {
  Transaction,
  TransactionFilters,
} from "@/domain/interfaces/transaction"
import type { ApiResponse, PaginatedResponse } from "@/types/api-response"
import type {
  NewTransactionRequest,
  TransactionRequest,
  TransactionResponse,
} from "../interfaces/transaction.external"

export function createNewTransaction(
  transaction: NewTransactionRequest
): Promise<ApiResponse<NewTransactionRequest>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactionListStorage = localStorage.getItem("transactions")
      const transactionList: TransactionResponse[] = transactionListStorage
        ? JSON.parse(transactionListStorage)
        : []
      const id =
        Date.now().toString(36) + Math.random().toString(36).substring(2)
      transactionList.push({ id: id, createdAt: new Date().toISOString(), ...transaction })

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
  size: number,
  filters?: Partial<TransactionFilters>
): Promise<ApiResponse<PaginatedResponse<TransactionResponse>>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactionListStorage = localStorage.getItem("transactions")
      const allTransactions: TransactionResponse[] = transactionListStorage
        ? JSON.parse(transactionListStorage)
        : []
      
      let transactionsToReturn = [...allTransactions]
      transactionsToReturn.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

      if (filters) {
        transactionsToReturn = getTransactionsByFilters(filters, transactionsToReturn)
      }

      const startItemIndex = (page - 1) * size
      const endItemIndex = startItemIndex + size
      const paginatedData = transactionsToReturn.slice(startItemIndex, endItemIndex)
      const total = transactionsToReturn.length
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

      const transactionListEdited = transactionList.filter(
        (transaction) => transaction.id !== transactionId
      )

      localStorage.setItem(
        "transactions",
        JSON.stringify(transactionListEdited)
      )

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
        if (transaction.id === transactionToEdit.id) {
          return { ...transaction, ...transactionToEdit }
        }
        return transaction
      })

      localStorage.setItem(
        "transactions",
        JSON.stringify(transactionListEdited)
      )

      resolve({
        success: true,
      })
    }, 200)
  })
}

export function getTransactionsByFilters(
  filters: Partial<TransactionFilters>,
  allTransactions: TransactionResponse[]
): TransactionResponse[] {
  const transactionsFiltered = allTransactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date)
    if (
      filters.description && 
      filters.description !== "" && 
      !transaction.description
        .toLowerCase()
        .includes(filters.description.toLowerCase())
    ) {
      return false
    }

    if (
      filters.transactionType &&
      transaction.transactionType !== filters.transactionType
    ) {
      return false
    }

    if (filters.dateFrom && transactionDate <= filters.dateFrom) {
      return false
    }

    if (filters.dateTo && transactionDate >= filters.dateTo) {
      return false
    }

    return true
  })

  return transactionsFiltered
}


export function revertLastCreatedTransaction(): Promise<ApiResponse<Transaction>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactionListStorage = localStorage.getItem("transactions");
      const transactionList: TransactionResponse[] = transactionListStorage
        ? JSON.parse(transactionListStorage)
        : [];

      if (transactionList.length === 0) {
        resolve({
          success: false,
          error: "There are no transactions to reverse"
        });
        return;
      }

      const sortedTransactions = [...transactionList].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const lastTransaction = sortedTransactions[0];

      const transactionListEdited = transactionList.filter(
        transaction => transaction.id !== lastTransaction.id
      );

      localStorage.setItem(
        "transactions",
        JSON.stringify(transactionListEdited)
      );

      resolve({
        success: true
      });
    }, 200);
  });
}