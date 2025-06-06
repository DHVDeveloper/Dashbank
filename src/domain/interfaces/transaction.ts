import type { Money } from "@/domain/interfaces/money";

export type TransactionTypes = 'deposit' | 'withdrawal'

export type TransactionHandleType = 'new' | 'edit'

export interface NewTransaction {
    money: Money
    date: Date
    description: string
    transactionType: TransactionTypes
}

export interface Transaction extends NewTransaction {
    id: string
    createdAt: Date
}

export interface TransactionFilters {
    description: string
    dateFrom: Date | null
    dateTo: Date | null
    transactionType: TransactionTypes | null
}


export interface TransactionToCheck {
    money:Money, 
    transactionType:TransactionTypes, 
    transactionHandleType:TransactionHandleType
}