import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center py-2 px-4 rounded-md bg-primary-button-bg-color cursor-pointer text-white text-sm
        disabled:opacity-50 hover:bg-primary-button-bg-color/80 transition-colors ${className}`}
    >
      {children}
    </button>
  )
}
