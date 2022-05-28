import React from 'react'
import Link from 'next/link'

const Logo = () => {
  return (
    <>
      <Link href="/">
        <h1
          className="text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer"
          style={{ fontFamily: 'papyrus' }}
        >
          RomaN
        </h1>
      </Link>
    </>
  )
}

export default Logo
