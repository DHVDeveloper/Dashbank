import React, { useEffect, useRef, useState } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside'

interface ModalProps {
  isOpen: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [visible, setVisible] = useState(isOpen)
  const modalRef = useRef(null)

  useClickOutside(modalRef,onClose)
  
  useEffect(() => {
    if (isOpen) {
      setVisible(true)
    } else {
      const timeout = setTimeout(() => {setVisible(false)}, 300)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  if (!visible) return null

  return (
    <div className="fixed text-primary-text-color inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className={`fixed inset-0 bg-[#00000080] bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
        />
        <div
          ref={modalRef}
          className={`relative bg-white dark:bg-primary-bg-color rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ${
            isOpen ? 'animate-fade-in' : 'animate-fade-out'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-primary-border-color">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 font-bold p-2  cursor-pointer hover:text-gray-900 transition-colors"
            >
              X
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
