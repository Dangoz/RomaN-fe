import React, { useEffect, useState, useCallback } from 'react'
import ConnectionWrapper from './ConnectionWrapper'
import cyberconnect from '@/common/cyberconnect'
import { IRecommendation } from '@/types/connection'
import config from '@/common/config'
import useUser from '@/hooks/useUser'
import Button from '../ui/Button'
import useCyberConnect from '@/hooks/useCyberConnect'

const RecommendationBox = () => {
  const {
    userState: { address, provider },
  } = useUser()
  const { like, block } = useCyberConnect(provider)
  const [page, setPage] = useState<number>(1)
  const [recommendation, setRecommendation] = useState<IRecommendation[]>([])

  const handleRecommendation = useCallback(async () => {
    const recommendation = await cyberconnect.getRecommendation(
      address,
      config.cyberConnect.boxLimits.recommendation,
      page,
    )
    return recommendation
  }, [address, page])

  useEffect(() => {
    ;(async () => {
      const recommendation = await handleRecommendation()
      setRecommendation(recommendation)
    })()
  }, [handleRecommendation])

  const [input, setInput] = useState('')

  return (
    <ConnectionWrapper>
      <div>
        Recommendation
        {recommendation.map((rec, index) => (
          <div key={index}>
            {rec.address}
            {/* <Button onClick={() => {
            like(rec.address)
          }}>
            Like / Pursue
          </Button> */}
            <Button
              onClick={() => {
                like(rec.address)
              }}
            >
              Like / Pursue
            </Button>
          </div>
        ))}
        <div>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button
            onClick={() => {
              like(input)
            }}
          >
            Like / Pursue
          </Button>
        </div>
      </div>
    </ConnectionWrapper>
  )
}

export default RecommendationBox
