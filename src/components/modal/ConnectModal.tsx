import { useState } from 'react'
import ModalWrapper from './ModalWrapper'

const ConnectModal = () => {
  const [active, setActive] = useState(true)
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
            <div className={'mb-5 text-lg lg:text-2xl font-normal text-center'}>Welcome, Please Connect Wallet</div>
          </div>
        </ModalWrapper>
      )}
    </>
  )
}

export default ConnectModal
