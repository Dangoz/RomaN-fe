import React from 'react'
import useUser from '@/hooks/useUser'
import useCyberConect from '@/hooks/useCyberConnect'
import GradientWrapper from '@/components/ui/GradientWrapper'
import Spinner from '@/components/ui/Spinner'
import Profile from '@/components/profile/Profile'

interface SwiperProps {
  addresses: string[]
  handleNextProfile: () => void
  isLoading: boolean
}

const Swiper = ({ addresses, handleNextProfile, isLoading }: SwiperProps) => {
  const {
    userState: { address, provider },
  } = useUser()
  const { like } = useCyberConect(provider)

  const handleDiscard = () => {
    if (isLoading) {
      return
    }
    handleNextProfile()
  }

  const handleLike = () => {
    if (isLoading) {
      return
    }
    like(addresses[0])
    handleNextProfile()
  }

  return (
    <>
      <div className="w-full flex justify-center items-center mt-3">
        {address && provider && (
          <button className="w-[100px] h-[100px] rounded-[99px]" onClick={handleDiscard}>
            <GradientWrapper width={100} height={100} borderRaidus={99} className="flex justify-center">
              <h1
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer text-2xl hover:text-white w-[100px] h-[100px] rounded-[99px] pt-9"
                style={{ fontFamily: 'papyrus' }}
              >
                Discard
              </h1>
            </GradientWrapper>
          </button>
        )}

        <div className="w-[500px] h-[550px] flex justify-center items-center mx-[100px]">
          {isLoading ? (
            <Spinner />
          ) : (
            <Profile address={addresses[0]} width={500} height={550} className="border-2 border-purple-700" />
          )}
        </div>

        {address && provider && (
          <button className="w-[100px] h-[100px] rounded-[99px]" onClick={handleLike}>
            <GradientWrapper
              width={100}
              height={100}
              borderRaidus={99}
              className="flex justify-center hover:text-white z-20"
            >
              <h1
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer text-2xl hover:text-white w-[100px] h-[100px] rounded-[99px] pt-9"
                style={{ fontFamily: 'papyrus' }}
              >
                Like
              </h1>
            </GradientWrapper>
          </button>
        )}
      </div>
    </>
  )
}

export default Swiper
