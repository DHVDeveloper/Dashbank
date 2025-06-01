import type { MoneyRepository } from "./money.external"


type TransactionTypesRepository = 'deposit' | 'withdrawal'

export interface NewTransactionRequest {
    money: MoneyRepository
    date: Date
    description: string
    transactionType: TransactionTypesRepository
}

export interface TransactionResponse extends NewTransactionRequest{
    id: string
}


