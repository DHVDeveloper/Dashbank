import type { NewTransaction, Transaction } from "@/domain/interfaces/transaction";
import type { NewTransactionRequest, TransactionRequest } from "../interfaces/transaction.external";
import { Currency } from "@/domain/interfaces/money";
import { CurrencyRepository } from "../interfaces/money.external";

export function mapNewtransactionToNewTransactionRequest(transaction:NewTransaction): NewTransactionRequest {
    return {
        date: transaction.date.toISOString(),
        description: transaction.description,
        transactionType: transaction.transactionType,
        money: {
            amount: transaction.money.amount,
            currency: mapCurrencyToCurrencyResponse(transaction.money.currency)
        },
    }
}

export function mapTransactionToTransactionRequest(transaction:Transaction): TransactionRequest {
    return {
        id: transaction.id,
        date: transaction.date.toISOString(),
        createdAt: transaction.createdAt.toISOString(),
        description: transaction.description,
        transactionType: transaction.transactionType,
        money: {
            amount: transaction.money.amount,
            currency: mapCurrencyToCurrencyResponse(transaction.money.currency)
        },
    }
}

export function mapCurrencyToCurrencyResponse(currency: Currency): CurrencyRepository {
  switch (currency) {
    case Currency.EUR:
      return CurrencyRepository.EUR;
    case Currency.KES:
      return CurrencyRepository.KES;
  }
}