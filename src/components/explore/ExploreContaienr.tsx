import React, { useState, useEffect } from 'react'
import { IRecommendation } from '@/types/connection'
import useCyberConnect from '@/hooks/useCyberConnect'
import useUser from '@/hooks/useUser'
import config from '@/common/config'
import ControlBar from './ControlBar'
import Swiper from './Swiper'

const ExploreContaienr = () => {
  const [recommendations, setRecommendations] = useState<IRecommendation[]>([])
  return (
    <div className="relative w-screen h-auto flex flex-col items-center justify-center mt-5">
      <ControlBar />
      <Swiper />
    </div>
  )
}

export default ExploreContaienr
