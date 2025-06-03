import { CurrencyRepository } from "@/infraestructure/interfaces/money.external"
import { Currency } from "../interfaces/money"

export function mapCurrencyResponseToCurrency(currency: CurrencyRepository): Currency {
  switch (currency) {
    case CurrencyRepository.EUR:
      return Currency.EUR
    case CurrencyRepository.KES:
      return Currency.KES
  }
}