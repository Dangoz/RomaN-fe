import React, { useState } from 'react'
import ConnectModal from '../modal/ConnectModal'
import Button from '../ui/Button'
import Logo from '../icons/Logo'

const NavBar = () => {
  const [showConnect, setShowConnect] = useState<boolean>(false)

  return (
    <>
      {showConnect && <ConnectModal setActive={setShowConnect} />}

      <div className="sticky h-[64px] border-b-2 flex items-center justify-between px-10 top-0">
        <Logo />

        <Button className="w-[200px] h-[36px]" onClick={() => setShowConnect(true)}>
          Connect
        </Button>
      </div>
    </>
  )
}

export default NavBar
