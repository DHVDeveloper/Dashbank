export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
}

export interface Money {
  amount: number;
  currency: Currency;
}