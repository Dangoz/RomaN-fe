import React, { useState, useEffect, useCallback } from 'react'
import ConnectModal from '../modal/ConnectModal'
import Button from '../ui/Button'
import Logo from '../icons/Logo'
import useUser from '@/hooks/useUser'
import PortraitMenu from './PortraitMenu'
import connect from '@/common/connect'
import Menu from './Menu'

const NavBar = () => {
  const [showConnect, setShowConnect] = useState<boolean>(false)
  const {
    userState: { address, provider },
    userDispatch,
  } = useUser()

  const reconnect = useCallback(async () => {
    if (!address || !provider) {
      await connect.reconnect(userDispatch)
    }
  }, [address, provider, userDispatch])

  useEffect(() => {
    reconnect()
  }, [reconnect])

  return (
    <>
      {showConnect && <ConnectModal setActive={setShowConnect} />}

      <div className="sticky h-[64px] border-b-2 flex items-center justify-between px-10 top-0">
        <Logo />

        <Menu connected={address.length > 0 && provider != null} />

        <div>
          {address.length && provider ? (
            <PortraitMenu name={address} />
          ) : (
            <Button className="w-[200px] h-[36px]" onClick={() => setShowConnect(true)}>
              Connect
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default NavBar
