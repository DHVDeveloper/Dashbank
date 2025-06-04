import { describe, it, expect } from "vitest"
import {
  parseCSV,
  convertCSVToTransactions,
  convertTransactionsToCSV,
  type CSVTransaction,
} from "../../utils/csv"

describe("parseCSV", () => {
  it("should parse valid CSV data", () => {
    const csv = `Date,Amount,Description,Type
    2023-01-01,100.50,Salary,Deposit
    2023-01-02,-20.00,Coffee,Withdrawal`

    const result = parseCSV(csv)
    expect(result).toBeDefined()
    expect(result.length).toBe(2)
    expect(result[0].Date).toBe("2023-01-01")
    expect(result[0].Amount).toBe("100.50")
    expect(result[0].Description).toBe("Salary")
    expect(result[0].Type).toBe("Deposit")
  })

  it("should throw error for empty CSV", () => {
    const csv = ""
    expect(() => parseCSV(csv)).toThrowError("Empty CSV file")
  })
})

describe("convertCSVToTransactions", () => {
  it("should convert CSV transactions to domain transactions", () => {
    const csvTransactions: CSVTransaction[] = [
      {
        Date: "2023-01-01",
        Amount: "100.50",
        Description: "Salary",
        Type: "Deposit",
      },
      {
        Date: "2023-01-02",
        Amount: "20.00",
        Description: "Coffee",
        Type: "Withdrawal",
      },
    ]

    const result = convertCSVToTransactions(csvTransactions)

    expect(result).toBeDefined()
    expect(result.length).toBe(2)
    expect(result[0].money.amount).toBe(100.50)
    expect(result[0].transactionType).toBe("deposit")
    expect(result[1].transactionType).toBe("withdrawal")
  })

  it("should handle negative amounts as withdrawals", () => {
    const csvTransactions: CSVTransaction[] = [
      {
        Date: "2023-01-01",
        Amount: "-100.50",
        Description: "Rent",
        Type: "Deposit",
      },
    ]

    const result = convertCSVToTransactions(csvTransactions)
    expect(result[0].transactionType).toBe("withdrawal")
  })
})

describe("convertTransactionsToCSV", () => {
  it("should convert domain transactions to CSV format", () => {
    const transactions = [
      {
        money: { amount: 100.50, currency: "EUR" },
        date: new Date("2023-01-01"),
        description: "Salary",
        transactionType: "deposit",
        id: "1",
      },
      {
        money: { amount: 20.00, currency: "EUR" },
        date: new Date("2023-01-02"),
        description: "Coffee",
        transactionType: "withdrawal",
        id: "2",
      },
    ]

    const result = convertTransactionsToCSV(transactions)
    const lines = result.split("\n")

    expect(lines.length).toBe(3)
    expect(lines[0]).toBe("Date,Amount,Description,Type")
    expect(lines[1]).toContain("2023-01-01,100.5,Salary,Deposit")
    expect(lines[2]).toContain("2023-01-02,-20,Coffee,Withdrawal")
  })
})
