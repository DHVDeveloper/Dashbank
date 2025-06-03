import type { Money } from "./money"

export interface Balance {
  totalBalance: Money
  incomeBalance: Money
  expensesBalance: Money
}
