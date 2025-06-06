import type { Money } from "../domain/interfaces/money";

export function formatMoney({amount,currency}:Money): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}