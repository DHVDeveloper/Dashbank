export interface AlertData {
  message: string
  type: AlertType
}

export type AlertType = "neutral" | "success" | "danger" | "warning"

export function Alert({
  alert,
  onClose,
}: {
  alert: AlertData
  onClose: () => void
}) {
  const alertStyles:Record<AlertType,string> = {
    neutral: "bg-gray-200 border-gray-600",
    success: "bg-green-200 border-green-600",
    danger: "bg-red-200 border-red-600",
    warning: "bg-yellow-200 border-yellow-600",
  }

  return (
    <div
      className={`min-w-[250px] border-l-4 px-4 py-3 font-bold rounded-sm text-black shadow-md text-sm flex items-center justify-between gap-2
      ${alertStyles[alert.type]}`}
    >
      <span>{alert.message}</span>
      <button onClick={onClose} className="text-sm text-[#11111]">
       X
      </button>
    </div>
  )
}
