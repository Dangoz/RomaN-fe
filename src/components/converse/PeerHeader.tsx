import React from 'react'
import PeerHeaderMenu from './PeerHeaderMenu'

const PeerHeader = ({ peerAddress }: { peerAddress: string }) => {
  return (
    <>
      <div className="relative h-[60px] border-b-2 w-full flex justify-between items-center px-3 z-30">
        {/* name */}
        <div
          className="text-ellipsis overflow-hidden w-[300px] 
        h-auto hover:text-xs hover:break-words pr-20"
        >
          {peerAddress}
        </div>

        {/* options */}
        {peerAddress && <PeerHeaderMenu peerAddress={peerAddress} />}
      </div>
    </>
  )
}

export default PeerHeader
