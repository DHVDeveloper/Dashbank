import type { NewTransaction, Transaction, TransactionFilters } from "@/domain/interfaces/transaction";
import { mapTransactionListRequestToTransactionList } from "@/domain/mappers/transaction.mapper";
import type { NewTransactionRequest, TransactionRequest } from "@/infraestructure/interfaces/transaction.external";
import { mapNewTransactionsListToNewTransactionRequestList, mapNewtransactionToNewTransactionRequest, mapTransactionToTransactionRequest } from "@/infraestructure/mappers/transaction.external.mapper";
import { createNewTransaction, editTransactionByTransaction, getTransactionHistoryData, importTransactionsFromList, removeTransactionById, revertLastCreatedTransaction } from "@/infraestructure/repository/transaction-repository";
import type { ApiResponse, PaginatedResponse } from "@/types/api-response";

export const transactionService = {
    getTransactionHistory: getTransactionHistory,
    newTransaction: newTransaction,
    removeTransaction: removeTransaction,
    editTransaction: editTransaction,
    revertLastTransaction: revertLastTransaction,
    importTransactions: importTransactions
}

async function newTransaction(transaction:NewTransaction): Promise<ApiResponse<NewTransactionRequest>> {
    const transactioRequest:NewTransactionRequest = mapNewtransactionToNewTransactionRequest(transaction)
    const response = await createNewTransaction(transactioRequest)
    if(!response.success) {
        return({
            success: false,
            error: response.error
        })
    }
    return {
        success: response.success
    }
}

async function getTransactionHistory(page:number, size:number, filters?:Partial<TransactionFilters>): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    const response = await getTransactionHistoryData(page, size,filters)
    if(!response.success || !response.data) {
        return({
            success: false,
            error: response.error
        })
    }
    return {
        success: response.success,
        data: {...response.data, data: mapTransactionListRequestToTransactionList(response.data.data)} 
    }
}

async function removeTransaction(transactionId:string): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    const response = await removeTransactionById(transactionId)
    if(!response.success) {
        return({
            success: false,
            error: response.error
        })
    }
    return {
        success: response.success
    }
}

async function editTransaction(transaction:Transaction): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    const transactionRequest:TransactionRequest = mapTransactionToTransactionRequest(transaction)
    const response = await editTransactionByTransaction(transactionRequest)
    if(!response.success) {
        return({
            success: false,
            error: response.error
        })
    }
    return {
        success: response.success
    }
}

async function revertLastTransaction(): Promise<ApiResponse<Transaction>> {
    const response = await revertLastCreatedTransaction()
    if(!response.success) {
        return({
            success: false,
            error: response.error
        })
    }
    return {
        success: response.success
    }
}

async function importTransactions(transactions:NewTransaction[]): Promise<ApiResponse<PaginatedResponse<Transaction[]>>> {
    const transactionRequest:NewTransactionRequest[] = mapNewTransactionsListToNewTransactionRequestList(transactions)
    const response = await importTransactionsFromList(transactionRequest)
    if(!response.success) {
        return({
            success: false,
            error: response.error
        })
    }
    return {
        success: response.success
    }
}