import { useAlertContext } from "@/context/alert/alert.context"
import { useTransactionsContext } from "@/context/transactions/transactions.context"
import { Currency } from "@/domain/interfaces/money"
import type { NewTransaction, TransactionTypes } from "@/domain/interfaces/transaction"
import { SelectionCard } from "@/ui/components/card/selection-card"
import { Button } from "@/ui/components/form/button"
import { Input } from "@/ui/components/form/input"
import { TextArea } from "@/ui/components/form/textarea"
import { ArrowUpRight } from "@/ui/icons/arrow-up-right.icon"
import { getCurrentDateToForm } from "@/utils/date"
import { useState } from "react"

export interface TransactionData {
  amount: number
  type: "deposit" | "withdrawal"
  date: string
}

interface CreateTransactionFormProps {
  onClose: () => void
}

export function CreateTransactionForm({onClose}:CreateTransactionFormProps) {
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<TransactionTypes>("deposit")
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(getCurrentDateToForm())
  const {newTransaction} = useTransactionsContext()
  const {showAlert} = useAlertContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const transactionToAdd:NewTransaction = {
      transactionType: type,
      money: {
        amount: Number(amount),
        currency: Currency.EUR 
      },
      description: description,
      date: new Date(date)
    }

    const response = await newTransaction(transactionToAdd)
    setIsLoading(false)
    if(!response.success) {
      showAlert({message: response.errorMessage ?? 'There has been an error.', type: 'danger'})
      return
    }
    showAlert({message: 'The transaction has been made successfully.', type: 'success'})
    onClose()
  }

  const handleAmountChange = (newAmount:string) => {
    if (/^\d*\.?\d{0,2}$/.test(newAmount)) {
      setAmount(newAmount)
    }
  }

  const handleDateChange = (newDate:string) => {
    setDate(newDate)
  }

  const handleDescription = (newDescription:string) => {
    setDescription(newDescription)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md w-full">
      <div>
        <label className="text-sm">Amount</label>
        <Input
          type="text"
          placeholder="0.00"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <SelectionCard
          title="Deposit"
          handleSelection={() => setType("deposit")}
          icon={<ArrowUpRight className={`w-12 transition-colors p-2 rounded-full h-12 ${type === 'deposit' ? 'bg-green-500 text-white' : 'bg-gray-200 text-primary-text-color'}`} />}
          isSelected={type === "deposit"}
        />
        <SelectionCard
          title="Withdrawal"
          handleSelection={() => setType("withdrawal")}
          icon={<ArrowUpRight className={`w-12 transition-colors p-2 rounded-full h-12 rotate-180 ${type === 'withdrawal' ? 'bg-red-500 text-white' : 'bg-gray-200 text-primary-text-color'}`} />}
          isSelected={type === "withdrawal"}
        />
      </div>

      <div>
        <label htmlFor="transaction-description" className="text-sm">
          Description
        </label>
        <TextArea
          id="transaction-description"
          placeholder="Reason for the transaction"
          value={description}
          onChange={(e) => handleDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="transaction-date" className="text-sm">
          Date
        </label>
        <Input
          id="transaction-date"
          type="date"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
          required
        />
      </div>

      <div className="pt-4 text-end">
        <Button disabled={isLoading} type="submit" className="w-full">
          Save Transaction
        </Button>
      </div>
    </form>
  )
}
