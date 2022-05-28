import { xmtpContext, IXMTPContext } from '@/states/xmtp/xmtpContext'
import { useContext } from 'react'

const useXMTP = (): IXMTPContext => {
  const context = useContext(xmtpContext)
  if (context === undefined) {
    throw new Error('useXMTP must be used within XMTPContextProvider')
  }
  return context
}

export default useXMTP
