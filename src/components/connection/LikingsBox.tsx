import React, { useEffect, useState, useCallback } from 'react'
import ConnectionWrapper from './ConnectionWrapper'
import cyberconnect from '@/common/cyberconnect'
import { IConnection } from '@/types/connection'
import config from '@/common/config'
import useUser from '@/hooks/useUser'

const LikingsBox = () => {
  const {
    userState: { address },
  } = useUser()
  const [page, setPage] = useState<number>(1)
  const [likings, setlikings] = useState<IConnection[]>([])

  const handleLikings = useCallback(async () => {
    const likings = await cyberconnect.getLikings(address, config.cyberConnect.boxLimits.likings, page)
    return likings
  }, [address, page])

  useEffect(() => {
    ;(async () => {
      const likings = await handleLikings()
      setlikings(likings)
    })()
  }, [handleLikings])

  return (
    <ConnectionWrapper>
      <div>
        Likings
        {likings.map((liking, index) => (
          <div key={index}>{liking.address}</div>
        ))}
      </div>
    </ConnectionWrapper>
  )
}

export default LikingsBox
