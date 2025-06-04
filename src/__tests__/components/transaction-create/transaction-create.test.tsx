import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TransactionsCreate } from "../../../pages/dashboard/sections/transactions/sections/transaction-create/transaction-create"

vi.mock("@/context/transactions/transactions.context", () => ({
  useTransactionsContext: () => ({
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

describe('TransactionsCreate', () => {
  it('renders the new transaction button', () => {
    render(<TransactionsCreate />)
    expect(screen.getByRole('button', { name: '+ New Transaction' })).toBeInTheDocument()
  })

  it('opens modal when button is clicked', async () => {
    render(<TransactionsCreate />)
    
    await userEvent.click(screen.getByText('+ New Transaction'))
    
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('New transaction')).toBeInTheDocument()
  })

})