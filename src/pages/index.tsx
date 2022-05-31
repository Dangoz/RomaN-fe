import type { NextPage } from 'next'
import useUser from '@/hooks/useUser'
import NavBar from '@/components/navigation/NavBar'
import Router from 'next/router'
import GradientWrapper from '@/components/ui/GradientWrapper'

const Home: NextPage = () => {
  const {
    userState: { address, provider },
  } = useUser()

  const handleExplore = async () => {
    Router.push('/explore')
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* title */}
        <h1
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-default
          text-[200px] mt-32"
          style={{ fontFamily: 'papyrus' }}
        >
          RomaN
        </h1>

        {/* explore button */}
        <div className="cursor-pointer" onClick={handleExplore}>
          <GradientWrapper width={100} height={100} borderRaidus={99} className="flex justify-center">
            <h1
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer text-xl hover:text-white w-[100px] h-[100px] rounded-[99px] pt-9 pl-3"
              style={{ fontFamily: 'papyrus' }}
            >
              Explore
            </h1>
          </GradientWrapper>
        </div>
      </div>
    </>
  )
}

export default Home
