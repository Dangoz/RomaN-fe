import React from 'react'
import useUser from '@/hooks/useUser'
import useCyberConect from '@/hooks/useCyberConnect'
import GraidentWrapper from '@/components/ui/GradientWrapper'
import Spinner from '@/components/ui/Spinner'

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
      <div className="w-full flex justify-center items-center mt-8">
        {address && provider && (
          <button className="w-[100px] h-[100px] rounded-[99px]" onClick={handleDiscard}>
            <GraidentWrapper width={100} height={100} borderRaidus={99} className="flex justify-center">
              <h1
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer text-2xl hover:text-white w-[100px] h-[100px] rounded-[99px] pt-9"
                style={{ fontFamily: 'papyrus' }}
              >
                Discard
              </h1>
            </GraidentWrapper>
          </button>
        )}

        <div className="w-[500px] h-[500px] border-2 border-purple-700 flex justify-center items-center mx-[100px]">
          {isLoading ? <Spinner /> : <div>{addresses[0]}</div>}
        </div>

        {address && provider && (
          <button className="w-[100px] h-[100px] rounded-[99px]" onClick={handleLike}>
            <GraidentWrapper
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
            </GraidentWrapper>
          </button>
        )}
      </div>
    </>
  )
}

export default Swiper
