import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export function TextArea({ className = "", ...rest }: TextAreaProps) {
  return (
    <textarea
      {...rest}
      className={`block  bg-white w-full dark:border-0 dark:bg-secondary-bg-color dark:text-white rounded-md border border-gray-300 py-2 px-3
        placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed transition-colors
        ${className}`}
    />
  );
}