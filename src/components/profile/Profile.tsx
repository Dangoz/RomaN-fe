import React, { useEffect, useState } from 'react'
import profileGenerator from '@/common/profile'
import Spinner from '@/components/ui/Spinner'
import IProfile from '@/types/profile'

interface ProfileProps {
  address: string
}

const Profile = ({ address }: ProfileProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [profile, setProfile] = useState<IProfile | null>(null)

  useEffect(() => {
    if (!address) {
      return
    }
    const getProfile = async () => {
      const profile = await profileGenerator(address)
      setProfile(profile)
    }
    getProfile()
  }, [address])

  return (
    <>
      <div className=" overflow-hidden h-[200px] w-[300px]">{JSON.stringify(profile, null, 2)}</div>
    </>
  )
}

export default Profile
