import type { Money } from "@/domain/interfaces/money";

export type TransactionTypes = 'deposit' | 'withdrawal'

export interface NewTransaction {
    money: Money
    date: Date
    description: string
    transactionType: TransactionTypes
}

export interface Transaction extends NewTransaction {
    id: string
}
