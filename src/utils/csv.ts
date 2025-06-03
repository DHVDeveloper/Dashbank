import { Currency } from "@/domain/interfaces/money"
import type {
  NewTransaction,
  Transaction,
} from "@/domain/interfaces/transaction"

export interface CSVTransaction {
  Date: string
  Amount: string
  Description: string
  Type: "Deposit" | "Withdrawal"
}

export const parseCSV = (csvString: string): CSVTransaction[] => {
  const lines = csvString.split("\n").filter((line) => line.trim() !== "")
  if (lines.length < 1) throw new Error("Empty CSV file")

  const headers = lines[0].split(",").map((h) => h.trim())
  const requiredHeaders = ["Date", "Amount", "Description", "Type"]

  if (!requiredHeaders.every((header) => headers.includes(header))) {
    throw new Error("Invalid CSV format. Missing required headers.")
  }

  return lines.slice(1).map((line, index) => {
    const values = line.split(",")
    if (values.length !== headers.length) {
      throw new Error(`Invalid data in line ${index + 2}`)
    }

    const transaction: Partial<CSVTransaction> = {}
    headers.forEach((header, i) => {
      const value = values[i].trim()

      if (header === "Type") {
        if (value === "Deposit" || value === "Withdrawal") {
          transaction[header] = value
        } else {
          throw new Error(`Invalid transaction type in CSV: ${value}`)
        }
      } else {
        transaction[header as Exclude<keyof CSVTransaction, "Type">] = value
      }
    })

    if (
      !transaction.Date ||
      !transaction.Amount ||
      !transaction.Description ||
      !transaction.Type
    ) {
      throw new Error(`Missing required fields in line ${index + 2}`)
    }

    return transaction as CSVTransaction
  })
}

export const convertCSVToTransactions = (
  csvData: CSVTransaction[]
): NewTransaction[] => {
  return csvData.map((item, index) => {
    const amount = parseFloat(item.Amount)
    if (isNaN(amount)) {
      throw new Error(`Invalid amount in transaction ${index + 1}`)
    }

    const transactionDate = new Date(item.Date)
    if (isNaN(transactionDate.getTime())) {
      throw new Error(`Invalid date in transaction ${index + 1}`)
    }

    const isWithdrawal = amount < 0 || item.Type === "Withdrawal"

    return {
      money: {
        amount: Math.abs(amount),
        currency: Currency.EUR,
      },
      date: transactionDate,
      description: item.Description,
      transactionType: isWithdrawal ? "withdrawal" : "deposit",
    }
  })
}

export const convertTransactionsToCSV = (
  transactions: Transaction[]
): string => {
  const headers = ["Date", "Amount", "Description", "Type"]
  const rows = transactions.map((tx) => {
    const amount =
      tx.transactionType === "withdrawal"
        ? -Math.abs(tx.money.amount)
        : Math.abs(tx.money.amount)

    return [
      tx.date.toISOString().split("T")[0],
      amount.toString(),
      tx.description,
      tx.transactionType === "withdrawal" ? "Withdrawal" : "Deposit",
    ].join(",")
  })

  return [headers.join(","), ...rows].join("\n")
}

export const downloadCSV = (
  csvString: string,
  filename: string = "transactions.csv"
): void => {
  const blob = new Blob([csvString], { type: "text/csvcharset=utf-8" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
