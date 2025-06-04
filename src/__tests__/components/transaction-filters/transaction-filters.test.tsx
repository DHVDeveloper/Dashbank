import { render, screen, fireEvent } from "@testing-library/react"
import { TransactionFilters } from "../../../pages/dashboard/sections/transactions/sections/transaction-filters/transaction-filters"
import { describe, it, expect, vi } from "vitest"

vi.mock("@/context/transactions/transactions.context", () => ({
  useTransactionsContext: () => ({
    currentFilters: {
      description: "",
    },
    handleFilters: vi.fn(),
    resetFilters: vi.fn(),
    transactionsLoading: false,
    refreshTransactions: vi.fn(),
    removeTransaction: vi.fn(),
    editTransaction: vi.fn(),
    newTransaction: vi.fn(),
  }),
}))

vi.mock("@/context/alert/alert.context", () => ({
  useAlertContext: () => ({
    showAlert: vi.fn(),
  }),
}))

vi.mock("@/context/balance-overview/balance-overview.context", () => ({
  useBalanceOverviewContext: () => ({
    refreshBalance: vi.fn(),
    hasEnoughBalance: vi.fn(),
  }),
}))

describe("TransactionFilters", () => {
  it("should opens the modal when filter button is clicked", () => {
    render(<TransactionFilters />)
    
    const filterButton = screen.getByRole('button')
    fireEvent.click(filterButton)
    
    expect(screen.getByText("Transaction filters")).toBeInTheDocument()
  })
})