import React, { useState, useEffect } from 'react'
import { CheckIcon } from '@heroicons/react/outline'

interface SuccessAlertProps {
  title: string
  message: string
}

const SuccessAlert = ({ title, message }: SuccessAlertProps) => {
  const [show, setShow] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 1500)
  }, [])

  return (
    <>
      {show && (
        <div className="bg-teal-100 border-l-4 border-teal-500 text-orange-700 p-4 top-0 left-0" role="alert">
          <p className="font-bold">{title}</p>
          <CheckIcon />
          <p>{message}</p>
        </div>
      )}
    </>
  )
}

export default SuccessAlert
