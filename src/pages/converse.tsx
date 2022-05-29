import React from 'react'
import type { NextPage } from 'next'
import NavBar from '@/components/navigation/NavBar'
import ConverseContainer from '@/components/converse/ConverseContainer'

const Converse: NextPage = () => {
  return (
    <>
      <NavBar />
      <ConverseContainer />
    </>
  )
}

export default Converse
