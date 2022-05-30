import React, { Dispatch, useState, useEffect, useCallback } from 'react'
import cyberconnect from '@/common/cyberconnect'
import { IConnection } from '@/types/connection'
import config from '@/common/config'
import useUser from '@/hooks/useUser'
import Button from '@/components/ui/Button'

interface MatchesProps {
  setPeerAddress: Dispatch<React.SetStateAction<string>>
}

const Matches = ({ setPeerAddress }: MatchesProps) => {
  const {
    userState: { address, provider },
  } = useUser()
  const [matches, setMatches] = useState<IConnection[]>([])
  const [page, setPage] = useState<number>(1)

  const handleMatches = useCallback(async () => {
    const matches = await cyberconnect.getMatches(address, config.cyberConnect.boxLimits.matches, page)
    return matches
  }, [address, page])

  useEffect(() => {
    const initMatches = async () => {
      const matches = await handleMatches()
      setMatches(matches)
    }
    initMatches()
  }, [handleMatches])

  return (
    <div className="w-[300px] h-[600px] border-r-2 border-purple-400 p-[10px] overflow-y-scroll">
      {matches.map((match, index) => (
        <div
          key={index}
          className="w-[280px] h-[100px] my-[10px] flex items-center border-b-2 border-pink-300 justify-center"
        >
          {/* match name */}
          <div className="overflow-hidden w-[180px] text-ellipsis hover:text-xs hover:break-words">
            {match.domain || match.address}
          </div>

          <button
            className="w-[70px] h-[40px] bg-transparent text-purple-700 font-semibold hover:text-white border hover:border-pink-600 hover:border-transparent 
            rounded hover:bg-gradient-to-r from-purple-400 to-pink-600"
            onClick={() => setPeerAddress(match.address)}
          >
            Chat
          </button>
        </div>
      ))}
    </div>
  )
}

export default Matches
