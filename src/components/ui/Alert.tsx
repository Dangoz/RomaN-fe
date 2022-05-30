import React, { useState } from 'react'
import { CheckIcon } from '@heroicons/react/outline'

interface AlertProps {
  title: string
  message: string
}

const Alert = ({ title, message }: AlertProps) => {
  return (
    <>
      <div className="bg-teal-100 border-l-4 border-teal-500 text-orange-700 p-4" role="alert">
        <p className="font-bold">{title}</p>
        <CheckIcon />
        <p>{message}</p>
      </div>
    </>
  )
}

export default Alert
