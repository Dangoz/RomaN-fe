import React from 'react'

interface ButtonProps {
  width?: number
  height?: number
  onClick?: (...args: any[]) => void
  className?: string
  isLoading?: boolean
}

const Button = ({ width = 200, height = 40, onClick, className, isLoading = false }: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <>
      <div className={`${className} w-[${width}px] h-[${height}px]`} onClick={handleClick}></div>
    </>
  )
}

export default Button
