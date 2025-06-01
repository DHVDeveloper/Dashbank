import { TransactionsCreate } from "./sections/transaction-create/transaction-create";
import { TransactionListSection } from "./sections/transaction-list/transaction-list-section";

export function Transactions(){
    return(<div className="w-full h-auto">
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-sm text-primary-text-color font-black">TRANSACTIONS</h3>
                <TransactionsCreate/>
            </div>
            <TransactionListSection/>
        </div>
    </div>)
}