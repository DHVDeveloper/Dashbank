import type { Transaction } from "@/domain/interfaces/transaction"
import { Button } from "@/ui/components/form/button"
import { EditIcon } from "@/ui/icons/edit.icon"
import { ReuseIcon } from "@/ui/icons/reuse.icon"
import { TrashIcon } from "@/ui/icons/trash.icon"
import { formatDate } from "@/utils/date"
import { formatMoney } from "@/utils/formatMoney"

interface TransactionItemProps {
  transaction: Transaction
  handleEditTransaction: (id: string) => void
  handleRemoveTransaction: (id: string) => void
  handleReuseTransaction: (id: string) => void
}

export function TransactionItem({
  transaction,
  handleEditTransaction,
  handleRemoveTransaction,
  handleReuseTransaction,
}: TransactionItemProps) {
  return (
    <div className="flex flex-col gap-5 animate-appear bg-secondary-bg-color shadow items-center p-3 rounded-lg hover:bg-secondary-bg-color/80 sm:flex-row sm:p-4">
      <div className="flex flex-1 w-full flex-col gap-4 items-start md:items-center md:flex-row sm:w-auto sm:">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center w-full gap-2 sm:w-auto">
            <div
              className={`px-2 font-bold capitalize rounded-full text-sm py-1  ${
                transaction.transactionType === "withdrawal"
                  ? "bg-red-100 : text-red-600"
                  : "bg-green-100 : text-green-600"
              }`}
            >
              {transaction.transactionType}
            </div>
            <span className="text-sm text-nowrap text-primary-text-color/50">
              {formatDate(transaction.date)}
            </span>
          </div>
          <div className="block sm:hidden">
            <ActionButtons
              transaction={transaction}
              handleEditTransaction={handleEditTransaction}
              handleRemoveTransaction={handleRemoveTransaction}
              handleReuseTransaction={handleReuseTransaction}
            />
          </div>
        </div>
        <p className="text-sm">{transaction.description}</p>
      </div>
      <div className="flex items-end w-full justify-end  gap-4 flex-col sm:flex-row sm:w-auto sm:items-center sm:min-w-[30%]">
        <span
          className={`text-2xl font-bold sm:text-xl ${
            transaction.transactionType === "deposit"
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          <span className="mr-1">
            {transaction.transactionType === "deposit" ? "+" : "-"}
          </span>
          {formatMoney({
            amount: transaction.money.amount,
            currency: transaction.money.currency,
          })}
        </span>
        <div className="hidden sm:block">
          <ActionButtons
            transaction={transaction}
            handleEditTransaction={handleEditTransaction}
            handleRemoveTransaction={handleRemoveTransaction}
            handleReuseTransaction={handleReuseTransaction}
          />
        </div>
      </div>
    </div>
  )
}

interface ActionButtonsProps {
  transaction:Transaction
  handleEditTransaction: (id: string) => void
  handleRemoveTransaction: (id: string) => void
  handleReuseTransaction: (id: string) => void
}

function ActionButtons({
  transaction,
  handleEditTransaction,
  handleRemoveTransaction,
  handleReuseTransaction,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        aria-label="edit"
        className="bg-transparent p-1! hover:bg-primary-bg-color"
        onClick={() => handleEditTransaction(transaction.id)}
      >
        <EditIcon className="h-4 w-4 text-black dark:text-white" />
      </Button>
      <Button
        aria-label="reuse"
        className="bg-transparent p-1! hover:bg-primary-bg-color"
        onClick={() => handleReuseTransaction(transaction.id)}
      >
        <ReuseIcon className="h-4 w-4 text-black dark:text-white" />
      </Button>
      <Button
        aria-label="remove"
        className="bg-transparent p-1! hover:bg-primary-bg-color"
        onClick={() => handleRemoveTransaction(transaction.id)}
      >
        <TrashIcon className="h-4 w-4 text-black dark:text-white" />
      </Button>
    </div>
  )
}
