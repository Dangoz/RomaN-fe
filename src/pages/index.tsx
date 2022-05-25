import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import useUser from '@/hooks/useUser'

import NavBar from '@/components/navigation/NavBar'

const Home: NextPage = () => {
  const {
    userState: { address, provider },
  } = useUser()

  const [answer, setAnswer] = useState<string>('nope')

  useEffect(() => {
    if (provider === null) {
      return
    }
    ;(async () => {
      const add = await provider?.getSigner().getAddress()
      const signer = await provider.getSigner()
      const wei = await signer.getBalance()
      const balance = await ethers.utils.formatEther(wei)
      setAnswer(`${balance}`)
    })()
  }, [provider])

  return (
    <>
      <NavBar />
      ADDRESS: {address}
      <br />
      BALANCE: {answer}
      <br />
    </>
  )
}

export default Home
