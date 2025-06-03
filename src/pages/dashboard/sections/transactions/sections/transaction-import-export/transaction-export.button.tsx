import type { Transaction } from '@/domain/interfaces/transaction'
import { Button } from '@/ui/components/form/button'
import { convertTransactionsToCSV, downloadCSV } from '@/utils/csv'
import { useCallback } from 'react'

interface TransactionExportButtonProps {
  transactions: Transaction[]
}

export function TransactionExportButton({ transactions}: TransactionExportButtonProps) {
  const handleExport = useCallback(() => {
    if (transactions.length === 0) return

    try {
      const csvString = convertTransactionsToCSV(transactions)
      downloadCSV(csvString, 'transactions.csv')
    } catch (error) {
      alert('Error generating CSV file.')
    }
  }, [transactions])

  return (
    <Button className='flex-1  text-nowrap md:flex-0' onClick={handleExport}>
      Export to CSV
    </Button>
  )
}
