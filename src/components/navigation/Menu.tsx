import GradientWrapper from '../ui/GradientWrapper'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const connectedItems: {
  name: string
  link: string
}[] = [
  { name: 'Profile', link: '/profile' },
  { name: 'Explore', link: '/explore' },
  { name: 'Converse', link: '/converse' },
]

const Menu = ({ connected }: { connected: boolean }) => {
  const router = useRouter()
  const [selected, setSelected] = useState<string>('')

  useEffect(() => {
    setSelected(router.pathname)
  }, [router.pathname])
  return (
    <div className="z-50">
      <GradientWrapper className="justify-center " borderRaidus={5} width={330} hover={false}>
        <>
          {connectedItems.map(
            (item, index) =>
              (connected || item.name == 'Explore') && (
                <Link key={index} href={item.link}>
                  <a>
                    <button
                      className={
                        'w-[100px] h-[50px] mx-1 rounded-[5px] bg-slate-600 hover:bg-opacity-20 pt-1 ' +
                        (selected == item.link
                          ? ' bg-gradient-to-r from-purple-400 to-pink-600 text-white bg-opacity-50'
                          : ' bg-opacity-0')
                      }
                      style={{ fontFamily: 'papyrus' }}
                    >
                      {item.name}
                    </button>
                  </a>
                </Link>
              ),
          )}
        </>
      </GradientWrapper>
    </div>
  )
}

export default Menu
