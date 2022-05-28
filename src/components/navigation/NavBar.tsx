import React, { useState, useEffect, useCallback, useRef } from 'react'
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
import { XMTPActionPayloads, XMTPActionTypes } from '@/states/xmtp/actions'
import { Client } from '@xmtp/xmtp-js'

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

  useEffect(() => {
    // check for whether user is still connected
    if (address.length > 0 && provider != null) {
      // when user/wallet is connected, check for XMTP connection
      if (xmtpAdress === '' || xmtpSigner === null) {
        // connect user with XMTP as well
        const initXMTP = async () => {
          const signer = provider.getSigner()
          const xmtpClient = await Client.create(signer)
          const xmtpConnectPayload: XMTPActionPayloads['CONNECT'] = {
            address: address,
            signer: signer,
            client: xmtpClient,
          }
          xmtpDispatch({
            type: XMTPActionTypes.connect,
            payload: xmtpConnectPayload,
          })
        }
        initXMTP()
      }
    }
  }, [provider, address, xmtpAdress, xmtpDispatch, xmtpSigner])

  const reconnect = useCallback(async () => {
    // if user is unconnected, attempt reconnect
    if (!address || !provider) {
      await connect.reconnect(userDispatch)
    }
  }, [address, provider, userDispatch])

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

  useEffect(() => {
    reconnect()
  }, [reconnect])

  return (
    <>
      {showConnect && <ConnectModal setActive={setShowConnect} />}

      <div className="sticky h-[70px] flex items-center justify-between px-10 top-2">
        <div className="w-60">
          <Logo />
        </div>
        {/* {"XMTP:" + xmtpAdress} */}
        <Menu connected={address.length > 0 && provider != null} />

        <div className="w-60 pl-[20px]">
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
