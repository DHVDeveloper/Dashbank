import { describe, expect, it } from "vitest"
import { formatDate, getCurrentDateToForm } from "../../utils/date"

describe("dateUtils", () => {
  describe("getCurrentDateToForm", () => {
    it("should format provided date correctly", () => {
      const testDate = new Date(2024, 11, 25)
      const result = getCurrentDateToForm(testDate)
      expect(result).toBe("2024-12-25")
    })

    it("should pad single-digit month and day with zeros", () => {
      const testDate = new Date(2024, 0, 5)
      const result = getCurrentDateToForm(testDate)
      expect(result).toBe("2024-01-05")
    })
  })
  describe('formatDate', () => {
    it('should format date to "en-EU" locale string', () => {
      const testDate = new Date(2024, 6, 4) 
      const result = formatDate(testDate)
      
      expect(result).toMatch(/Jul 4, 2024/)
    })

    it('should handle Date object input', () => {
      const testDate = new Date('2023-03-15T00:00:00')
      const result = formatDate(testDate)
      expect(result).toMatch(/Mar 15, 2023/)
    })

    it('should handle different months correctly', () => {
      const janDate = new Date(2024, 0, 1)
      expect(formatDate(janDate)).toMatch(/Jan/)
      
      const decDate = new Date(2024, 11, 31)
      expect(formatDate(decDate)).toMatch(/Dec/)
    })
  })

})
