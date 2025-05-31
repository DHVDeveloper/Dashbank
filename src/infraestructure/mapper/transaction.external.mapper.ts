import type { NewTransaction } from "@/domain/interfaces/transaction/transaction";
import type { TransactionRequest } from "../interfaces/transaction.external";
import { Currency } from "@/domain/interfaces/finance/money";
import { CurrencyRepository } from "../interfaces/money.external";

export function maptransactionToTransactionRequest(transaction:NewTransaction): TransactionRequest {
    return {
        date: transaction.date,
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