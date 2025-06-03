import { TransactionsCreate } from "./sections/transaction-create/transaction-create";
import { TransactionFilters } from "./sections/transaction-filters/transaction-filters";
import { TransactionImportExport } from "./sections/transaction-import-export/transaction-import-export";
import { TransactionListSection } from "./sections/transaction-list/transaction-list-section";
import { TransactionRevert } from "./sections/transaction-revert/transaction-revert";

export function Transactions(){
    return(<div className="w-full h-auto">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-sm text-primary-text-color font-black">TRANSACTIONS</h3>
                <div className="flex justify-end flex-wrap gap-2">
                    <TransactionFilters/>
                    <TransactionsCreate/>
                    <TransactionImportExport/>
                    <TransactionRevert/>
                </div>
            </div>
            <TransactionListSection/>
        </div>
    </div>)
}