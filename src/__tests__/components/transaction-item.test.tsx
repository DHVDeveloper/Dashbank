import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { Transaction } from "../../domain/interfaces/transaction"
import { TransactionItem } from "../../pages/dashboard/sections/transactions/sections/transaction-list/transaction-item"

const mockEdit = vi.fn()
const mockRemove = vi.fn()
const mockReuse = vi.fn()

const mockTransaction: Transaction = {
  id: '1',
  money: {
    amount: 100.50,
    currency: 'EUR'
  },
  createdAt: new Date('2023-01-01'),
  date: new Date('2023-01-01'),
  description: 'Test transaction',
  transactionType: 'deposit'
}

describe('TransactionItem', () => {
   it('should display negative amount and red background for withdrawal transactions', () => {
    const withdrawalTransaction: Transaction = {
      ...mockTransaction,
      transactionType: 'withdrawal',
      money: { amount: 50, currency: 'EUR' }
    }

    render(
      <TransactionItem
        transaction={withdrawalTransaction}
        handleEditTransaction={mockEdit}
        handleRemoveTransaction={mockRemove}
        handleReuseTransaction={mockReuse}
      />
    )
    expect(screen.queryByText('-')).toBeInTheDocument()
    expect(screen.queryByText('+')).not.toBeInTheDocument()
    expect(screen.queryByText('withdrawal')).toBeInTheDocument()
    expect(screen.getByText('withdrawal')).toHaveClass('bg-red-100')
    expect(screen.getByText('€50.00')).toBeInTheDocument()
  })
  it('should display positive amount and green background for deposit transactions', () => {
    const depositTransaction: Transaction = {
      ...mockTransaction,
      money: { amount: 75, currency: 'EUR' }
    }

    render(
      <TransactionItem
        transaction={depositTransaction}
        handleEditTransaction={mockEdit}
        handleRemoveTransaction={mockRemove}
        handleReuseTransaction={mockReuse}
      />
    )

    expect(screen.queryByText('+')).toBeInTheDocument()
    expect(screen.queryByText('-')).not.toBeInTheDocument()
    expect(screen.queryByText('deposit')).toBeInTheDocument()
    expect(screen.getByText('deposit')).toHaveClass('bg-green-100')
    expect(screen.getByText('€75.00')).toBeInTheDocument()
  })
  it('should call edit function when edit button is clicked', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        handleEditTransaction={mockEdit}
        handleRemoveTransaction={mockRemove}
        handleReuseTransaction={mockReuse}
      />
    )

    const editButtons = screen.getAllByRole('button', { name: /edit/i })
    fireEvent.click(editButtons[0])
    
    expect(mockEdit).toHaveBeenCalledTimes(1)
    expect(mockEdit).toHaveBeenCalledWith('1')
  })
  it('should call reuse function when reuse button is clicked', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        handleEditTransaction={mockEdit}
        handleRemoveTransaction={mockRemove}
        handleReuseTransaction={mockReuse}
      />
    )

    const editButtons = screen.getAllByRole('button', { name: /reuse/i })
    fireEvent.click(editButtons[0])
    
    expect(mockEdit).toHaveBeenCalledTimes(1)
    expect(mockEdit).toHaveBeenCalledWith('1')
  })
  it('should call remove function when remove button is clicked', () => {
    render(
      <TransactionItem
        transaction={mockTransaction}
        handleEditTransaction={mockEdit}
        handleRemoveTransaction={mockRemove}
        handleReuseTransaction={mockReuse}
      />
    )

    const editButtons = screen.getAllByRole('button', { name: /remove/i })
    fireEvent.click(editButtons[0])
    
    expect(mockEdit).toHaveBeenCalledTimes(1)
    expect(mockEdit).toHaveBeenCalledWith('1')
  })
})