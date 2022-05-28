import React, { useEffect, useState, useCallback } from 'react'
import ConnectionWrapper from './ConnectionWrapper'
import cyberconnect from '@/common/cyberconnect'
import { IConnection } from '@/types/connection'
import config from '@/common/config'
import useUser from '@/hooks/useUser'

const MatchesBox = () => {
  const {
    userState: { address, provider },
  } = useUser()
  const [page, setPage] = useState<number>(1)
  const [matches, setMatches] = useState<IConnection[]>([])

  const handleMatches = useCallback(async () => {
    const matches = await cyberconnect.getMatches(address, config.cyberConnect.boxLimits.matches, page)
    return matches
  }, [address, page])

  useEffect(() => {
    ;(async () => {
      const matches = await handleMatches()
      setMatches(matches)
    })()
  }, [handleMatches])

  return (
    <ConnectionWrapper>
      <div>
        Matches
        {matches.map((match, index) => (
          <div key={index}>{match.address}</div>
        ))}
      </div>
    </ConnectionWrapper>
  )
}

export default MatchesBox
