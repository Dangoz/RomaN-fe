import React from 'react'
import type { NextPage } from 'next'
import NavBar from '@/components/navigation/NavBar'
import useCyberConnect from '@/hooks/useCyberConnect'
import useUser from '@/hooks/useUser'
import Button from '@/components/ui/Button'

const Explore: NextPage = () => {
  const {
    userState: { address, provider },
  } = useUser()

  return (
    <>
      <NavBar />
      <div>explore : {address}</div>
      <br />

      <Button></Button>
    </>
  )
}

export default Explore
