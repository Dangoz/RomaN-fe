import IXMTP from '@/types/xmtp'
import React, { createContext, useReducer } from 'react'
import { XMTPActions } from './actions'
import xmtpReducer from './reducer'

// default unconnected data for xmtp
export const initialState: IXMTP = {
  address: '',
  signer: null,
  client: null,
  conversations: [],
  messageStore: {},
}

export interface IXMTPContext {
  xmtpState: IXMTP
  xmtpDispatch: React.Dispatch<XMTPActions>
}

export const xmtpContext = createContext<IXMTPContext>({
  xmtpState: initialState,
  xmtpDispatch: () => {},
})

const XMTPContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [xmtpState, xmtpDispatch] = useReducer(xmtpReducer, initialState)

  return (
    <>
      <xmtpContext.Provider value={{ xmtpState, xmtpDispatch }}>{children}</xmtpContext.Provider>
    </>
  )
}

export default XMTPContextProvider
