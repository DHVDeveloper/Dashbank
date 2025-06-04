import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { TransactionsList } from "../../../pages/dashboard/sections/transactions/sections/transaction-list/transaction-list"
import { vi } from "vitest"
import { Transaction } from "../../../domain/interfaces/transaction"

const mockRemoveTransaction = vi.fn().mockResolvedValue({ success: true })
const mockRefreshTransactions = vi.fn()
const mockRefreshBalance = vi.fn()
const mockShowAlert = vi.fn()

vi.mock("@/context/transactions/transactions.context", () => ({
  useTransactionsContext: () => ({
    refreshTransactions: mockRefreshTransactions,
    removeTransaction: mockRemoveTransaction,
    editTransaction: vi.fn(),
    newTransaction: vi.fn(),
  }),
}))

vi.mock("@/context/alert/alert.context", () => ({
  useAlertContext: () => ({
    showAlert: mockShowAlert,
  }),
}))

vi.mock("@/context/balance-overview/balance-overview.context", () => ({
  useBalanceOverviewContext: () => ({
    refreshBalance: mockRefreshBalance,
    hasEnoughBalance: vi.fn().mockReturnValue(true),
  }),
}))

window.HTMLElement.prototype.scrollTo = vi.fn()

afterEach(() => {
  vi.clearAllMocks()
})

const mockTransactions: Transaction[] = [
  {
    id: "1",
    money: {
      amount: 100.5,
      currency: "EUR",
    },
    createdAt: new Date("2023-01-01"),
    date: new Date("2023-01-01"),
    description: "Deposit transaction",
    transactionType: "deposit",
  },
  {
    id: "2",
    money: {
      amount: 100.5,
      currency: "EUR",
    },
    createdAt: new Date("2023-01-01"),
    date: new Date("2023-01-01"),
    description: "Withdrawal transaction",
    transactionType: "withdrawal",
  },
]

describe("TransactionsList", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render transaction items when data is loaded", () => {
    render(
      <TransactionsList
        transactionList={mockTransactions}
        transactionsLoading={false}
      />
    )
    expect(screen.getByText("Deposit transaction")).toBeInTheDocument()
    expect(screen.getByText("Withdrawal transaction")).toBeInTheDocument()
  })

  it("should scroll to top when transaction list changes", () => {
    render(
      <TransactionsList
        transactionList={mockTransactions}
        transactionsLoading={false}
      />
    )
    expect(window.HTMLElement.prototype.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    })
  })

  it("should open edit modal", async () => {
    render(
      <TransactionsList
        transactionList={mockTransactions}
        transactionsLoading={false}
      />
    )

    fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0])
    await waitFor(() =>
      expect(screen.getByText("Edit Transaction")).toBeInTheDocument()
    )
  })

  it("should delete a transaction when delete button is clicked", async () => {
    render(
      <TransactionsList
        transactionList={mockTransactions}
        transactionsLoading={false}
      />
    )
    
    fireEvent.click(screen.getAllByRole("button", { name: /remove/i })[0])

    await waitFor(() => {
      expect(mockRemoveTransaction).toHaveBeenCalledWith(mockTransactions[0].id)
      expect(mockRefreshTransactions).toHaveBeenCalled()
      expect(mockRefreshBalance).toHaveBeenCalled()
      expect(mockShowAlert).toHaveBeenCalledWith({
        type: "success",
        message: "Transaction deleted successfully.",
      })
    })
  })
})