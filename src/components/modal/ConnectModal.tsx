import ModalWrapper from './ModalWrapper'
import Button from '@/components/ui/Button'
import Metamask from '@/components/icons/Metamask'
import WalletConnect from '@/components/icons/WalletConnect'

interface ConnectModalProps {
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const ConnectModal = ({ active, setActive }: ConnectModalProps) => {
  return (
    <>
      {active && (
        <ModalWrapper setActive={setActive}>
          <div
            className={
              'absolute h-[330px] w-[400px] flex flex-col items-center justify-center shadow-xl z-50 bg-white rounded-md'
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className={'mb-10 text-lg lg:text-2xl font-normal text-center'}>Welcome, Please Connect Wallet</div>

            <Button color={'Metamask'} width={360}>
              <Metamask size={30} />
              <span>Metamask</span>
            </Button>

            <div className="h-[15px]" />

            <Button color={'WalletConnect'} width={360}>
              <WalletConnect size={30} />
              <span>WalletConnect</span>
            </Button>
          </div>
        </ModalWrapper>
      )}
    </>
  )
}

export default ConnectModal
