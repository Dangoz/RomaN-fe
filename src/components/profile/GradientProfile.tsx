import React from 'react'
import Profile from './Profile'
import GradientWrapper from '../ui/GradientWrapper'

interface GradientProfileProps {
  address: string
  width: number
  height: number
}

const GradientProfile = ({ address, width, height }: GradientProfileProps) => {
  return (
    <>
      <GradientWrapper width={width} height={height} borderRaidus={10} borderWidth={6} hover={false}>
        <Profile address={address} width={width} height={height} />
      </GradientWrapper>
    </>
  )
}

export default GradientProfile
