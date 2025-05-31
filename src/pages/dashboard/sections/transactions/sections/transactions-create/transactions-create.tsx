import { useState } from "react"
import { CreateTransactionForm } from "./create-transaction-form"
import { Button } from "@/ui/components/form/button"
import { Modal } from "@/ui/components/modal/modal"

export function TransactionsCreate() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-end items-center">
        <Button
          onClick={() => {
            setIsAddModalOpen(true)
          }}
        >
          <span>+ New Transaction</span>
        </Button>
      </div>
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="New transaction"
      >
        <CreateTransactionForm onClose={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  )
}
