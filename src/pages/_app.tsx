import '../styles/globals.css'
import type { AppProps } from 'next/app'
import UserContextProvider from '@/states/user/userContext'
import XMTPContextProvider from '@/states/xmtp/xmtpContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserContextProvider>
        <XMTPContextProvider>
          <Component {...pageProps} />
        </XMTPContextProvider>
      </UserContextProvider>
    </>
  )
}

export default MyApp
