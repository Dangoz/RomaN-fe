import GradientWrapper from '../ui/GradientWrapper'
import Button from '../ui/Button'
import Link from 'next/link'

const connectedItems: {
  name: string
  link: string
}[] = [
  { name: 'Profile', link: '/profile' },
  { name: 'Explore', link: '/explore' },
  { name: 'Converse', link: '/converse' },
]

const Menu = ({ connected }: { connected: boolean }) => {
  return (
    <div className=" z-50">
      <GradientWrapper className="justify-center" borderRaidus={20} width={300} hover={false}>
        <>
          {connectedItems.map(
            (item, index) =>
              (connected || item.name == 'Explore') && (
                <Link key={index} href={item.link}>
                  <a>
                    <Button width={80} height={54} className="mx-1">
                      {item.name}
                    </Button>
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
