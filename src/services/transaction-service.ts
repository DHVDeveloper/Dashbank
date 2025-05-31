import type { Transaction } from "@/domain/interfaces/transaction/transaction";
import type { TransactionRequest } from "@/infraestructure/interfaces/transaction.external";
import { maptransactionToTransactionRequest } from "@/infraestructure/mapper/transaction.external.mapper";
import { createNewTransaction } from "@/infraestructure/repository/transaction-repository";
import type { ApiResponse } from "@/types/apiResponse";

export const transactionService = {
    newTransaction: newTransaction,
}

async function newTransaction(transaction:Transaction): Promise<ApiResponse<TransactionRequest>> {
    const transactioRequest:TransactionRequest = maptransactionToTransactionRequest(transaction)
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

