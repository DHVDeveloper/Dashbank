import type { Money } from "../domain/finance/interfaces/money.interface";

export function formatMoney({amount,currency}:Money): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}