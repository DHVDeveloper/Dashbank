import { useEffect, useState } from "react"
import { AlertContext } from "./alert.context"
import { Alert, type AlertData } from "@/ui/components/alert/atert"

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [currentAlert, setCurrentAlert] = useState<AlertData | null>(null)
  const [visible, setVisible] = useState(false)

  const showAlert = ({ message, type }: AlertData) => {
    setCurrentAlert({ message, type })
    setVisible(true)

    setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  useEffect(() => {
    if (!visible) {
      const timeout = setTimeout(() => {
        setCurrentAlert(null)
      }, 300) 
      return () => clearTimeout(timeout)
    }
  }, [visible])

  const removeAlert = () => {
    setVisible(false)
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {currentAlert && (
        <div className={`fixed bottom-4 right-4 z-50 ${visible ? "animate-fade-in" : "animate-fade-out"}`}>
          <Alert alert={currentAlert} onClose={removeAlert} />
        </div>
      )}
    </AlertContext.Provider>
  )
}
