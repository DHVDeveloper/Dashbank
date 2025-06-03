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
  describe('formatDate', () => {  it('should format date to exact "en-EU" format', () => {
    const testDate = new Date(2024, 6, 4)
    const result = formatDate(testDate)
    expect(result).toBe('Jul 4, 2024')
  })

  it('should handle Date object input with exact match', () => {
    const testDate = new Date('2023-03-15T00:00:00')
    const result = formatDate(testDate)
    expect(result).toBe('Mar 15, 2023')
  })

  it('should format different months exactly', () => {
    const janDate = new Date(2024, 0, 1)
    expect(formatDate(janDate)).toBe('Jan 1, 2024')
    
    const decDate = new Date(2024, 11, 31)
    expect(formatDate(decDate)).toBe('Dec 31, 2024')
  })
  })

})
