import { useAlertContext } from "@/context/alert/alert.context";
import { useTransactionsContext } from "@/context/transactions/transactions.context";
import { Button } from "@/ui/components/form/button";
import { ArrowBackIcon } from "@/ui/icons/arrow-back.icon";

export function TransactionRevert(){
    const {transactionList, revertLastTransaction} = useTransactionsContext()
    const {showAlert} = useAlertContext()
    const handleRevertLastTransaction = async () => {
        const response = await revertLastTransaction()
        if(!response.success) {
            showAlert({type: 'danger', message: response.errorMessage ?? 'Error reversing the last transaction'})
            return
        }
        showAlert({type: 'success', message: 'Last transaction has been reversed'})
    }

    return(<div>
        <Button disabled={transactionList.length == 0} onClick={handleRevertLastTransaction} className="flex items-center justify-center"><ArrowBackIcon className="h-5"/></Button>
    </div>)
}