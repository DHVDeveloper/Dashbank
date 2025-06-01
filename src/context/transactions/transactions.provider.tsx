import { useEffect, useState } from "react";
import { TransactionsContext } from "./transactions.context";
import { transactionService } from "@/services/transaction-service";
import { useAlertContext } from "../alert/alert.context";
import type { NewTransaction, Transaction } from "@/domain/interfaces/transaction";
import type { ApiResponse } from "@/types/apiResponse";
import type { SimpleResult } from "@/types/results";


interface PaginationInfo {
  page: number
  pageSize: number
  totalPages: number
}

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [transactionList, setTransactionList] = useState<Transaction[]>([])
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    page: 0,
    pageSize: 20,
    totalPages: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const { showAlert } = useAlertContext();

  useEffect(() => {
    getTransactionHistory()
  },[])

  const getTransactionHistory = async ():Promise<SimpleResult> => {
    setIsLoading(true)
    const response = await transactionService.getTransactionHistory(1,20)
    setTransactionList(response?.data?.data ?? [])
    setPaginationInfo({...paginationInfo, totalPages: response.data?.totalPages ?? 0})
    setIsLoading(false)
    return {
      success: response.success,
      errorMessage: response?.error
    }
  }

  const refreshTransactions = () => {
    getTransactionHistory()
  }
  
  const editTransaction = async (transaction: Transaction):Promise<SimpleResult> => {

  }

  const removeTransaction = async (transactionId: string):Promise<SimpleResult> => {
    setIsLoading(true)
    const response = await transactionService.removeTransaction(transactionId)
    if(response.success) {
      getTransactionHistory()
    }
    setIsLoading(false)
    return {
      success: response.success,
      errorMessage: response?.error
    }
  }

  const newTransaction = async (newTransaction:NewTransaction):Promise<SimpleResult> => {
    const response = await transactionService.newTransaction(newTransaction)
    if(response.success){
      refreshTransactions()
    }
    return({
      success: response.success,
      errorMessage: response.error
    })
  }
  return (
    <TransactionsContext.Provider value={{transactionsLoading:isLoading, transactionList: transactionList, editTransaction: editTransaction, newTransaction:newTransaction, removeTransaction: removeTransaction, refreshTransactions: refreshTransactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}
