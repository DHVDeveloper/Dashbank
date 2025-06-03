import type { Balance } from "@/domain/interfaces/balance";
import { mapBalanceResponseToBalance } from "@/domain/mappers/balance.mapper";
import { getAccountBalance } from "@/infraestructure/repository/balance-repository";
import type { ApiResponse } from "@/types/api-response";

export const balanceService = {
    getBalance: getBalance
}


async function getBalance() : Promise<ApiResponse<Balance>> {
    const response = await getAccountBalance()
    if(!response.success || !response.data) {
        return({
            success: false,
            error: response.error
        })
    }
    return {
        success: response.success,
        data: mapBalanceResponseToBalance(response.data)
    }
}
