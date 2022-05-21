import { PropsWithChildren } from 'react'

interface ModalWrapperProps {
  children: React.ReactNode
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalWrapper = ({ children, setActive }: PropsWithChildren<ModalWrapperProps>) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-slate-300 z-0`}
        onClick={() => setActive(false)}
      >
        {children}
      </div>
      <div className=" z-50">lalaa</div>
    </>
  )
}

export default ModalWrapper
