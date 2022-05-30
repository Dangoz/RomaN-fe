import React, { useRef, useEffect } from 'react'
import useUser from '@/hooks/useUser'
import GradientProfile from './GradientProfile'
import GradientWrapper from '../ui/GradientWrapper'

const ProfileContainer = () => {
  const profileRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    window.addEventListener('mousemove', mousemove)
  }, [])

  const mousemove = (e: any) => {
    if (!profileRef.current) {
      return
    }
    profileRef.current.style.transform = `translate3d(${getOffset(e.clientX, window.innerWidth, 28)}px, 
    ${getOffset(e.clientY, window.innerHeight, 10)}px, -50px) `
    profileRef.current.style.transform = `rotateX(${getOffset(e.clientY, window.innerHeight, 0)}deg)`
    profileRef.current.style.transform = `rotateY(${getOffset(e.clientX, window.innerWidth, 0)}deg)`

    // rotateX(${ getOffset(e.clientY, window.innerHeight, 0)}deg)
    // rotateY(${ getOffset(e.clientX, window.innerWidth, 0) }deg)
  }

  const getOffset = (position: number, windowInner: number, distance: number) => {
    return distance * 2 * (position / windowInner) - distance
  }

  const {
    userState: { address },
  } = useUser()
  return (
    <>
      <div className="w-full mt-10 h-full flex justify-between">
        <div className="pl-5 flex flex-col items-center justify-center">
          <GradientWrapper className="flex justify-center">MINT</GradientWrapper>
        </div>

        <div
          ref={(e) => (profileRef.current = e)}
          className="flex items-center justify-center bg-red-300 w-[700px] h-[600px] pr-10 pt-5"
        >
          <GradientProfile address={address} width={500} height={550} />
        </div>
      </div>
    </>
  )
}

export default ProfileContainer
