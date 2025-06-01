import type { InputHTMLAttributes } from "react"

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-md bg-white border dark:border-0 dark:bg-secondary-bg-color dark:text-white border-primary-border-color px-3 py-2 text-sm text-gray-900
        placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${props.className || ''}`}
    />
  )
}
