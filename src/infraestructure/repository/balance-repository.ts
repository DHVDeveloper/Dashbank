import type { ApiResponse } from "@/types/api-response";
import type { TransactionResponse } from "../interfaces/transaction.external";
import type { BalanceResponse } from "../interfaces/balance.external";
import {
  CurrencyRepository,
  type MoneyRepository,
} from "../interfaces/money.external";

export function getAccountBalance(): Promise<ApiResponse<BalanceResponse>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactionListStorage = localStorage.getItem("transactions");
      const transactionList: TransactionResponse[] = transactionListStorage
        ? JSON.parse(transactionListStorage)
        : [];

      const initialBalance: MoneyRepository = {
        amount: 0,
        currency: CurrencyRepository.EUR,
      };

      const balances = transactionList.reduce(
        (acc, transaction) => {
          let amountInEUR = transaction.money.amount;

          if (transaction.money.currency === CurrencyRepository.KES) {
            amountInEUR = transaction.money.amount * 0.0075;
          }

          acc.totalBalance.amount +=
            transaction.transactionType === "deposit"
              ? amountInEUR
              : -amountInEUR;

          if (transaction.transactionType === "deposit") {
            acc.incomeBalance.amount += amountInEUR;
          } else {
            acc.expensesBalance.amount += amountInEUR;
          }

          return acc;
        },
        {
          totalBalance: { ...initialBalance },
          incomeBalance: { ...initialBalance },
          expensesBalance: { ...initialBalance },
        }
      );

      balances.totalBalance.amount = parseFloat(
        balances.totalBalance.amount.toFixed(2)
      );
      balances.incomeBalance.amount = parseFloat(
        balances.incomeBalance.amount.toFixed(2)
      );
      balances.expensesBalance.amount = parseFloat(
        balances.expensesBalance.amount.toFixed(2)
      );

      resolve({
        success: true,
        data: balances,
      });
    }, 200);
  });
}
