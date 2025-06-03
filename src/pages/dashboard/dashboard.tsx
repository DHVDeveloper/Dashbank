import { TransactionsProvider } from "@/context/transactions/transactions.provider";
import { Header } from "./sections/header/header";
import { Overview } from "./sections/overview/overview";
import { Transactions } from "./sections/transactions/transactions";
import { BalanceOverviewProvider } from "@/context/balance-overview/balance-overview.provider";

export default function Dashboard(){
    
    return(<div className="w-full flex flex-col gap-4 h-full">
        <Header/>
        <BalanceOverviewProvider>
            <Overview/>
            <div className="flex-1">
                <TransactionsProvider>
                    <Transactions/>
                </TransactionsProvider>
            </div>
        </BalanceOverviewProvider>
    </div>)
}