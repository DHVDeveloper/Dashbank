import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, className = "", ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center py-2 px-4 rounded-md bg-primary-button-bg-color  text-white text-sm
        disabled:opacity-50 ${!rest.disabled && 'hover:bg-primary-button-bg-color/30 cursor-pointer'}  transition-colors ${className}`}
    >
      {children}
    </button>
  )
}
