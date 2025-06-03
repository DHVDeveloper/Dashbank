import type { Balance } from "@/domain/interfaces/balance"
import type { Transaction, TransactionToCheck } from "@/domain/interfaces/transaction"
import type { SimpleResult } from "@/types/results"
import { createContext, useContext } from "react"

interface BalanceOverviewContextType {
  balance: Balance
  balanceIsLoading: boolean
  hasEnoughBalance: (transactionToCheck:TransactionToCheck, prevTransaction?:Transaction ) => SimpleResult
  refreshBalance: () => void
}

export const BalanceOverviewContext = createContext<BalanceOverviewContextType | null>(null)

export const useBalanceOverviewContext = () => {
  const context = useContext(BalanceOverviewContext)
  if (!context) throw new Error("useBalanceOverview must be used within an BalanceOverviewProvider")
  return context
}

