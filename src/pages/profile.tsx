import React from 'react'
import type { NextPage } from 'next'
import NavBar from '@/components/navigation/NavBar'
import ProfileContainer from '@/components/profile/ProfileContainer'

const Profile: NextPage = () => {
  return (
    <>
      <NavBar />
      <ProfileContainer />
    </>
  )
}

export default Profile
