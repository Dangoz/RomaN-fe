import GradientWrapper from '@/components/ui/GradientWrapper'
import { ReactNode } from 'react'

interface ConnectionWrapperProps {
  children: ReactNode
}

const ConnectionWrapper = ({ children }: ConnectionWrapperProps) => {
  return (
    <>
      <GradientWrapper width={200} height={350} borderRaidus={20} borderWidth={2} hover={false}>
        {children}
      </GradientWrapper>
    </>
  )
}

export default ConnectionWrapper
