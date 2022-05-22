import React, { useState } from 'react'
import ConnectModal from '../modal/ConnectModal'
import Button from '../ui/Button'

const NavBar = () => {
  const [showConnect, setShowConnect] = useState<boolean>(false)

  const handleConnect = () => {
    setShowConnect(true)
  }

  return (
    <>
      <ConnectModal active={showConnect} setActive={setShowConnect} />

      <div className="sticky h-[64px] border-b-2 flex items-center justify-between px-10">
        <h1 className="text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-default">
          RomaN
        </h1>

        <Button className="w-[200px] h-[36px]" onClick={handleConnect}>
          Connect
        </Button>
      </div>
    </>
  )
}

export default NavBar
