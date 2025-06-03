import type { BalanceResponse } from "@/infraestructure/interfaces/balance.external";
import type { Balance } from "../interfaces/balance";
import { mapCurrencyResponseToCurrency } from "./money.mapper";

export function mapBalanceResponseToBalance(
  balanceResponse: BalanceResponse
): Balance {
  return {
    totalBalance: {
      amount: balanceResponse.totalBalance.amount,
      currency: mapCurrencyResponseToCurrency(
        balanceResponse.totalBalance.currency
      ),
    },
    incomeBalance: {
      amount: balanceResponse.incomeBalance.amount,
      currency: mapCurrencyResponseToCurrency(
        balanceResponse.incomeBalance.currency
      ),
    },
    expensesBalance: {
      amount: balanceResponse.expensesBalance.amount,
      currency: mapCurrencyResponseToCurrency(
        balanceResponse.expensesBalance.currency
      ),
    },
  };
}
