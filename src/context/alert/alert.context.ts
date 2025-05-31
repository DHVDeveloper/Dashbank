import type { AlertData } from "@/ui/components/alert/atert"
import { createContext, useContext } from "react"

interface AlertContextType {
  showAlert: (alert:AlertData) => void
}

export const AlertContext = createContext<AlertContextType | null>(null)

export const useAlertContext = () => {
  const context = useContext(AlertContext)
  if (!context) throw new Error("useAlert must be used within an AlertProvider")
  return context
}

