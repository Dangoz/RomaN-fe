import React from 'react'
import { CollectionIcon } from '@heroicons/react/outline'

const Stack = ({ stackCount }: { stackCount: number }) => {
  return (
    <div className="flex justify-center">
      <CollectionIcon className="" />
      {stackCount}
    </div>
  )
}

export default Stack
