import React from 'react'
import type { NextPage } from 'next'
import NavBar from '@/components/navigation/NavBar'
import cyberConnectClient from '@/common/cyberconnect'
import useUser from '@/hooks/useUser'

const Explore: NextPage = () => {
  const {
    userState: { address, provider },
  } = useUser()

  return (
    <>
      <NavBar />
      <div>explore</div>
    </>
  )
}

export default Explore
