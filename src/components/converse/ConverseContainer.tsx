import React, { useState, useEffect } from 'react'
import GradientWrapper from '../ui/GradientWrapper'
import Matches from './Matches'
import Chat from './Chat'

const ConverseContainer = () => {
  const [peerAddress, setPeerAddress] = useState<string>('')

  return (
    <div className="relative w-screen h-auto flex items-center justify-center mt-5">
      <GradientWrapper width={800} height={600} borderRaidus={10} hover={false} className="h-10 w-10">
        <Matches setPeerAddress={setPeerAddress} />
        <Chat peerAddress={peerAddress} />
      </GradientWrapper>
    </div>
  )
}

export default ConverseContainer
