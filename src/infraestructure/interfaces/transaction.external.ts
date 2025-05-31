import type { MoneyRepository } from "./money.external"


type TransactionTypesRepository = 'deposit' | 'withdrawal'

export interface TransactionRequest {
    money: MoneyRepository
    date: Date
    description: string
    transactionType: TransactionTypesRepository
}


