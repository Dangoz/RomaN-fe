import React from 'react'
import Profile from './Profile'
import GradientWrapper from '../ui/GradientWrapper'

interface GradientProfileProps {
  address: string
  width: number
  height: number
  className?: string
}

const GradientProfile = ({ address, width, height, className }: GradientProfileProps) => {
  return (
    <>
      <GradientWrapper width={width} height={height} borderRaidus={10} borderWidth={7} hover={false}>
        <Profile address={address} width={width} height={height} className={className} />
      </GradientWrapper>
    </>
  )
}

export default GradientProfile
