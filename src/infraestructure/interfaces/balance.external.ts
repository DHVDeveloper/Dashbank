import type { MoneyRepository } from "./money.external"

export interface BalanceResponse {
  totalBalance: MoneyRepository
  incomeBalance: MoneyRepository
  expensesBalance: MoneyRepository
}
