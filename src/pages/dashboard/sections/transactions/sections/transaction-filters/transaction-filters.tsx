import { Button } from "@/ui/components/form/button";
import { Input } from "@/ui/components/form/input";
import { Modal } from "@/ui/components/modal/modal";
import { FilterIcon } from "@/ui/icons/filter.icon";
import useDebounce from "@/utils/useDebounce";
import { useEffect, useState } from "react";
import { TransactionFiltersForm } from "./transaction-filters-form";
import { useTransactionsContext } from "@/context/transactions/transactions.context";
import type { TransactionFilters } from "@/domain/interfaces/transaction";

export type TransactionFormFilters = Omit<TransactionFilters, "description">

export function TransactionFilters() {
    const {currentFilters, handleFilters, resetFilters, transactionsLoading} = useTransactionsContext()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [descriptionFilter,setDescriptionFilter] = useState("")
    const debouncedSearchTerm = useDebounce(descriptionFilter, 500)
    const {description, ...filters} = currentFilters

    useEffect(() => {
        handleFilters({description: debouncedSearchTerm})
    },[debouncedSearchTerm])

    const handleFilterDescription = (newDescription:string) => {
        setDescriptionFilter(newDescription)
    }

    const handleFiltersApplied = async (filters:TransactionFormFilters) => {
        handleFilters(filters)
        setModalIsOpen(false)
    }

    const handleResetFilters = () => {
        resetFilters()
        setModalIsOpen(false)
    }

    return(
        <div className="flex gap-2 w-full md:w-auto">
            <Input className="w-full" onChange={(e) => handleFilterDescription(e.target.value)} placeholder="Filter by description..."/>
            <Button onClick={() => setModalIsOpen(true)}><FilterIcon/></Button>
            <Modal title="Transaction filters" onClose={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
                <TransactionFiltersForm  isLoading={transactionsLoading} resetFilters={handleResetFilters} handleFiltersApplied={handleFiltersApplied} filters={filters} />
            </Modal>
        </div>
    )
}