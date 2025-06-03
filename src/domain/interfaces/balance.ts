import type { Money } from "./money"

export interface Balance {
  totalBalance: Money
  incomeBalance: Money
  expensesBalance: Money
}

export interface BalanceValidation {
  success: boolean;
  errorMessage?: string;
  currentBalance?: number;
}