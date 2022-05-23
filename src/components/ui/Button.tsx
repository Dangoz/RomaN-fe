import React, { ReactNode } from 'react'
import Spinner from './Spinner'

interface ButtonProps {
  text?: string
  color?: string
  onClick?: (...args: any[]) => void
  className?: string
  isLoading?: boolean
  children?: ReactNode
}

const Button = ({ text, color, onClick, className, isLoading = false, children }: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      onClick(e)
    }
  }

  const colorClass =
    color === 'Metamask' ? 'text-[#944300]' : color === 'WalletConnect' ? 'text-[#2B8AFF]' : 'text-black'
  const bgColorClass = 'bg-gray-200 hover:bg-gray-300'

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-5 cursor-pointer rounded-sm
    w-[360px] h-[40px] 
    ${bgColorClass} ${colorClass} 
    ${className}`}
      onClick={handleClick}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex items-center gap-2">
          {text} {children}
        </div>
      )}
    </div>
  )
}

export default Button
