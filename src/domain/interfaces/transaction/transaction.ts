import type { Money } from "@/domain/interfaces/finance/money";

export type TransactionTypes = 'deposit' | 'withdrawal'

export interface NewTransaction {
    money: Money
    date: Date
    description: string
    transactionType: TransactionTypes
}

