import React from 'react'
import { CollectionIcon } from '@heroicons/react/outline'

const Stack = ({ stackCount }: { stackCount: number }) => {
  return (
    <div className="h-[50px] w-[100px] flex justify-center items-center">
      <CollectionIcon className="h-7 w-7 mr-1" />
      <div className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-3xl">
        {stackCount}
      </div>
    </div>
  )
}

export default Stack
