import { useAlertContext } from "@/context/alert/alert.context"
import { Currency } from "@/domain/interfaces/money"
import type { NewTransaction, Transaction, TransactionToCheck, TransactionTypes } from "@/domain/interfaces/transaction"
import type { SimpleResult } from "@/types/results"
import { SelectionCard } from "@/ui/components/card/selection-card"
import { Button } from "@/ui/components/form/button"
import { Input } from "@/ui/components/form/input"
import { TextArea } from "@/ui/components/form/textarea"
import { ArrowUpRight } from "@/ui/icons/arrow-up-right.icon"
import { getCurrentDateToForm } from "@/utils/date"
import { useEffect, useState } from "react"

export interface TransactionData {
  amount: number
  type: "deposit" | "withdrawal"
  date: string
}

interface TransactionFormProps {
  isLoading: boolean
  transaction?: Transaction
  transactionType: 'new' | 'edit'
  onSubmit: (transaction:NewTransaction) => void
  hasEnoughBalance: (transactionToCheck:TransactionToCheck, prevTransaction?:Transaction) => SimpleResult
  onClose: () => void
}

export function TransactionForm({transaction,isLoading,transactionType,hasEnoughBalance, onSubmit}:TransactionFormProps) {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<TransactionTypes>("deposit")
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(getCurrentDateToForm())
  const {showAlert} = useAlertContext()

  useEffect(() => {
    if(transaction) {
      setAmount(transaction.money.amount.toString())
      setType(transaction.transactionType)
      setDescription(transaction.description)
      setDate(getCurrentDateToForm(transaction.date))
    }
  },[transaction])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(Number(amount) <= 0) {
      showAlert({type: 'danger',message: 'Amount must be greater than zero.'})
      return
    }
    const transactionToHandle:NewTransaction = {
      transactionType: type,
      money: {
        amount: Number(amount),
        currency: Currency.EUR 
      },
      description: description,
      date: new Date(date)
    }
    const transactionToCheck:TransactionToCheck = {
      money: transactionToHandle.money,
      transactionHandleType: transactionType,
      transactionType: transactionToHandle.transactionType
    }

    const enoughBalance = hasEnoughBalance(transactionToCheck,transaction)
    if(!enoughBalance.success) {
      showAlert({type: 'danger',message: enoughBalance.errorMessage ?? 'Error on transaction.'})
      return
    }
    onSubmit(transactionToHandle)
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
          min={transactionType === 'edit' ? getCurrentDateToForm(transaction?.date) : getCurrentDateToForm(new Date())}
          value={transactionType === 'edit' ? date : getCurrentDateToForm(new Date())}
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
