import type { Balance } from "@/domain/interfaces/balance"
import { Currency } from "@/domain/interfaces/money"
import type {
  Transaction,
  TransactionToCheck,
} from "@/domain/interfaces/transaction"
import { balanceService } from "@/services/balance-service"
import type { SimpleResult } from "@/types/results"
import { useCallback, useEffect, useState } from "react"
import { useAlertContext } from "../alert/alert.context"
import { BalanceOverviewContext } from "./balance-overview.context"

export function BalanceOverviewProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [balance, setBalance] = useState<Balance>({
    expensesBalance: { amount: 0, currency: Currency.EUR },
    incomeBalance: { amount: 0, currency: Currency.EUR },
    totalBalance: { amount: 0, currency: Currency.EUR },
  })
  const [isLoading, setIsLoading] = useState(true)
  const { showAlert } = useAlertContext()

  const fetchBalance = useCallback(async () => {
    setIsLoading(true)
    const response = await balanceService.getBalance()
    if (!response.data) {
      showAlert({
        type: "danger",
        message: response.error ?? "Error getting account balance.",
      })
      return
    }
    setBalance(response.data)
    setIsLoading(false)
  }, [])

  const refreshBalance = () => {
    fetchBalance()
  }

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  const hasEnoughBalance = (
    transaction: TransactionToCheck,
    previousTransaction?: Transaction
  ): SimpleResult => {
    const { money, transactionType, transactionHandleType } = transaction
    const currentBalance = balance.totalBalance.amount

    if (transactionType === "deposit") {
      return { success: true }
    }

    switch (transactionHandleType) {
      case "new":
        return validateNewTransaction(currentBalance, money.amount)

      case "edit":
        if (!previousTransaction) {
          return {
            success: false,
            errorMessage: "Previous transaction data required for edit",
          }
        }
        return validateEditedTransaction(
          currentBalance,
          money.amount,
          previousTransaction
        )

      default:
        return {
          success: false,
          errorMessage: "Invalid transaction type",
        }
    }
  }

  const validateNewTransaction = (
    currentBalance: number,
    amount: number
  ): SimpleResult => {
    const newBalance = currentBalance - amount

    return newBalance >= 0
      ? { success: true }
      : {
          success: false,
          errorMessage: "Insufficient funds",
        }
  }

  const validateEditedTransaction = (
    currentBalance: number,
    newAmount: number,
    previousTransaction: Transaction
  ): SimpleResult => {
    const previousAmount = previousTransaction.money.amount
    const wasWithdrawal = previousTransaction.transactionType === "withdrawal"

    const revertedBalance = wasWithdrawal
      ? currentBalance + previousAmount
      : currentBalance - previousAmount

    const newBalance = revertedBalance - newAmount

    return newBalance >= 0
      ? { success: true }
      : {
          success: false,
          errorMessage: "Insufficient funds after edit",
        }
  }

  return (
    <BalanceOverviewContext.Provider
      value={{
        balance,
        balanceIsLoading: isLoading,
        refreshBalance,
        hasEnoughBalance,
      }}
    >
      {children}
    </BalanceOverviewContext.Provider>
  )
}
