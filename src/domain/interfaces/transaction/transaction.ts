import type { Money } from "@/domain/interfaces/finance/money";

export type TransactionTypes = 'deposit' | 'withdrawal'

export interface Transaction {
    money: Money
    date: Date
    description: string
    transactionType: TransactionTypes
}