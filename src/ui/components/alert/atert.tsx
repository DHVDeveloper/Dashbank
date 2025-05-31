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
      <span className="px-1">{alert.message}</span>
      <button onClick={onClose} className="text-sm text-gray-400 font-bold p-2 cursor-pointer hover:text-gray-900">
       X
      </button>
    </div>
  )
}
