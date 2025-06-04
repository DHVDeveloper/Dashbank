import { describe, it, expect } from 'vitest'
import {Money, Currency} from "../../domain/interfaces/money"
import { formatMoney } from "../../utils/formatMoney"

describe("formatMoneyUtils", () => {
  describe('formatMoney', () => {
    it('formats EUR currency correctly', () => {
      const money: Money = { amount: 1234.56, currency: Currency.EUR }
      expect(formatMoney(money)).toBe('€1,234.56')
    })

    it('handles zero amount', () => {
      const money: Money = { amount: 0, currency: Currency.EUR }
      expect(formatMoney(money)).toBe('€0.00')
    })

    it('handles negative amounts', () => {
      const money: Money = { amount: -99.99, currency: Currency.EUR }
      expect(formatMoney(money)).toBe('-€99.99')
    })

    it('rounds to two decimal places', () => {
      const money: Money = { amount: 10.999, currency: Currency.EUR }
      expect(formatMoney(money)).toBe('€11.00')
    })

    it('formats small amounts correctly', () => {
      const money: Money = { amount: 0.99, currency: Currency.EUR }
      expect(formatMoney(money)).toBe('€0.99')
    })
  })
})