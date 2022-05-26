import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import GradientWrapper from '../ui/GradientWrapper'

interface PortraitProps {
  name: string
  avatar?: string
}

const Portrait = ({ name, avatar }: PortraitProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <>
      <GradientWrapper borderRaidus={50} width={210} height={60} borderWidth={5} hover={true}>
        <img
          className="w-[55px] h-[55px] rounded-full border-solid border-2 border-purple-500 mr-2"
          src={avatar ? avatar : '/ethShanghai.png'}
          alt="avatar"
        />

        <div className="text-ellipsis overflow-hidden w-[90px]">{name}</div>

        <ChevronDownIcon className="mx-2 h-6 w-6" />
      </GradientWrapper>
    </>
  )
}

export default Portrait
