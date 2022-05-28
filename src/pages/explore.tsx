import React from 'react'
import type { NextPage } from 'next'
import NavBar from '@/components/navigation/NavBar'
import useCyberConnect from '@/hooks/useCyberConnect'
import useUser from '@/hooks/useUser'
import Button from '@/components/ui/Button'

import LikersBox from '@/components/connection/LikersBox'
import BlackListBox from '@/components/connection/BlackListBox'
import LikingsBox from '@/components/connection/LikingsBox'
import MatchesBox from '@/components/connection/MatchesBox'
import RecommendationBox from '@/components/connection/RecommendationBox'

const Explore: NextPage = () => {
  const {
    userState: { address, provider },
  } = useUser()

  return (
    <>
      <NavBar />
      <div>explore : {address}</div>
      <br />

      <div className="ml-8">
        <LikersBox />
        <LikingsBox />
        <BlackListBox />
        <MatchesBox />
        <RecommendationBox />
      </div>
    </>
  )
}

export default Explore
