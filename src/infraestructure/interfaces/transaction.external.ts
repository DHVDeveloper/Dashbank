import type { MoneyRepository } from "./money.external"


type TransactionTypesRepository = 'deposit' | 'withdrawal'

export interface NewTransactionRequest {
    money: MoneyRepository
    date: string
    description: string
    transactionType: TransactionTypesRepository
}

export interface TransactionResponse extends NewTransactionRequest{
    id: string
}

export interface TransactionRequest extends NewTransactionRequest{
    id: string
}



