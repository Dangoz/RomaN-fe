import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import NavBar from '@/components/navigation/NavBar'

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <h1 className="text-3xl font-bold underline">RomaN</h1>
    </>
  )
}

export default Home
