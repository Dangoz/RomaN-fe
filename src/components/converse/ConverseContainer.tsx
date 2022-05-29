import React, { useState, useEffect } from 'react'
import GradientWrapper from '../ui/GradientWrapper'
import Matches from './Matches'
import Chat from './Chat'
import useUser from '@/hooks/useUser'
import useXMTP from '@/hooks/useXMTP'
import { XMTPActionPayloads, XMTPActionTypes } from '@/states/xmtp/actions'
import { Client } from '@xmtp/xmtp-js'
import { handleWarning, handleError } from '@/common/error'

const ConverseContainer = () => {
  const [peerAddress, setPeerAddress] = useState<string>('')
  const {
    userState: { address, provider },
  } = useUser()
  const {
    xmtpState: { address: xmtpAdress, signer: xmtpSigner, client },
    xmtpDispatch,
  } = useXMTP()

  useEffect(() => {
    // check for whether user is still connected
    if (address.length > 0 && provider != null) {
      // when user/wallet is connected, check for XMTP connection
      if (xmtpAdress === '' || xmtpSigner === null) {
        handleWarning('Connecting to XMTP network, please sign...')
        // connect user with XMTP as well
        const initXMTP = async () => {
          const signer = provider.getSigner()
          try {
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
          } catch (err) {
            handleError(err as Error)
          }
        }
        initXMTP()
      }
    }
  }, [provider, address, xmtpAdress, xmtpDispatch, xmtpSigner])

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
