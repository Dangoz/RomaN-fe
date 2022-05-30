import React, { useEffect, useState } from 'react'
import profileGenerator from '@/common/profile'
import Spinner from '@/components/ui/Spinner'
import IProfile from '@/types/profile'
import GradientWrapper from '@/components/ui/GradientWrapper'

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
      setIsLoading(true)
      const profile = await profileGenerator(address)
      setProfile(profile)
      setIsLoading(false)
    }
    getProfile()
  }, [address])

  return (
    <>
      <div className="overflow-hidden h-[500px] w-[500px] flex justify-center items-center border-2 border-purple-700 rounded">
        {isLoading || !profile ? <Spinner /> : <div>{JSON.stringify(profile.address, null, 2)}</div>}
      </div>
    </>
  )
}

export default Profile
