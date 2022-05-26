import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline'

interface PortraitProps {
  name: string
  avatar?: string
}

const Portrait = ({ name, avatar }: PortraitProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div
      className="w-[210px] h-[60px] rounded-[50px] flex justify-center items-center cursor-pointer
      bg-gradient-to-r from-purple-400 to-pink-600"
    >
      <div
        className="w-[205px] h-[55px] flex items-center bg-white rounded-[50px] transition-all duration-1000
        hover:bg-gradient-to-r from-purple-400 to-pink-600"
      >
        <img
          className="w-[55px] h-[55px] rounded-full border-solid border-2 border-purple-500 mr-2"
          src={avatar ? avatar : '/ethShanghai.png'}
          alt="avatar"
        />

        <div className="text-ellipsis overflow-hidden w-[90px]">{name}</div>

        <ChevronDownIcon className="mx-2 h-6 w-6" />
      </div>
    </div>
  )
}

export default Portrait
