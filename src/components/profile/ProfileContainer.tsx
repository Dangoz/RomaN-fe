import React, { useRef, useEffect, useCallback, useState } from 'react'
import useUser from '@/hooks/useUser'
import GradientProfile from './GradientProfile'
import GradientWrapper from '../ui/GradientWrapper'
import { tokenContract, userContract } from '@/common/contract'
import { handleSuccess } from '@/common/alert'

const ProfileContainer = () => {
  const {
    userState: { address, provider },
  } = useUser()
  const profileRef = useRef<HTMLDivElement | null>(null)
  const [didMint, setDidMint] = useState<boolean>(false)
  const [behaviorScore, setBehaviorScore] = useState<number>(0)

  useEffect(() => {
    window.addEventListener('mousemove', mousemove)
  }, [])

  // handle withdraw
  const handleBehavior = useCallback(async () => {
    if (!provider) {
      return
    }
    try {
      const contract = await userContract(provider.getSigner())
      const behaviorScore = await contract.getBehavior(address)
      setBehaviorScore(behaviorScore)
    } catch (err) {
      console.log((err as Error).message)
    }
  }, [address, provider])

  useEffect(() => {
    handleBehavior()
  }, [didMint])

  // check whether user has a RomaN NFT
  const handleCheckMint = useCallback(async () => {
    if (!provider) {
      return
    }
    try {
      const contract = await tokenContract(provider.getSigner())
      const check = await contract.didMint(address)
      setDidMint(check)
    } catch (err) {
      console.log((err as Error).message)
    }
  }, [provider, address])

  useEffect(() => {
    handleCheckMint()
  }, [])

  const handleMint = useCallback(async () => {
    if (!provider) {
      return
    }
    try {
      const contract = await tokenContract(provider.getSigner())
      const result = await contract.safeMint(address)
      handleSuccess(`Mint Success, Welcome to RomaN!`)
      console.log('Mint Result', result)
    } catch (err) {
      console.log((err as Error).message)
    }
  }, [])

  const mousemove = (e: any) => {
    if (!profileRef.current) {
      return
    }
    profileRef.current.style.transform = `translate3d(${getOffset(e.clientX, window.innerWidth, 28)}px, 
    ${getOffset(e.clientY, window.innerHeight, 10)}px, -50px) `
    // profileRef.current.style.transform = `rotateX(${getOffset(e.clientY, window.innerHeight, 30)}deg)`
    // profileRef.current.style.transform = `rotateY(${getOffset(e.clientX, window.innerWidth, 45)}deg)`
  }

  const getOffset = (position: number, windowInner: number, distance: number) => {
    return distance * 2 * (position / windowInner) - distance
  }

  return (
    <>
      <div className="w-full mt-10 h-full flex justify-between">
        <div className="w-full pl-5 flex flex-col items-center justify-center">
          {didMint ? (
            <div>
              <div style={{ fontFamily: 'papyrus' }}>
                <GradientWrapper
                  borderRaidus={5}
                  width={300}
                  className="flex justify-center cursor-default hover:text-white transition-none
            text-2xl"
                >
                  {`Behavior Score: ${behaviorScore}`}
                </GradientWrapper>
              </div>
              <div className="mt-6" style={{ fontFamily: 'papyrus' }}>
                <GradientWrapper
                  borderRaidus={5}
                  width={300}
                  className="flex justify-center cursor-pointer hover:text-white transition-none
            text-2xl"
                >
                  WithDraw
                </GradientWrapper>
              </div>
            </div>
          ) : (
            <div style={{ fontFamily: 'papyrus' }} onClick={handleMint}>
              <GradientWrapper
                borderRaidus={5}
                className="flex justify-center cursor-pointer hover:text-white transition-none
          text-2xl"
              >
                MINT
              </GradientWrapper>
            </div>
          )}
        </div>

        <div
          ref={(e) => (profileRef.current = e)}
          className="flex items-center justify-center w-full h-[600px] pr-10 pt-5"
        >
          <GradientProfile address={address} width={500} height={550} />
        </div>
      </div>
    </>
  )
}

export default ProfileContainer
