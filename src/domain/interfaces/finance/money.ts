export enum Currency {
  EUR = 'EUR',
  KES = 'KES',
}

export interface Money {
  amount: number
  currency: Currency
}