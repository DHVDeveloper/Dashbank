import type { TransactionTypes } from "@/domain/interfaces/transaction"
import { Button } from "@/ui/components/form/button"
import { Input } from "@/ui/components/form/input"
import { getCurrentDateToForm } from "@/utils/date"
import { useEffect, useRef, useState } from "react"
import type { TransactionFormFilters } from "./transaction-filters"
import { ChevronIcon } from "@/ui/icons/chevron.icon"
import { useClickOutside } from "@/hooks/useClickOutside"

interface TransactionFiltersFormProps {
  isLoading: boolean
  resetFilters: () => void
  handleFiltersApplied: (filters:TransactionFormFilters) => void
  filters: TransactionFormFilters

}

export function TransactionFiltersForm({filters, isLoading, handleFiltersApplied, resetFilters}:TransactionFiltersFormProps) {
  const [transactionType, setTransactionType] = useState<TransactionTypes | null>(filters.transactionType ?? null)
  const [dateFrom, setDateFrom] = useState<string>(filters.dateFrom ? getCurrentDateToForm(filters.dateFrom) : "")
  const [dateTo, setDateTo] = useState<string>(filters.dateTo ? getCurrentDateToForm(filters.dateTo) : "")
  const [hasActiveFilters, setHasActiveFilters] = useState(false)

  useEffect(() => {
    setHasActiveFilters(!!(filters.dateFrom || filters.dateTo || filters.transactionType))
  },[filters])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleFiltersApplied({
      dateFrom: dateFrom ? new Date(dateFrom) : null,
      dateTo: dateTo ? new Date(dateTo) : null,
      transactionType: transactionType
    })
  }

  const handleTransactionTypeChange = (value: TransactionTypes|null) => {
    setTransactionType(value as TransactionTypes)
  }

  const checkIsDisable = () => {
    return !transactionType && !dateFrom && !dateTo
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md w-full">
        <div>
          <label className="text-sm">Transaction type</label>
          <TransactionTypeSelect
            transactionSelected={transactionType}
            onSelect={handleTransactionTypeChange}
          />
        </div>
        <div>
          <label className="text-sm">Date From</label>
          <Input
            type="date"
            value={dateFrom ?? ""}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm">Date To</label>
          <Input
            type="date"
            value={dateTo ?? ""}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
        <div className="pt-4 flex text-end gap-4">
          <Button type="button" onClick={resetFilters} className={`${hasActiveFilters ? 'block' : 'hidden!'}`}>
              Clear filters
          </Button>
          <Button disabled={checkIsDisable() || isLoading} type="submit" className="flex-1">
            Filter
          </Button>
        </div>
      </form>
    </div>
  )
}


interface TransactionTypeSelectProps {
  transactionSelected: TransactionTypes | null
  onSelect: (type: TransactionTypes | null) => void
  className?: string
}


export function TransactionTypeSelect({
  transactionSelected,
  onSelect,
}: TransactionTypeSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)
  
  useClickOutside(selectRef, () => setIsOpen(false))

  const handleSelect = (type: TransactionTypes | null) => {
    onSelect(type)
    setIsOpen(false)
  }
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div ref={selectRef} className="flex relative flex-col text-sm gap-2 w-full">
      <div onClick={() => toggleOpen()} className="cursor-pointer p-2 bg-secondary-bg-color rounded-md capitalize flex items-center justify-between">{transactionSelected ?? 'Select type'} <ChevronIcon className={` transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}/></div>
      <div className={`flex absolute top-[110%] bg-secondary-bg-color rounded-md border  border-primary-border-color  h-auto w-full flex-col gap-2 ${isOpen ? 'block' : 'hidden'}`}>
          <button type="button" className="hover:bg-primary-bg-color p-1 ps-4 text-start select-none cursor-pointer" onClick={() => handleSelect(null)}>Select type</button>
          <button type="button" className="hover:bg-primary-bg-color p-1 ps-4 text-start select-none cursor-pointer" onClick={() => handleSelect('withdrawal')}>Withdrawal</button>
          <button type="button" className="hover:bg-primary-bg-color p-1 ps-4 text-start select-none cursor-pointer" onClick={() => handleSelect('deposit')}>Deposit</button>
      </div>
    </div>
  )
}