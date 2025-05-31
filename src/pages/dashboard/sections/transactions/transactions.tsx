import { TransactionsCreate } from "./sections/transactions-create/transactions-create";
import { TransactionsList } from "./sections/transactions-list/transactions-list";

export function Transactions(){
    return(<div className="w-full h-auto">
        <div className="flex flex-col">
            <h3 className="text-sm font-black">TRANSACTIONS</h3>
            <TransactionsCreate/>
            <TransactionsList/>
        </div>
    </div>)
}