import type { TransactionResponse } from "@/infraestructure/interfaces/transaction.external";
import type { Transaction } from "../interfaces/transaction";
import { CurrencyRepository } from "@/infraestructure/interfaces/money.external";
import { Currency } from "../interfaces/money";

export function mapTransactionRequestToTransaction(transactionResponse:TransactionResponse): Transaction {
    return {
        id: transactionResponse.id,
        date: new Date(transactionResponse.date),
        createdAt: new Date(transactionResponse.createdAt),
        description: transactionResponse.description,
        transactionType: transactionResponse.transactionType,
        money: {
            amount: transactionResponse.money.amount,
            currency: mapCurrencyResponseToCurrency(transactionResponse.money.currency)
        },
    }
}

export function mapTransactionListRequestToTransactionList(transactionListResponse:TransactionResponse[]): Transaction[] {
    return(transactionListResponse.length > 0 ? 
        transactionListResponse.map(transaction => mapTransactionRequestToTransaction(transaction)) 
        : [])
}


export function mapCurrencyResponseToCurrency(currency: CurrencyRepository): Currency {
  switch (currency) {
    case CurrencyRepository.EUR:
      return Currency.EUR
    case CurrencyRepository.KES:
      return Currency.KES
  }
}