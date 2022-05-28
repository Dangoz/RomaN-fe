import React, { useEffect, useState, useCallback } from 'react'
import ConnectionWrapper from './ConnectionWrapper'
import cyberconnect from '@/common/cyberconnect'
import { IConnection } from '@/types/connection'
import config from '@/common/config'
import useUser from '@/hooks/useUser'

const LikersBox = () => {
  const {
    userState: { address },
  } = useUser()
  const [page, setPage] = useState<number>(1)
  const [likers, setLikers] = useState<IConnection[]>([])

  const handleLikers = useCallback(async () => {
    const likers = await cyberconnect.getLikers(address, config.cyberConnect.boxLimits.likers, page)
    return likers
  }, [address, page])

  useEffect(() => {
    ;(async () => {
      const likers = await handleLikers()
      setLikers(likers)
    })()
  }, [handleLikers])

  return (
    <ConnectionWrapper>
      <div>
        Likers
        {likers.map((liker, index) => (
          <div key={index}>{liker.address}</div>
        ))}
      </div>
    </ConnectionWrapper>
  )
}

export default LikersBox
