import { render, screen, fireEvent } from "@testing-library/react"
import { TransactionListPagination } from "../../../pages/dashboard/sections/transactions/sections/transaction-list/transaction-list-pagination"
import { vi } from "vitest"

describe("TransactionListPagination", () => {
  const mockOnPageChange = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
  })

  const defaultProps = {
    paginationInfo: {
      page: 1,
      totalPages: 3,
    },
    isLoading: false,
    onPageChange: mockOnPageChange,
    children: <div>Test content</div>,
  }

  it("should call onPageChange with next page when next button is clicked", () => {
    render(<TransactionListPagination {...defaultProps} />)

    const nextButton = screen.getByRole("button", { name: /next/i })
    fireEvent.click(nextButton)

    expect(mockOnPageChange).toHaveBeenCalledTimes(1)
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it("should show previous button and call onPageChange when not on first page", () => {
    const props = {
      ...defaultProps,
      paginationInfo: {
        page: 2,
        totalPages: 3,
      },
    }

    render(<TransactionListPagination {...props} />)

    const prevButton = screen.getByRole("button", { name: /previous/i })
    fireEvent.click(prevButton)

    expect(mockOnPageChange).toHaveBeenCalledTimes(1)
    expect(mockOnPageChange).toHaveBeenCalledWith(1)
  })

  it("should disable next button when on last page", () => {
    const props = {
      ...defaultProps,
      paginationInfo: {
        page: 3,
        totalPages: 3,
      },
    }

    render(<TransactionListPagination {...props} />)

    const nextButton = screen.getByRole("button", { name: /next/i })

    expect(nextButton).toBeDisabled()
  })
})
