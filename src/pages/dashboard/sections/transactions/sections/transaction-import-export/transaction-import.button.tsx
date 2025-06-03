import { useAlertContext } from '@/context/alert/alert.context'
import type { NewTransaction } from '@/domain/interfaces/transaction'
import { Button } from '@/ui/components/form/button'
import { convertCSVToTransactions, parseCSV } from '@/utils/csv'
import React, { useCallback } from 'react'

interface TransactionImportButtonProps {
  onImport: (transactions: NewTransaction[]) => void
}

export function TransactionImportButton({ onImport }: TransactionImportButtonProps) {
  const {showAlert} = useAlertContext()
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const csvString = e.target?.result as string
      if (!csvString) return

      try {
        const csvData = parseCSV(csvString)
        const transactions = convertCSVToTransactions(csvData)
        onImport(transactions)
      } catch {
        showAlert({type:'danger', message: 'Error processing CSV file. Please check the format.'})
      }
    }

    reader.readAsText(file)
    event.target.value = ''
  }, [onImport])

  const triggerFileInput = useCallback(() => {
    const fileInput = document.getElementById('csv-upload') as HTMLInputElement
    fileInput?.click()
  }, [])

  return (
    <>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />
      <Button className='flex-1 text-nowrap md:flex-0' onClick={triggerFileInput}>
        Import from CSV
      </Button>
    </>
  )
}
