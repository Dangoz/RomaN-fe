import React, { useEffect, useState, useCallback } from 'react'
import ConnectionWrapper from './ConnectionWrapper'
import cyberconnect from '@/common/cyberconnect'
import { IConnection } from '@/types/connection'
import config from '@/common/config'
import useUser from '@/hooks/useUser'

const BlackListBox = () => {
  const {
    userState: { address },
  } = useUser()
  const [page, setPage] = useState<number>(1)
  const [blacklist, setBlacklist] = useState<IConnection[]>([])

  const handleBlacklist = useCallback(async () => {
    const blacklist = await cyberconnect.getBlackList(address, config.cyberConnect.boxLimits.blacklist, page)
    return blacklist
  }, [address, page])

  useEffect(() => {
    ;(async () => {
      const likers = await handleBlacklist()
      setBlacklist(likers)
    })()
  }, [handleBlacklist])

  return (
    <ConnectionWrapper>
      <div>
        blacklist
        {blacklist.map((blocked, index) => (
          <div key={index}>{blocked.address}</div>
        ))}
      </div>
    </ConnectionWrapper>
  )
}

export default BlackListBox
