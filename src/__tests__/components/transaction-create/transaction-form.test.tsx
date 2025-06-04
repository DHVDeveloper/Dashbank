import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import { Currency } from "../../../domain/interfaces/money"
import type { Transaction } from "../../../domain/interfaces/transaction"
import { TransactionForm } from "../../../pages/dashboard/sections/transactions/sections/transaction-create/transaction-form"
import { getCurrentDateToForm } from "../../../utils/date"

const mockSubmit = vi.fn()
const mockHasEnoughBalance = vi.fn(() => ({ success: true }))
const mockShowAlert = vi.fn()

beforeEach(() => {
  vi.mock("@/context/alert/alert.context", () => ({
    useAlertContext: () => ({
      showAlert: mockShowAlert,
    }),
  }))
})
describe("TransactionForm", () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it("should render void fields when its a new transaction", () => {
    render(
      <TransactionForm
        isLoading={false}
        transactionType="new"
        onSubmit={mockSubmit}
        hasEnoughBalance={mockHasEnoughBalance}
        onClose={vi.fn()}
      />
    )
    
    const descriptionTextarea = screen.getByLabelText("Description")
    expect(descriptionTextarea).toHaveValue("")
    const amountInput = screen.getByPlaceholderText("0.00")
    expect(amountInput).toHaveValue("")
    const dateInput = screen.getByLabelText("Date")
    expect(dateInput).toHaveValue(getCurrentDateToForm())
  })


  it("should populate all form fields when editing an existing transaction", () => {
    const mockTransaction:Transaction = {
      id: "1",
      money: { amount: 100, currency: Currency.EUR },
      description: "Test transaction",
      date: new Date("2023-01-01"),
      transactionType: "deposit",
      createdAt: new Date()
    }

    render(
      <TransactionForm
        isLoading={false}
        transaction={mockTransaction}
        transactionType="edit"
        onSubmit={mockSubmit}
        hasEnoughBalance={mockHasEnoughBalance}
        onClose={vi.fn()}
      />
    )

    expect(screen.getByPlaceholderText("0.00")).toHaveValue("100")
    expect(screen.getByLabelText("Description")).toHaveValue("Test transaction")
    expect(screen.getByLabelText("Date")).toHaveValue("2023-01-01")
  })
})
