import React, { useState, useEffect, useCallback } from 'react'
import { IRecommendation } from '@/types/connection'
import cyberconnect from '@/common/cyberconnect'
import useUser from '@/hooks/useUser'
import config from '@/common/config'
import ControlBar from './ControlBar'
import Swiper from './Swiper'
import { handleQuestion } from '@/common/alert'
import { ethers } from 'ethers'

const handleRecommendation = async (address: string, page: number): Promise<IRecommendation[]> => {
  const recommendation = await cyberconnect.getRecommendation(
    address,
    config.cyberConnect.boxLimits.recommendation,
    page,
  )
  return recommendation
}

const ExploreContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [page, setPage] = useState(1)
  const {
    userState: { address },
  } = useUser()
  const [recommendation, setRecommendation] = useState<string[]>([])
  const [target, setTarget] = useState<string>(address)

  useEffect(() => {
    const getRecommendation = async () => {
      setIsLoading(true)
      let recommendation = (await handleRecommendation(target, page)).map((rec) => rec.address)
      if (recommendation.length === 0) {
        // when recommendation runs out for current user, use vitalik's instead
        setPage(1)
        setTarget(config.mockAddress as string)
      }
      setRecommendation(recommendation)
      setIsLoading(false)
    }
    getRecommendation()
  }, [target, page])

  useEffect(() => {
    setTarget(address)
  }, [address])

  const handleSearch = (input: string) => {
    const check = ethers.utils.isAddress(input)
    if (!check) {
      handleQuestion('Invalid Address, Please Try Again.', false, 'Info')
      return
    }
    setRecommendation([input, ...recommendation])
  }

  // handling effects of proceeding to next profile upon discard or like action
  const handleNextProfile = () => {
    const rec = recommendation.slice(1)
    setRecommendation(rec)
    if (rec.length === 0) {
      setPage(page + 1)
    }
  }

  return (
    <div className="relative w-screen h-auto flex flex-col items-center justify-center mt-5">
      <ControlBar handleSearch={handleSearch} />
      <Swiper addresses={recommendation} handleNextProfile={handleNextProfile} isLoading={isLoading} />
    </div>
  )
}

export default ExploreContainer
