export function getCurrentDateToForm() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}

export function formatDate(dateString: Date): string {
  return new Date(dateString).toLocaleDateString("en-EU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}