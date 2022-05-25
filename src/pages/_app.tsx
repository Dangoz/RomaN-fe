import '../styles/globals.css'
import type { AppProps } from 'next/app'
import UserContextProvider from '@/states/user/userContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </>
  )
}

export default MyApp
