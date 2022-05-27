import React, { useState, useEffect, useCallback } from 'react'
import ConnectModal from '../modal/ConnectModal'
import Button from '../ui/Button'
import Logo from '../icons/Logo'
import useUser from '@/hooks/useUser'
import PortraitMenu from './PortraitMenu'
import connect from '@/common/connect'
import Menu from './Menu'
import Router from 'next/router'
import config from '@/common/config'

const NavBar = () => {
  const [showConnect, setShowConnect] = useState<boolean>(false)
  const {
    userState: { address, provider },
    userDispatch,
  } = useUser()

  useEffect(() => {
    // check for whether user is still connected
    if (address.length > 0 && provider != null) {
      return
    }

    // if not and accessing protected path, redirect to '/'
    const path = Router.pathname
    if (config.protectedPath.includes(path)) {
      Router.push('/')
    }
  }, [address, provider])

  const reconnect = useCallback(async () => {
    // if user is unconnected, attempt reconnect
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

      <div className="sticky h-[70px] flex items-center justify-between px-10 top-2">
        <Logo />

        <Menu connected={address.length > 0 && provider != null} />

        <div>
          {address.length && provider ? (
            <PortraitMenu name={address} avatar={''} />
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
