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
import useXMTP from '@/hooks/useXMTP'
import GradientWrapper from '../ui/GradientWrapper'

const NavBar = () => {
  const [showConnect, setShowConnect] = useState<boolean>(false)
  const {
    userState: { address, provider },
    userDispatch,
  } = useUser()
  const {
    xmtpState: { address: xmtpAdress, signer: xmtpSigner },
    xmtpDispatch,
  } = useXMTP()

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

      <div className="sticky h-[70px] flex items-center justify-between px-10 top-2 z-50">
        <div className="w-60">
          <Logo />
        </div>
        {/* {"XMTP:" + xmtpAdress} */}
        <Menu connected={address.length > 0 && provider != null} />

        <div className="w-60 pl-[20px]">
          {address.length && provider ? (
            <PortraitMenu name={address} avatar={''} />
          ) : (
            <GradientWrapper width={200} height={45} borderWidth={5} borderRaidus={5} className="">
              <button
                className="w-[200px] h-[45px] hover:text-white pt-1"
                style={{ fontFamily: 'papyrus' }}
                onClick={() => setShowConnect(true)}
              >
                Connect
              </button>
            </GradientWrapper>
          )}
        </div>
      </div>
    </>
  )
}

export default NavBar
