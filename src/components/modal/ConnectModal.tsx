import { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import Button from '@/components/ui/Button'
import MetaMask from '@/components/icons/MetaMask'
import WalletConnect from '@/components/icons/WalletConnect'
import connect from '@/common/connect'
import useUser from '@/hooks/useUser'

interface ConnectModalProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const ConnectModal = ({ setActive }: ConnectModalProps) => {
  const { userState: user, userDispatch: dispatch } = useUser()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleConnect = async (method: 'MetaMask' | 'WalletConenct') => {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    await connect.connectWallet(method, dispatch)
    setActive(false)
  }

  useEffect(() => {
    return () => {
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      {
        <ModalWrapper setActive={setActive}>
          <div
            className={
              'absolute h-[330px] w-[400px] flex flex-col items-center justify-center shadow-xl z-50 bg-white rounded-md'
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className={'mb-10 text-lg lg:text-2xl font-normal text-center'}>Welcome, Please Connect Wallet</div>

            <Button color={'Metamask'} width={360} isLoading={isLoading} onClick={() => handleConnect('MetaMask')}>
              <MetaMask size={30} />
              <span>MetaMask</span>
            </Button>

            <div className="h-[15px]" />

            <Button
              color={'WalletConnect'}
              width={360}
              isLoading={isLoading}
              onClick={() => handleConnect('WalletConenct')}
            >
              <WalletConnect size={30} />
              <span>WalletConnect</span>
            </Button>
          </div>
        </ModalWrapper>
      }
    </>
  )
}

export default ConnectModal
