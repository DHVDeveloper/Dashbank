import type { Balance } from "@/domain/interfaces/balance"
import { useCallback, useEffect, useState } from "react"
import { BalanceOverviewContext } from "./balance-overview.context"
import { balanceService } from "@/services/balance-service"
import { useAlertContext } from "../alert/alert.context"
import { Currency } from "@/domain/interfaces/money"

export function BalanceOverviewProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [balance, setBalance] = useState<Balance>({
    expensesBalance: {amount:0, currency: Currency.EUR},
    incomeBalance: {amount:0, currency: Currency.EUR},
    totalBalance: {amount:0, currency: Currency.EUR}
  })
  const [isLoading, setIsLoading] = useState(true)
  const {showAlert} = useAlertContext()

  const fetchBalance = useCallback(async () => {
    setIsLoading(true)
    const response = await balanceService.getBalance()
    if(!response.data) {
      showAlert({type: 'danger', message: response.error ?? 'Error getting account balance.'})
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



  return (
    <BalanceOverviewContext.Provider value={{ balance,balanceIsLoading: isLoading,refreshBalance }}>
      {children}
    </BalanceOverviewContext.Provider>
  )
}
