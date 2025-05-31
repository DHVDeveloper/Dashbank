export enum CurrencyRepository {
  EUR = 'EUR',
  KES = 'KES',
}

export interface MoneyRepository {
  amount: number
  currency: CurrencyRepository
}